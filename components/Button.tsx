import { Children } from "react";


const Button = ({children}:{children:React.ReactNode}) => {
    return (<button type="submit"
        className="w-full mx-auto py-2 rounded-md bg-blue-500 max-[375px]:my-2 text-center hover:bg-blue-700 m-2 focus:outline-blue-700 focus:outline-1 focus:outline-offset-2 transition-all ease-in-out duration-100 cursor-pointer">
        {children}
    </button> );
}
 
export default Button;