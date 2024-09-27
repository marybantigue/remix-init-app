import { useFetcher } from "@remix-run/react";
import { useSidebar } from "~/providers/SidebarProvider";
import { AlignLeft, AlignJustify, X } from "lucide-react";
import { Button } from "~/components/ui/button";
type SidebarToggleProps = {
  inSidebar?: boolean;
};
export default function SidebarToggle({
  inSidebar = false,
}: SidebarToggleProps) {
  const { isOpen, toggleSidebar } = useSidebar();
  const fetcher = useFetcher();

  const handleToggle = () => {
    // Update sidebar state locally
    toggleSidebar();

    // Send the form data to the action via fetcher
    fetcher.submit(
      { isOpen: isOpen ? "false" : "true" },
      { method: "post", action: "/sidebar" } // Make sure the route is correct
    );
  };

  return (
    <div>
      {inSidebar ? (
        <Button
          onClick={handleToggle}
          variant="secondary"
          className="sm:hidden"
        >
          <X className="h-4 w-4" />
        </Button>
      ) : (
        <Button onClick={handleToggle} variant="secondary">
          {isOpen ? (
            <AlignJustify className="h-4 w-4" />
          ) : (
            <AlignLeft className="h-4 w-4" />
          )}
        </Button>
      )}
    </div>
  );
}
