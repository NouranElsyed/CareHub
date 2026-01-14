import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { navList } from "../header/Header";
import Link from "next/link";

export default function DropDown({ isScroll }: { isScroll: boolean }) {
  return (
    <div className="md:hidden  z-50">
      <Menu>
        <MenuButton
          className={`inline-flex items-center gap-2 rounded-md bg-amber-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none focus:outline-white hover:bg-amber-500 data-open:bg-amber-500 cursor-pointer`}
        >
          ☰
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          modal={false}
          className={`w-52 z-50 origin-top-right rounded-xl border border-white/5 bg-cyan-950/95 p-1 text-sm/6 text-white transition duration-100 ease-out ${
            isScroll
              ? "[--anchor-gap:--spacing(5)]"
              : "[--anchor-gap:--spacing(2)]"
          } focus:outline-none data-closed:scale-95 data-closed:opacity-0 `}
        >
          {navList?.map((el, idx) => (
            <MenuItem key={idx}>
              <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                <Link
                  href={el.href}
                  className="font-medium text-sm lg:text-base hover:text-amber-500 transition whitespace-nowrap"
                >
                  {el.nav}
                </Link>
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
