// import Sidebar from "@/myComponents/shared/Sidebar";
import Sidebar from "@/components/myComponents/shared/Sidebar/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Athkia Adiba Tonne",
  description:
    "This is a dashboard of Athkia Adiba Tonne. On this page she adds, deletes, updates projects and blogs.",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen gap-5">
      <div>
        <Sidebar />
      </div>
      <div className="pt-12 lg:pt-10 flex-1">{children}</div>
    </div>
  );
}
