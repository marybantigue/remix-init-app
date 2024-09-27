import Sidebar from "~/components/layouts/sidebar";
import Header from "~/components/header";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <div className="main-layout flex flex-auto">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Header />
          <main className="flex flex-col">{children}</main>
        </div>
      </div>
    </div>
  );
}
