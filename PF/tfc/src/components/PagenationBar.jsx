// For Pagenation
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import SubscriptionBox from './SubscriptionBox';

function PagenationBar({handlePageClick, pageCount}) {
    return (
    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
     />)
}

export default PagenationBar;