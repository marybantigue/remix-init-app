"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Location = {
  id: number;
  name: string;
  short: string;
  timezeone: string | null;
  color: string | null;
  disabled: boolean;
  created_at: string;
  updated_at: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "short",
    header: "Short",
  },
  {
    accessorKey: "timezone",
    header: "Timezone",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "disabled",
    header: "Disabled",
  },
];
