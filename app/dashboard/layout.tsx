import { getCurrentUserFiles } from "@/actions/files";
import { Sidebar } from "@/components/dashboard";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const res = await getCurrentUserFiles();
  return (
    <div className="w-full h-full flex overflow-hidden">
      <Sidebar files={res.files} />
      {children}
    </div>
  );
}
