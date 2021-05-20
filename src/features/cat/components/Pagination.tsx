import React from 'react';

export interface IPaginationProps {    
    currentPage: number;
    totalCount: number;
    onPageChange: (page: number) => void;
    pageSize: number;
}

const Pagination: React.FC<IPaginationProps> = ({ currentPage, totalCount, onPageChange, pageSize }) => {

    const handlePageChange = (page: number) => (): void => {
        onPageChange(page);
    };

    const numberOfPages = Math.ceil(totalCount / pageSize);

    const pageControls: JSX.Element[] = [];
    
    for (var i = 1; i <= numberOfPages; i++){
        pageControls.push(<li className="page-item" key={i}><a className="page-link" href="#" onClick={handlePageChange(i)}>{i}</a></li>)
    }

    return (
        <nav>
            <ul className="pagination pagination-lg justify-content-center">
                {
                    pageControls.map(x => x)
                }
            </ul>
        </nav>        
    )
};

export {
    Pagination
}