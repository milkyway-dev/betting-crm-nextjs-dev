import React from 'react'
import Search from '../svg/Search'

const SearchBar = () => {
  return (
    <div className='bg-light_black dark:bg-onDark rounded-3xl flex w-full items-center space-x-1 px-2'>
        <Search/>
        <input type="search" className='bg-transparent w-full px-3 py-1.5 outline-none dark:text-black text-white' placeholder='search'/>
    </div>
  )
}

export default SearchBar
