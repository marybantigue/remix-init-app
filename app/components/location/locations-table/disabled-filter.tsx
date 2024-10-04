import { useState } from "react";
import { useSearchParams } from "@remix-run/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
export function DisabledFilter({ params }: { params: URLSearchParams }) {
  const [, setSearchParams] = useSearchParams();
  const [disabled, setDisabled] = useState("any");
  const handleFilter = (value: string) => {
    setDisabled(value);
    if (value !== "any") {
      params.set("disabled", value);
    } else {
      params.delete("disabled");
    }
    setSearchParams(params, {
      preventScrollReset: true,
    });
  };
  return (
    <Select value={disabled} onValueChange={handleFilter}>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Filter disabled" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="any">
            {disabled === "any" && `Disabled - `}Any
          </SelectItem>
          <SelectItem value="1">
            {disabled === "1" && `Disabled - `}Yes
          </SelectItem>
          <SelectItem value="0">
            {disabled === "0" && `Disabled - `}No
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
