import axios from "axios";
import { authenticator } from "~/services/auth.server";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import MainLayout from "~/components/layouts/main";
import { Card } from "~/components/ui/card";
import {
  DataTable,
  PaginationState,
  Updater,
} from "~/components/location/locations-table/data-table";
import {
  Location,
  columns,
} from "~/components/location/locations-table/columns";
import { SearchInput } from "~/components/location/locations-table/search-input";
import { DisabledFilter } from "~/components/location/locations-table/disabled-filter";

type Params = {
  page: number;
  perPage: number;
  name: string;
  disabled?: string | null;
};
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { token } = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  const url = process.env.BACKEND_URL;
  const currentURL = new URL(request.url);
  const name = currentURL.searchParams.get("name") || "";
  const page = Number(currentURL.searchParams.get("page") || "1");
  const disabled = currentURL.searchParams.get("disabled");
  const params: Params = {
    perPage: 10,
    page,
    name,
  };
  if (disabled !== "any") {
    params.disabled = disabled;
  }
  const result = await axios.get(`${url}/api/locations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
  const locations = result.data.data as Location[];
  const meta = result.data.meta;
  return { locations, meta };
};

export default function LocationsRoute() {
  const [, setSearchParams] = useSearchParams();
  const { locations, meta } = useLoaderData<typeof loader>();
  const rowCount = meta.total;
  const pagination = {
    pageIndex: meta.current_page > 0 ? meta.current_page - 1 : 0,
    pageSize: meta.per_page,
  };

  const currentURL = new URL(window.location.href);
  const name = currentURL.searchParams.get("name");
  const currentParams = new URLSearchParams();
  if (name) {
    currentParams.set("name", name);
  }
  const disabled = currentURL.searchParams.get("disabled");

  if (disabled) {
    currentParams.set("disabled", disabled);
  }

  const onPaginationChange = (updater: Updater<PaginationState>) => {
    if (typeof updater !== "function") return;

    const newPageInfo = updater(table.getState().pagination);
    currentParams.set("page", String(newPageInfo.pageIndex + 1));
    setSearchParams(currentParams, {
      preventScrollReset: true,
    });
  };

  const table = useReactTable({
    data: locations,
    columns,
    manualPagination: true,
    state: {
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange,
    rowCount,
  });

  return (
    <MainLayout>
      <div className="flex flex-col container mx-auto my-6 px-6">
        <Card className="p-8 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Locations</h2>
            <div className="flex flex-row gap-2">
              <SearchInput params={currentParams} />
              <DisabledFilter params={currentParams} />
            </div>
          </div>
          <DataTable table={table} columns={columns} />
        </Card>
      </div>
    </MainLayout>
  );
}
