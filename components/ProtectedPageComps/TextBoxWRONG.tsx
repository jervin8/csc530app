export default function TextBoxWRONG() {

return(
    <form className="max-w-sm mx-auto">
    <div>
        <input type="text" id="username-error" className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" placeholder=". . . ."></input>
        <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Wrong!</span> Try Again!</p>
    </div>
    </form>
)
}