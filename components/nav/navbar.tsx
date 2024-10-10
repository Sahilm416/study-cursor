"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav
      className={`w-full max-w-[700px] sticky top-0 pt-10 bg-[#fff] px-10  h-[60px] ${
        pathname.startsWith("/dashboard") ? "hidden" : "flex"
      } justify-between items-center mx-auto `}
    >
      <div className="flex justify-between items-center w-full border p-3 rounded-full border-[#e5e5e5]">
        <div className="flex items-center gap-2">
          <Image
            className="p-1 rounded-full overflow-hidden border-[1px] border-[#e5e5e5]"
            src="/logo-small.png"
            alt="logo"
            width={35}
            height={35}
          />
          <h3 className="text-sm">Study-Cursor</h3>
        </div>
        <div>
          <Button className=" rounded-full">Get Started</Button>
        </div>
      </div>
    </nav>
  );
};
