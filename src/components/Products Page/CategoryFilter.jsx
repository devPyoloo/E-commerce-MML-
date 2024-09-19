import PropTypes from "prop-types";
import { IoChevronDownSharp } from "react-icons/io5";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function CategoryFilter({ category, handleCategoryChange }) {
  const categories = [
    "All",
    "Skincare",
    "Haircare",
    "Bodycare",
    "Makeup",
    "Fragrance",
    "Supplements",
  ];

  return (
    <>
      {/* // DESKTOP FILTER */}
      {categories.map((cat) => (
        <div
          className="border-t border-t-lightgray pt-2 hidden lg:block"
          key={cat}
        >
          <button
            className={` ${cat === category ? "font-medium" : ""}`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        </div>
      ))}

      {/* MOBILE FILTER */}
      {/* <aside className="sticky top-40 flex flex-col  text-md font-normal">
        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {categories.map((cat) => (
            <option className="text-sm" key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </aside> */}

      <Menu as="div" className="relative inline-block text-left lg:hidden">
        <div>
          <MenuButton className="inline-flex justify-center gap-x-1.5 rounded-md px-3 py-2 text-md font-normal">
            {category}
            <IoChevronDownSharp aria-hidden="true" className="-mr-1 h-5 w-5" />
          </MenuButton>
        </div>
        <MenuItems
            transition
            className="absolute left-0 z-10 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >

        {categories.map((cat) => (
              <MenuItem key={cat.id}>
                <span
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 hover:cursor-pointer"
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </span>
              </MenuItem>
        ))}
        </MenuItems>
      </Menu>
    </>
  );
}

CategoryFilter.propTypes = {
  category: PropTypes.string.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
};
