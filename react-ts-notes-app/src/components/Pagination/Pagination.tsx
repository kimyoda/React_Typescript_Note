import { PageButton } from "@/types";
import { useEffect, useState } from "react";

//  How many page buttons to show at the start and end
const END_COUNT = 1;
// How many page buttons to show before and after current page
const MIDDLE_COUNT = 1;

export const Pagination = ({
  totalPages,
  currentPage,
  onPageClick,
  onPrevClick,
  onNextClick,
}: Props) => {
  const [pageButtons, setPageButtons] = useState<PageButton[]>([]);

  useEffect(() => {
    let dots = false;
    const buttons: PageButton[] = [];
    for (let i = 1; i < totalPages + 1; i++) {
      if (i === currentPage) {
        buttons.push({ page: i, current: true, dots: false });
      } else {
        if (
          i <= END_COUNT ||
          (i >= currentPage - MIDDLE_COUNT &&
            i <= currentPage + MIDDLE_COUNT) ||
          i > totalPages - END_COUNT
        ) {
          buttons.push({ page: i, current: false, dots: false });
          dots = true;
        } else if (dots) {
          buttons.push({ page: i, current: false, dots: true });
          dots = false;
        }
      }
    }
    setPageButtons(buttons);
  }, [currentPage, totalPages]);
  return (
    <div className="is-flex is-justify-content-center is-align-items-center mt-4">
      <button
        type="button"
        onClick={onPrevClick}
        disabled={currentPage === 1}
        className="button mx-1"
      >
        이전
      </button>
      {pageButtons.map((pageButton) => {
        if (pageButton.current) {
          return (
            <button
              type="button"
              disabled
              key={pageButton.page}
              className="button is-danger is-light mx-1"
            >
              {currentPage}
            </button>
          );
        } else if (!pageButton.current && !pageButton.dots) {
          return (
            <button
              type="button"
              onClick={() => onPageClick(pageButton.page)}
              key={pageButton.page}
              className="button is-link is-light mx-1"
            >
              {pageButton.page}
            </button>
          );
        } else if (!pageButton.current && pageButton.dots) {
          return (
            <button
              type="button"
              disabled
              key={pageButton.page}
              className="button mx-1"
            >
              ...
            </button>
          );
        }
        return null;
      })}
      <button
        type="button"
        onClick={onNextClick}
        disabled={currentPage === totalPages}
        className="button mx-1"
      >
        다음
      </button>
    </div>
  );
};

interface Props {
  totalPages: number;
  currentPage: number;
  onPageClick: (page: number) => void;
  onPrevClick: () => void;
  onNextClick: () => void;
}
