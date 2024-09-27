import SidebarToggle from "~/components/sidebar-toggle";
import { ModeToggle } from "./mode-toggle";
import { useUser } from "~/providers/UserProvider";
export default function Header() {
  const { user } = useUser();

  return (
    <div className="flex justify-between items-center p-2 border-b-2 border-bottom border-slate-100">
      <SidebarToggle />
      <div className="flex items-center">
        {user && (
          <span className="ml-2 text-sm text-muted-foreground">
            {user.username}
          </span>
        )}
        <ModeToggle />
      </div>
    </div>
  );
}
