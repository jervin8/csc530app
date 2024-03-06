export default function TextBoxCORRECT() {

return(
    <form className="max-w-sm mx-auto">
        <div className="mb-5">
            <input type="text" id="username-success" className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500" placeholder=". . . ."></input>
            <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Correct!</span> Keep Going!</p>
        </div>
    </form>
)
}

