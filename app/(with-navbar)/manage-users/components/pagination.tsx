import React from "react";
import styles from "../page.module.scss";

interface PaginationProps {
  page: number;
  setPage: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, setPage }) => {
  const handleNext = () => setPage(page + 1);
  const handlePrev = () => setPage(Math.max(page - 1, 1));

  return (
    <div className={styles.pagination}>
      <button onClick={handlePrev} disabled={page === 1}>
        Anterior
      </button>
      <span>Página {page}</span>
      <button onClick={handleNext}>Siguiente</button>
    </div>
  );
};

export default Pagination;
