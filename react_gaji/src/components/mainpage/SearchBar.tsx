import React from 'react'
import '../../style/SearchBar.css'

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar:React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className='SearchBar'>
      <input
                type="text"
                className="SearchBar_SearchInput"
                placeholder="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
    </div>
  )
}

export default SearchBar
