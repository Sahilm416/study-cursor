"use client";

import { useState, ReactNode, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Files, Menu, LogOut, ArrowDownIcon, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

interface NavItemProps {
  icon: ReactNode;
  children: ReactNode;
  href: string;
  active: boolean;
}

export const Sidebar = ({ files }: { files: any }) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [openFiles, setOpenFiles] = useState(true);

  const { data: session } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

  const NavItem = ({ icon, children, href, active }: NavItemProps) => {
    return (
      <Link
        href={href}
        className={`flex w-full z-10 items-center gap-3 rounded-lg px-3 py-2 transition-all ${
          active ? "bg-[#252525] border border-[#353535] text-white" : ""
        }`}
      >
        {icon}
        <span className="font-medium w-full">{children}</span>
      </Link>
    );
  };

  const SidebarContent = () => (
    <div className="flex h-full bg-[#181818] flex-col text-white gap-4">
      <div className="flex h-[60px] items-center border-b border-[#353535] px-6">
        <Link className="flex items-center gap-2" href="/">
          <Image
            className="p-1 border w-[35px] h-[35px] bg-white border-[#353535] rounded-full"
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
          <NavItem
            icon={<Files className="h-4 w-4 hover:text-white" />}
            href="/dashboard/files"
            active={pathname === "/dashboard/files"}
          >
            <div className="flex items-center justify-between w-full gap-2">
              <span>Files</span>
              <ChevronDown
                onClick={() => setOpenFiles(!openFiles)}
                className={`h-4 w-4 ml-auto transition-all duration-300 ${
                  openFiles ? "rotate-180" : ""
                }`}
              />
            </div>
          </NavItem>
          {openFiles && (
            <div className="w-full h-full  ">
              <div className="flex flex-col w-full pt-2">
                {files.map((file: any) => (
                  <Link
                    href={`/dashboard/files/open?id=${file.id}`}
                    className="flex items-center gap-2 p-2 hover:bg-[#202020] rounded-lg cursor-pointer"
                    key={file.id}
                  >
                    <span>{file.file_name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </div>
      <div className="mt-auto py-4 border-t border-[#353535] flex justify-center items-center">
        <div className="flex items-center gap-4 rounded-lg bg-[#202020] border border-[#353535] p-4">
          <Avatar className="border border-[#353535]">
            <AvatarImage src={user?.image || "/logo-small.png"} />
            <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user?.name}</span>
            <span className="text-xs">
              {user?.email?.slice(0, 8) || "loading..."}
            </span>
          </div>
          <div
            onClick={() => signOut()}
            className="p-2 bg-[#202020] hover:bg-[#353535] border border-[#353535] rounded-lg cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden h-screen flex-shrink-0 w-[300px] border-r border-[#353535] bg-[#181818] md:block">
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
