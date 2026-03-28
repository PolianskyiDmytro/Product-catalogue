import pagination from './Pagination.module.scss';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { useContext } from 'react';
import { ScrollToSectContext } from '../../../../contexts/ScrollToSectContext';

type Props = {
  pageCount: number;
};

export const Pagination: React.FC<Props> = ({ pageCount }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { scrollToSect } = useContext(ScrollToSectContext);
  const page = searchParams.get('page');
  const currentPage = page ? +page : 1;

  const getPageButtons = (): number[] => {
    if (pageCount <= 5) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }

    let start = currentPage - 2;
    let end = currentPage + 2;

    if (start < 1) {
      start = 1;
      end = 5;
    } else if (end > pageCount) {
      start = pageCount - 4;
      end = pageCount;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    const newPage = currentPage + 1;

    if (newPage <= pageCount) {
      params.set('page', String(newPage));
      setSearchParams(params);
      scrollToSect('top');
    }
  };

  return (
    <div className={pagination.pagination}>
      <button
        onClick={() => {
          const params = new URLSearchParams(searchParams);
          const newPage = page ? +page - 1 : 0;

          if (newPage > 0) {
            params.set('page', String(newPage));
          } else {
            params.delete('page');
          }

          setSearchParams(params);
          scrollToSect('top');
        }}
        className={cn(
          pagination.pagination__button,
          pagination.pagination__prev,
          {
            [pagination['pagination__prev--disabled']]: page === '1' || !page,
          },
        )}
      />

      <div className={pagination.pagination__pages} id="pagination">
        {getPageButtons().map(pageNum => {
          const isCurrentPage = currentPage === pageNum;

          return (
            <button
              key={pageNum}
              onClick={() => {
                const params = new URLSearchParams(searchParams);

                if (pageNum === 1) {
                  params.delete('page');
                } else {
                  params.set('page', String(pageNum));
                }

                setSearchParams(params);
                scrollToSect('top');
              }}
              className={cn(pagination.pagination__button, {
                [pagination['pagination__button--active']]: isCurrentPage,
              })}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleClick}
        className={cn(
          pagination.pagination__button,
          pagination.pagination__next,
          {
            [pagination['pagination__next--disabled']]:
              pageCount === (page ? +page : 1),
          },
        )}
      />
    </div>
  );
};
