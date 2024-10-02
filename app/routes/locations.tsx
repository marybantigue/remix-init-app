import { authenticator } from "~/services/auth.server";
import type { LoaderFunctionArgs } from "@remix-run/node";
import MainLayout from "~/components/layouts/main";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, { failureRedirect: "/login" });

  return null;
};

export const action = async () => {
  return null;
};

export default function LocationsRoute() {
  return (
    <MainLayout>
      <div className="flex flex-col container mx-auto my-6 px-6">
        <Card className="p-8">
          <h2 className="text-2xl font-bold tracking-tight">Locations</h2>

          <div className="mt-4">
            <Input placeholder="Search" className="w-full md:w-96" />
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
