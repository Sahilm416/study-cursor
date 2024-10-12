import { getCurrentUserFiles } from "@/actions/files";
import { Sidebar } from "@/components/dashboard";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full h-full flex overflow-hidden">
      <Sidebar />
      {children}
    </div>
  );
}
