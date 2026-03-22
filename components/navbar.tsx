'use client';

import Image from "next/image"
import { Button } from "./ui/button"
import { LogOut, Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./mode-toogle";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const linkDesign = {
  baseLink:
    "text-sm font-medium transition-colors px-3 py-2 rounded-md",

  activeLink:
    "border bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300",

  inactiveLink:
    "text-neutral-900 hover:text-neutral-600 dark:text-neutral-50 dark:hover:text-neutral-300",

}

const hideNavLinks = ["\/login", "\/register"];

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const router = useRouter();

  const currentPath = usePathname();

  const checkPageActive = (path: string) => {
    return currentPath === path;
  }

  const shouldHideNav = hideNavLinks.includes(currentPath);

  if (shouldHideNav) {
    return null;
  }

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Logged out successfully!", { duration: 3000, richColors: true });
        router.push("/login");
      } else {
        toast.error("Logout failed. Please try again.", { duration: 4000, richColors: true });
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.", { duration: 4000, richColors: true });
      console.error("[LOGOUT]:", error);
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60 dark:border-neutral-800 dark:bg-neutral-900/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image
              src="/hushbox.png"
              alt="Hushbox Logo"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
              Hushbox
            </span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-6">
            <li className="">
              <Link
                href="/"
                className={`${linkDesign.baseLink} ${checkPageActive("/") ? linkDesign.activeLink : linkDesign.inactiveLink
                  }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className={`${linkDesign.baseLink} ${checkPageActive("/settings") ? linkDesign.activeLink : linkDesign.inactiveLink
                  }`}
              >
                Settings
              </Link>
            </li>
          </ul>

          {/* Desktop Logout Button */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <ModeToggle />

            <Button
              variant="default"
              size="sm"
              className="gap-2 bg-red-500 hover:bg-red-600 text-white"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-md p-2 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 py-4">
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-900 hover:bg-neutral-100 dark:text-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 transition-colors"
                >
                  Settings
                </Link>
              </li>
            </ul>
            <div className="mt-4 px-3">
              <Button variant="default" className="w-full gap-2 bg-red-500 hover:bg-red-600 text-white">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar