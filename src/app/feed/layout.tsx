import { ReactNode } from "react";
import SideNav from "../ui/sidenav/sidenav";

export default function Layout({children}: {children: ReactNode}) {

  return (
    <div className="flex px-6 h-[100%] bg-white">
      <SideNav />
      <div>
        {children}
      </div>
    </div>
  )
}
