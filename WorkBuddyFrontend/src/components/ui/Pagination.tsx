import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type PaginationProps = {
    startingPage: number;
    endingPage: number;
}


export default function Pagination ({startingPage, endingPage }: PaginationProps) {
    const [ page, setPage ] = useState(startingPage);
    
    return <div className="text-muted-font">
        <button><ChevronLeft /></button>
        
        <h3>Page {page} of {endingPage}</h3>

        <button><ChevronRight /></button>
        
    </div>
}