import React, { ChangeEvent } from "react";
import styles from "../page.module.scss";

interface SearchBarProps {
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchTerm }) => {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Buscar por nombre y apellido"
      onChange={handleSearch}
      className={styles.search_bar}
    />
  );
};

export default SearchBar;
