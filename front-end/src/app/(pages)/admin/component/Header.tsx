import React from "react";
import logo from "@/app/publics/img/logo/logo cua thu-05.png";
import Image from "next/image";
import Link from "next/link";

import useFetchAdmin from "@/app/hook/useFetchAdmin";
export default function Header() {

  const {logout} = useFetchAdmin()
  return (
    <div className="py-3 flex ">
      <Image src={logo} width={250} alt="logo admin" />

      <Link href={"/login_admin"}> <button onClick={logout}>
        {" "}
        <i className="fas fa-sign-out-alt"></i> Đăng xuất
      </button></Link>
    </div>
  );
}
