import { useSidebar } from "~/providers/SidebarProvider";
import SidebarToggle from "../sidebar-toggle";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";

type SidebarProps = {
  children?: React.ReactNode;
};
export default function Sidebar({ children }: SidebarProps) {
  const { isOpen } = useSidebar();

  return (
    <div className={`flex flex-col sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="flex justify-between p-2">
        <h2>Logo</h2>
        <SidebarToggle inSidebar={true} />
      </div>
      <nav className="flex flex-col p-2">
        <ul className="flex flex-col">
          <li>Link 1123123 123kaslfd</li>
          <li>Link 2</li>
          <li>Link 3</li>
        </ul>
      </nav>
      <Collapsible>
        <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
        <CollapsibleContent>
          Yes. Free to use for personal and commercial projects. No attribution
          required.
        </CollapsibleContent>
      </Collapsible>

      {children}
    </div>
  );
}
