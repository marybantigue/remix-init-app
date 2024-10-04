import { useSearchParams } from "@remix-run/react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { InputSearch } from "~/components/ui/input-search";
export function SearchInput({ params }: { params: URLSearchParams }) {
  const [, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const handleSearch = useDebouncedCallback((value) => {
    // const params = new URLSearchParams();
    if (value) {
      params.set("name", value);
    } else {
      params.delete("name");
    }
    setSearchParams(params, {
      preventScrollReset: true,
    });
  }, 300);

  return (
    <InputSearch
      placeholder="Search"
      className="w-full"
      type="text"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
    />
  );
}
