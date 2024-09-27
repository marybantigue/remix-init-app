import { json, type ActionFunctionArgs } from "@remix-run/node";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Form, useActionData } from "@remix-run/react";
import { z } from "zod";
import { authenticator } from "~/services/auth.server";
import { AuthorizationError } from "remix-auth";
import GuestLayout from "~/components/layouts/guest";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { LoaderFunctionArgs } from "@remix-run/node";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Finally, we can export a loader function where we check if the user is
// authenticated with `authenticator.isAuthenticated` and redirect to the
// dashboard if it is or return null if it's not
export async function loader({ request }: LoaderFunctionArgs) {
  // If the user is already authenticated redirect to /dashboard directly

  return await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });
}

export async function action({
  request,
}: // params,
// serverAction,
ActionFunctionArgs) {
  // copy request
  // const requestCopy = Object.assign({}, request);

  const formData = await request.clone().formData();

  const submission = parseWithZod(formData, { schema });

  if (submission.status !== "success") {
    return json(submission.reply());
  }
  try {
    await authenticator.authenticate("user-pass", request, {
      successRedirect: "/dashboard",
      throwOnError: true,
    });
  } catch (error) {
    const genericErrorResponse = {
      status: "error",
      error: {
        password: ["An unknown error occurred"],
      },
      initialValue: {
        email: formData.get("email"),
        password: formData.get("password"),
      },
      fields: ["email", "password"],
    };
    // Because redirects work by throwing a Response, you need to check if the
    // caught error is a response and return it or throw it again
    if (error instanceof Response) {
      throw error;
      return {
        ...genericErrorResponse,
        error: {
          password: [error.status],
        },
      };
    }
    if (error instanceof AuthorizationError) {
      return {
        ...genericErrorResponse,
        error: {
          password: [error.message],
        },
      };
    }
    return genericErrorResponse;
  }
}

export default function Login() {
  const lastResult = useActionData<typeof action>();

  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,
    defaultValue: {
      email: "",
      password: "",
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <GuestLayout>
      <Card className="max-w-full w-96">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form
            method="post"
            id={form.id}
            onSubmit={form.onSubmit}
            noValidate
            className="flex flex-col gap-4"
          >
            <div>
              <Label>
                Email
                <Input
                  type="email"
                  key={fields.email.key}
                  name={fields.email.name}
                  defaultValue={fields.email.initialValue}
                  className="mt-1"
                />
              </Label>
              <div className="text-sm text-red-500 mt-1">
                {fields.email.errors}
              </div>
            </div>
            <div>
              <Label>
                Password
                <Input
                  type="password"
                  key={fields.password.key}
                  name={fields.password.name}
                  defaultValue={fields.password.initialValue}
                  className="mt-1"
                />
              </Label>
              <div className="text-sm text-red-500 mt-1">
                {fields.password.errors}
              </div>
            </div>
            <Button type="submit">Login</Button>
          </Form>
        </CardContent>
      </Card>
    </GuestLayout>
  );
}
