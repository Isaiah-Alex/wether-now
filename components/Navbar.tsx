import Image from "next/image";
import Link from "next/link";
import UnitDropdown from "./UnitDropdown";
const Navbar = () => {
    

    return (<nav className="flex max-[980px]:justify-between mt-4 items-center md:justify-between md:mx-4 relative cursor-pointer">
        <div>
            <Link href='/'>
                <Image
                src="images/logo.svg"
                height={20}
                width={150}
                alt="Logo"
                className="shrink-0"
                    />
            </Link>
        </div>
        <UnitDropdown/>

        
    </nav>);
}
 
export default Navbar