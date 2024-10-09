import { Carousel } from "./carousel";
import Link from "next/link";


export default function Header(){
    return (
        <div>
            <ul>
                <li>
                    <Link href="/login">
                    Đăng nhập 
                    </Link>
                </li>
                <li>
                    <Link href="/resgister">
                    Đăng kí
                    </Link>
                </li>
            </ul>
            <Carousel />
        </div>
    )
}