import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <div className="flex justify-start mb-1 border-b">
      <div className="flex items-center w-full h-12">
        <div
          className="flex justify-center items-center text-black ml-2 mr-3 h-9 w-9 rounded-full hover:bg-gray-200 cursor-pointer transition-all duration-300"
          title="back"
          onClick={() => router.back()}
        >
          <ArrowLeftIcon className="w-5 font-extrabold" />
        </div>
      </div>
    </div>
  )
}
