import React from 'react'
import '../../style/SearchBar.css'

const SearchBar:React.FC = () => {
  return (
    <div className='SearchBar'>
      <input
        type='text'
        className='SearchBar_SearchInput'
        placeholder='search'
      />
    </div>
  )
}

export default SearchBar
