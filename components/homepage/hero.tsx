import Link from "next/link";
import { Button } from "../ui/button";
export const Hero = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center py-10">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-7xl/none">
              Study Smarter with AI
            </h1>
            <p className="mx-auto max-w-[400px] text-[#353535]">
              Upload your documents and let our AI help you study more
              effectively. Interact, question, and learn faster than ever
              before.
            </p>
          </div>
          <div className="space-x-4">
            <Link href="/dashboard/files">
              <Button>Get Started</Button>
            </Link>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
};
