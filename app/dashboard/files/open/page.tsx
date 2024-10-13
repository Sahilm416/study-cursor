import { getFile } from "@/actions/files";
import { DocOpener } from "@/components/dashboard/doc-opener";

const page = async ({ searchParams }: { searchParams: { id: string } }) => {
  const id = searchParams.id;
  const file = (await getFile(id)) as {
    id: string;
    file_name: string;
    url: string;
  };

  return (
    <div className="w-full min-h-screen">
      <DocOpener id={file.id} url={file.url} name={file.file_name} />
    </div>
  );
};

export default page;
