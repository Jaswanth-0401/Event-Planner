import React from 'react';
import '../Styles/SearchBar.css';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  return (
    <div className="search-bar-wrapper">
      <Search size={18} color="#888" />
      <input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={onSearch}
        className="search-bar"
      />
    </div>
  );
};

export default SearchBar;
