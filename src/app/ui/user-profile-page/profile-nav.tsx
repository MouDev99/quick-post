import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileNav({username}: {username: string}) {
  const pathname = usePathname();

  const navItems = [
    {href: `/${username}`, name: "Posts"},
    {href: `/${username}/comments`, name: "Comments"},
    {href: `/${username}/photos`, name: "Photos"},
    {href: `/${username}/likes`, name: "Likes"},
  ];
  const activeClass = "border-b-4 border-[#3A98EB]";

  return (
    <div className="flex min-[300px] h-12 border-b border-gray-200">
      {navItems.map(({name, href}) => {
        return (
          <Link
            key={name}
            href={href}
            className="flex justify-center items-center flex-1 w-fit h-full text-md text-[#0f1419] font-extrabold hover:bg-gray-100 transition-all duration-300"
          >
            <span className={`h-full flex items-center ${pathname === href ? activeClass : ''}`}>
              {name}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
