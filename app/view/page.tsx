import { DocOpener } from "@/components/dashboard/doc-opener";

const page = ({ searchParams }: { searchParams: { data: string } }) => {
  const data = JSON.parse(searchParams.data);
  return (
    <div className="w-full min-h-screen">
      <iframe src={data.url} className="w-full h-screen" />
    </div>
  );
};

export default page;
