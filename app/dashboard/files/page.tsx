import { getCurrentUserFiles } from '@/actions/files';
import { AllFiles } from '@/components/dashboard/all-files'

const page = async () => {
  const files = await getCurrentUserFiles();
  return (
    <div className='min-h-screen w-full'>
      <AllFiles files={files.files} />
    </div>
  )
}

export default page
