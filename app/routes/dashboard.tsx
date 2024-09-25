import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  // const user = { username: "test" };
  return { message: "You are logged in!", user };
};

export default function DashboardRoute() {
  const { message, user } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>{message}</h1>
      <p>Welcome, {user.username}</p>
      <Form method="post" action="/logout">
        <button type="submit">Logout</button>
      </Form>
    </div>
  );
}
