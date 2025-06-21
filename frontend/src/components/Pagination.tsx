import IconArrowLeft from './Icon/IconArrowLeft';

interface PaginationProps {
   totalRecordsCount: number;
   pageSize: number;
   page: number;
   setPage: (page: number) => void;
   bg?: string;
}

export const Pagination = (props: PaginationProps) => {
   const bg = props.bg || 'bg-gray-300 dark:bg-dark';
   const totalRecords = props.totalRecordsCount || 0;
   const pageSize = props.pageSize || 10;
   const page = props.page || 1;
   const setPage = props.setPage;
   const totalPages = Math.ceil(totalRecords / pageSize);

   const pages: (number | string)[] = [];

   if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
   } else {
      if (page <= 3) {
         pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (page >= totalPages - 2) {
         pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
         pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
      }
   }

   return (
      <div className="py-5">
         <div className="flex items-center justify-between" aria-label="Pagination">
            <div className="hidden sm:block">
               <p className="text-sm text-gray-700">
                  Showing
                  <span className="font-medium"> {(page - 1) * pageSize + 1} </span>
                  to
                  <span className="font-medium"> {page * pageSize} </span>
                  of
                  <span className="font-medium"> {totalRecords} </span>
                  results
               </p>
            </div>
            {totalPages >= 1 && (
               <div className="flex justify-between space-x-2">
                  <button onClick={() => setPage(page - 1)} className={`w-10 h-10 rounded-full flex items-center justify-center ${bg}  ${page === 1 && 'opacity-50'}`} disabled={page === 1}>
                     &lt;
                  </button>

                  {pages.map((item: number | string, index: number) => (
                     <button
                        key={index}
                        onClick={() => {
                           if (item !== '...') setPage(Number(item));
                        }}
                        disabled={item === '...'}
                        className={`w-10 h-10 rounded-full flex items-center justify-center  ${page === item ? 'bg-primary text-white' : bg}`}
                     >
                        {item.toString()}
                     </button>
                  ))}

                  <button
                     onClick={() => setPage(page + 1)}
                     className={`w-10 h-10 rounded-full flex items-center justify-center ${bg}  ${page === totalPages && 'opacity-50'}`}
                     disabled={page === totalPages}
                  >
                     &gt;
                  </button>
               </div>
            )}
         </div>
      </div>
   );
};

export default Pagination;
