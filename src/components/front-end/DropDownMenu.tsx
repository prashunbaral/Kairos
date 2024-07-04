// DropdownMenu.tsx
"use client";
import { url } from "inspector";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";

interface DropdownMenuProps {
  triggerText: string;
  menuItems: string[];
  setActive: React.Dispatch<React.SetStateAction<string | null>>; // Define setActive prop
  activeItem: string | null;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  triggerText,
  menuItems,
  setActive,
  activeItem,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();
  // const handleMenuItemClick = (item: string) => {
  //   setActive(item); // Set active item when clicked
  //   setIsOpen(false); // Close dropdown after clicking an item
  //   router.push(`/categories?category=${item}`);
  // };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        className={`font-bold hover:text-blue-500 ml-5 mt-1 ${
          activeItem === triggerText ? "text-blue-500" : "text-black"
        }`}
        onClick={toggleDropdown}
      >
        {triggerText}
      </button>
      {isOpen && (
        <div className="absolute w-[800px] left-[-270px] bg-[#fcf6ea] text-gray-500 mt-9">
          <div ref={dropdownRef} className="max-w-screen-xl mx-auto py-4">
            <div className="grid grid-cols-3 gap-4 px-4">
              {menuItems.map((item, index) => (
                <div key={index}>
                  <div
                    className={`px-4 col-span-1 bg-[#fcf6ea] rounded-lg cursor-pointer hover:text-black ${
                      activeItem === item ? "text-blue-500" : "text-gray-500"
                    }`}
                    onClick={() => {
                      // router.push(
                      //   `/categories?category=${item.replace(" ", "-")}`
                      // );
                      window.location.href = `/categories?category=${encodeURIComponent(
                        item
                      )}`;
                      setActive(item);
                      setIsOpen(false);
                    }}
                  >
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
