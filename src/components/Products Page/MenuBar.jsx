import { IoChevronDownSharp } from "react-icons/io5";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import PropTypes from 'prop-types'
import CategoryFilter from "./CategoryFilter";

export default function MenuBar({ setSortBy, category, handleCategoryChange }) {
  return (
    <div className="flex justify-between items-center pl-3 lg:pr-10 lg:pl-20 sticky top-0 py-3 bg-offwhite z-10">
      <div className="flex items-center">
      <h1 className="font-semibold text-xl">Categories</h1>
      <div className="lg:hidden">
      <CategoryFilter category={category} handleCategoryChange={handleCategoryChange} />
      </div>
      </div>
      
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex justify-center gap-x-1.5 rounded-md px-3 py-2 text-md font-normal">
            Sort By Price
            <IoChevronDownSharp aria-hidden="true" className="-mr-1 h-5 w-5" />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute left-0 z-10 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-1">
            <MenuItem>
              <span
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:cursor-pointer"
                onClick={() => setSortBy("High - Low")}
              >
                High - Low
              </span>
            </MenuItem>
            <MenuItem>
              <span
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:cursor-pointer"
                onClick={() => setSortBy("Low - High")}
              >
                Low - High
              </span>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}

MenuBar.propTypes = {
  setSortBy: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  handleCategoryChange: PropTypes.func.isRequired
}
