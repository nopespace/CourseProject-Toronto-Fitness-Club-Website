import * as React from "react";
import Navigation from "../components/Navigation";
import axios from "axios";

// For Pagenation
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';


const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}

function PaginatedItems({ itemsPerPage }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

class Studios extends React.Component {
  state = {
    details: [],
  };

  componentDidMount() {
    let data;

    axios({
      method: "get",
      url: "http://127.0.0.1:8000/studios/list/?lat=1&lon=11",
      // TODO: Add the lat and lon here
    })
      .then((res) => {
        data = res.data;
        this.setState({
          details: data,
        });
        console.log(data);
      })
      .catch((err) => {});
  }

  render() {
    return (
      <>
        <Navigation />
        <PaginatedItems itemsPerPage={4} />
      </>
    );
  //   return (
  //     <>
  //       <Navigation />
  //       <div className="grid place-items-center my-20">
  //         <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
  //           <div class="flex flex-1 justify-between sm:hidden">
  //             <a
  //               href="#"
  //               class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
  //             >
  //               Previous
  //             </a>
  //             <a
  //               href="#"
  //               class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
  //             >
  //               Next
  //             </a>
  //           </div>
  //           <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
  //             <div>
  //               <p class="text-sm text-gray-700">
  //                 Showing
  //                 <span class="font-medium">1</span>
  //                 to
  //                 <span class="font-medium">10</span>
  //                 of
  //                 <span class="font-medium">97</span>
  //                 results
  //               </p>
  //             </div>
  //             <div>
  //               <nav
  //                 class="isolate inline-flex -space-x-px rounded-md shadow-sm"
  //                 aria-label="Pagination"
  //               >
  //                 <a
  //                   href="#"
  //                   class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
  //                 >
  //                   <span class="sr-only">Previous</span>
  //                   <svg
  //                     class="h-5 w-5"
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     viewBox="0 0 20 20"
  //                     fill="currentColor"
  //                     aria-hidden="true"
  //                   >
  //                     <path
  //                       fill-rule="evenodd"
  //                       d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
  //                       clip-rule="evenodd"
  //                     />
  //                   </svg>
  //                 </a>
  //                 <a
  //                   href="#"
  //                   aria-current="page"
  //                   class="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
  //                 >
  //                   1
  //                 </a>
  //                 <a
  //                   href="#"
  //                   class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
  //                 >
  //                   2
  //                 </a>
  //                 <a
  //                   href="#"
  //                   class="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
  //                 >
  //                   3
  //                 </a>
  //                 <span class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
  //                   ...
  //                 </span>
  //                 <a
  //                   href="#"
  //                   class="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
  //                 >
  //                   8
  //                 </a>
  //                 <a
  //                   href="#"
  //                   class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
  //                 >
  //                   9
  //                 </a>
  //                 <a
  //                   href="#"
  //                   class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
  //                 >
  //                   10
  //                 </a>
  //                 <a
  //                   href="#"
  //                   class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
  //                 >
  //                   <span class="sr-only">Next</span>
  //                   <svg
  //                     class="h-5 w-5"
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     viewBox="0 0 20 20"
  //                     fill="currentColor"
  //                     aria-hidden="true"
  //                   >
  //                     <path
  //                       fill-rule="evenodd"
  //                       d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
  //                       clip-rule="evenodd"
  //                     />
  //                   </svg>
  //                 </a>
  //               </nav>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div>
  //         {this.state.details.map((item) => (
  //           <div key={item.id}>
  //             <p>{item.name}</p>
  //             <p>{item.address}</p>
  //           </div>
  //         ))}
  //       </div>
  //     </>
  //   );
  }
}
// TODO: Not sure why details empty
export default Studios;
