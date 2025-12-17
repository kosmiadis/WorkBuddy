import { useState } from "react";

type BarChartProps = {
    maxY: number;
    title: string;
    data: { name: string, value: number}[]
}

function Bar ({value, yAxis}: {value: number, yAxis: number}) {
    const valueInPercentage = value * (100 / yAxis)

    return <div className={`bg-accent rounded-t-md w-[10px] h-[${valueInPercentage}%]`}>s</div>
}

export default function BarChart ({ maxY, title, data }: BarChartProps) {
    const [yAxisPoints, setYAxisPoints ] = useState(() => {
        const diff = Math.round(maxY / 3);
        const points = [];
        for (let i=0; i<3; i++) {
            points.push(maxY - i*diff);
        }
        return points;
    });

    if (!data) return <div>Not enought data to display!</div>
    
    return <div className="h-full flex flex-col gap-2">
        <h2>{title}</h2>
        
        <div className="grid grid-cols-[0.2fr_1fr]">
            <div className="flex flex-col gap-6 text-muted-font">
                {yAxisPoints.map(point => <span>{point}</span>)}
            </div>

            {/* Bars */}
            <div className="flex items-end h-full">
                {data.map(d => <Bar value={d.value} yAxis={maxY}/>)}
            </div>
        </div>
    </div>
}