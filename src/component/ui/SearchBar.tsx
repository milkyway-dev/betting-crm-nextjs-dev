'use client'
import React, {useState } from 'react'
import Search from '../svg/Search'
import { useRouter,usePathname } from 'next/navigation'

const SearchBar = () => {
  const router = useRouter()
  const pathname=usePathname()
  const [search, setSearch] = useState('')
  router.replace(`${pathname}/?search=${search}`)
  
  return (
    <div className='bg-light_black dark:bg-onDark rounded-3xl flex w-full items-center space-x-1 px-2'>
        <Search/>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} type="search" className='bg-transparent w-full px-3 py-1.5 outline-none dark:text-black text-white' placeholder='search'/>
    </div>
  )
}

export default SearchBar
