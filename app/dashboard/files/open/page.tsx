import { DocOpener } from "@/components/dashboard/doc-opener";

const page = ({ searchParams }: { searchParams: { url: string } }) => {
  return (
    <div className="w-full min-h-screen">
      <DocOpener url={searchParams.url} />
    </div>
  );
};

export default page;
