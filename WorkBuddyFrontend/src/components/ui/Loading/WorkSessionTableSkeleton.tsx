import Container from "../Container";
import Separator from "../Separator";

interface TableSkeletonI {
    headings: string[];
}

export default function WorkSessionTableSkeleton ({ headings }: TableSkeletonI) {

    
    return <Container><ul>
        <li className={`grid grid-cols-3 p-2`}>
            {headings.map(heading => <h3 className="text-sm" key={heading}>{heading}</h3>)}
        </li>

        <Separator />
        <div className="pb-2">
        {Array.from({ length: 5 }, (_, i) => i++).map((i) => (
            <li key={`skeleton_row_${i}`} className={`grid p-4 animate-[flash_1s_ease-in-out_infinite] duration-300 rounded-md odd:bg-main-background even:bg-secondary-background grid-cols-3 text-[15px]`}>
            </li>    
        ))}
        </div>
                
    </ul>
    </Container>
}