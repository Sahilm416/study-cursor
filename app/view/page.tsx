import { DocOpener } from "@/components/dashboard/doc-opener";

const page = ({ searchParams }: { searchParams: { data: string } }) => {
  const data = JSON.parse(searchParams.data);
  return (
    <div className="w-full min-h-screen">
      <DocOpener url={data.url} name={data.name} />
    </div>
  );
};

export default page;