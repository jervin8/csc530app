"use client"
import { useRouter } from "next/navigation";

export default function ExitButton() {
    const router = useRouter();

    function buttonClicked() {
        router.push("/protected");
    }

    return(
        <button onClick={buttonClicked} type="button" className="absolute top-0 left-0 text-indigo-600 hover:text-white border border-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-indigo-500 dark:text-indigo-500 dark:hover:text-white dark:hover:bg-indigo-600 dark:focus:ring-indigo-900">Exit</button>
    )
}
