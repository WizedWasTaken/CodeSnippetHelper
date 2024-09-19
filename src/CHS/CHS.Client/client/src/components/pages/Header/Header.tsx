import NavBar from "@/components/pages/Header/NavComponent";
import HamburgerMenu from "@/components/pages/Header/HamburgerMenu";
import { useSession } from "@/lib/utils/session";

/*
 * Header component with the site title and navigation bar
 * This will be shown on all pages
 */
export default function Header() {
  return (
    <header className="py-5 px-4 w-full flex justify-between items-center border-b-2 border-slate-400 overflow-hidden">
      <HamburgerMenu />
      <div className="absolute w-full flex justify-end md:justify-start px-5 md:px-0">
        <h3>Code Snippet Hjælper</h3>
      </div>
      <NavBar />
    </header>
  );
}
