import { useSidebar } from "~/providers/SidebarProvider";
import { useGlobalData } from "~/providers/GlobalDataProvider";
import { Link } from "@remix-run/react";
import SidebarToggle from "~/components/sidebar-toggle";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Button } from "~/components/ui/button";
import {
  LayoutDashboard,
  CalendarClock,
  ListTodo,
  MapPinned,
  NotebookTabs,
} from "lucide-react";

type SidebarProps = {
  children?: React.ReactNode;
};
export default function Sidebar({ children }: SidebarProps) {
  const { isOpen } = useSidebar();
  const { appName } = useGlobalData();
  return (
    <div className={`flex flex-col sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="flex items-center justify-between px-4 py-4">
        <h2 className="text-center">{appName}</h2>
        <SidebarToggle inSidebar={true} />
      </div>
      <nav className="flex flex-col p-4 gap-4">
        <Button variant="ghost" asChild className="nav-item justify-start px-1">
          <Link to="/dashboard" className="gap-2">
            <LayoutDashboard className="nav-icon" />
            <span className="nav-label">Dashboard</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          asChild
          className="nav-item justify-start px-1 gap-2"
        >
          <Link to="/dashboard" className="gap-2">
            <CalendarClock className="nav-icon" />
            <span className="nav-label">Schedules</span>
          </Link>
        </Button>

        <Button
          variant="ghost"
          asChild
          className="nav-item justify-start px-1 gap-2"
        >
          <Link to="/dashboard" className="gap-2">
            <ListTodo className="nav-icon" />
            <span className="nav-label">Appointments</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          asChild
          className="nav-item justify-start px-1 gap-2"
        >
          <Link to="/locations" className="gap-2">
            <MapPinned className="nav-icon" />
            <span className="nav-label">Locations</span>
          </Link>
        </Button>

        <Collapsible>
          <CollapsibleTrigger className="nav-item justify-start inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-1 py-2 w-full gap-2">
            <NotebookTabs className="nav-icon" />
            <span className="nav-label">Contacts</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            Yes. Free to use for personal and commercial projects. No
            attribution required.
          </CollapsibleContent>
        </Collapsible>
      </nav>

      {children}
    </div>
  );
}
