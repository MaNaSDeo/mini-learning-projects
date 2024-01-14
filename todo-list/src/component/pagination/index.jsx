import firstPagePath from "../../Assests/angles-left-solid.svg";
import lastPagePath from "../../Assests/angles-right-solid.svg";
import prevPagePath from "../../Assests/angle-left-solid.svg";
import nextPagePath from "../../Assests/angle-right-solid.svg";
import "./Pagination.css";

function Pagination({ totalPages, currentPage, setCurrentPage }) {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  return (
    <div className="pagination">
      <img
        src={firstPagePath}
        alt="First page"
        onClick={() => handlePageChange(1)}
      />
      <img
        src={prevPagePath}
        alt="Previous page"
        onClick={() => handlePageChange(currentPage - 1)}
      />
      <span>{currentPage}</span>
      <img
        src={nextPagePath}
        alt="Next page"
        onClick={() => handlePageChange(currentPage + 1)}
      />
      <img
        src={lastPagePath}
        alt="Last page"
        onClick={() => handlePageChange(totalPages)}
      />
    </div>
  );
}

export default Pagination;
