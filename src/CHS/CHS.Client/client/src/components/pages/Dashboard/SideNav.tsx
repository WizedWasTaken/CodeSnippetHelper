import { Button } from "@/components/ui/button";
import { dashboardSideNavItems } from "@/lib/utils/menuItems";
import Link from "next/link";

export default function SideNav() {
  return (
    <nav className="md:border-r border-b border-slate-400 h-full shadow-lg md:w-64 w-full">
      <ul className="flex flex-col gap-3 p-4">
        {dashboardSideNavItems.map((item, index) => (
          <li key={index} className="hover:bg-gray-200 rounded-md">
            <Button asChild size={"lg"} className="w-full text-left">
              <Link href={item.path} className="block w-full h-full px-4 py-2">
                {item.name}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
