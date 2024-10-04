import { useRef } from "react";
import { Input, type InputProps } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { X } from "lucide-react";

export function InputSearch({
  onChange,
  value,
  ...props
}: InputProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const syntheticEvent = {
    target: { value: "" },
  } as React.ChangeEvent<HTMLInputElement>;
  return (
    <div className="relative w-full max-w-sm">
      <Input {...props} ref={inputRef} onChange={onChange} value={value} />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 transform -translate-y-1/2  h-7 w-7 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          onClick={() => {
            if (!onChange) return;
            onChange(syntheticEvent);
            inputRef.current?.focus();
          }}
        >
          <X />
        </Button>
      )}
    </div>
  );
}
