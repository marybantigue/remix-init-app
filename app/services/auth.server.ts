// app/services/auth.server.ts
import { Authenticator, AuthorizationError } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";
import axios, { isAxiosError } from "axios";
interface User {
  username: string;
  email: string;
  id: string | number;
  token: string;
}

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<User>(sessionStorage);

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");
    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    const url = process.env.BACKEND_URL;

    const cookieResult = await axios.get(`${url}/sanctum/csrf-cookie`);
    const cookies = cookieResult.headers["set-cookie"] || [];
    let xsrfToken = cookies.find((cookie) => cookie.startsWith("XSRF-TOKEN="));
    if (xsrfToken) {
      xsrfToken = xsrfToken.split(";")[0].split("=")[1].replace("%3D", "=");
    }
    // get laravel_session
    let laravelSession = cookies.find((cookie) =>
      cookie.startsWith("laravel_session=")
    );
    if (laravelSession) {
      laravelSession = laravelSession
        .split(";")[0]
        .split("=")[1]
        .replace("%3D", "=");
    }

    try {
      const response = await axios.post(
        `${url}/sanc_login`,
        {
          email,
          password,
          device_name: "remix",
        },
        {
          withCredentials: true,
          withXSRFToken: true,
          headers: {
            "X-XSRF-TOKEN": xsrfToken,
            Cookie: `laravel_session=${laravelSession}; XSRF-TOKEN=${xsrfToken}`,
          },
        }
      );

      // get token
      const token = response.data.token;
      const user = {
        token,
        id: response.data.user.id,
        username: response.data.user.name,
        email: response.data.user.email,
      };

      return user;
    } catch (error) {
      if (isAxiosError(error)) {
        const response = error.response;
        const data = response?.data;
        if (data) {
          console.log("response", data);
          const errorMessage = data.error || "Invalid credentials";
          throw new AuthorizationError(errorMessage);
        }
      }
      console.log("error", error);
      throw new AuthorizationError("Error occured while logging in");
    }
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);
