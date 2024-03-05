"use client"
import { useRouter } from "next/navigation";

export default function ExitButton() {
    const router = useRouter();

    function buttonClicked() {
        router.push("/protected");
    }

    return(
        <button onClick={buttonClicked} type="button" className="absolute top-0 left-0 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Exit</button>
    )
}
