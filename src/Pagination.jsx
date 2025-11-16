export default function Pagination({
    currentPage,
    totalPages,
    onPrevClick,
    onNextClick,
}) {
  return (
    <div className="pagination justify-content-center">
      <button
        className="btn btn-secondary"
        disabled={currentPage === 1}
        onClick={onPrevClick}
      >
        Prev
      </button>
      <div className="d-flex align-items-center p-2">
        {currentPage} / {totalPages}
      </div>
      <button
        className="btn btn-secondary"
        onClick={onNextClick}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
