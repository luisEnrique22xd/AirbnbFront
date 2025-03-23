'use client';
import { useRouter } from "next/navigation";
import { resetAuthCookies } from "../lib/actions";
import MenuLink from "./navbar/MenuLink";

const LogoutButton:React.FC = () => {
    const router = useRouter();

    const submitLogout = async()=>{
        console.log('Logging out');
        resetAuthCookies();
        router.push('/');
    }
    return(
        <MenuLink
            label="Log out"
            onClick={submitLogout}
        />
    )
}

export default LogoutButton;