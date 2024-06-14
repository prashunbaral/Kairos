"use client"

import { RxMagnifyingGlass } from "react-icons/rx";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (searchTerm: string) => {
    const params = new URLSearchParams(searchParams);
      if(searchTerm) {
        params.set("query", searchTerm)
      } else {
        params.delete("query");
      }
      replace(`${pathname}?${params.toString()}`)
    }

  return (
    <div className='lg:flex hidden w-full max-w-[500px]'>
      <input 
        className='border-2 border-[#f96f11] px-6 py-2 w-full' type='text' 
        placeholder='Search for products...'
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <div className='bg-[#f96f11] text-white text-[26px] grid place-items-center px-4'>
        <RxMagnifyingGlass />
      </div>
    </div>
  )
}

export default SearchBar;