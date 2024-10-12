"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Files, Menu, LogOut } from "lucide-react";

import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
interface NavItemProps {
  icon: ReactNode;
  children: ReactNode;
  href: string;
  active: boolean;
}

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const { data: session } = useSession();
  const pathname = usePathname();

  const NavItem = ({ icon, children, href, active }: NavItemProps) => {
    return (
      <Link
          href={href}
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${active ? "bg-gray-200 dark:bg-gray-700" : ""}`}
      >
        {icon}
        <span className="font-medium">{children}</span>
      </Link>
    );
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col gap-4">
      <div className="flex h-[60px] items-center border-b px-6">
        <Link className="flex items-center gap-2" href="/">
          <Image
            className="p-1 border border-[#e4e4e4] rounded-full"
            src="/logo-small.png"
            alt="logo"
            width={35}
            height={35}
          />
          <span className="">Study Cursor</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto">
        <nav className="grid items-start px-4 text-sm font-medium">
          <NavItem icon={<Files className="h-4 w-4" />} href="/dashboard/files" active={pathname === "/dashboard/files"}>
            Files
          </NavItem>
        </nav>
      </div>
      <div className="mt-auto py-4 px-2 border flex justify-center items-center">
        <div className="flex items-center gap-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <img
            alt="Avatar"
            className="rounded-full w-10 h-10 border border-[#e4e4e4] "
            height="40"
            src={session?.user?.image || "/logo-small.png"}
            style={{
              objectFit: "cover",
            }}
            width="40"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{session?.user?.name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {session?.user?.email?.slice(0, 8) + "..."}
            </span>
          </div>
          <div onClick={() => signOut()} className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg cursor-pointer">
            <LogOut className="h-5 w-5"  />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden h-screen w-[300px] border-r bg-gray-100/40 dark:bg-gray-800/40 md:block">
        <ScrollArea className="h-full">
          <SidebarContent />
        </ScrollArea>
      </aside>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed left-4 top-4 z-40 md:hidden"
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <ScrollArea className="h-full">
            <SidebarContent />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
};
