import { useState } from "react"

export default function Switch ({ isSwitched=false, triggerFn }: { isSwitched?: boolean, triggerFn: () => void }) {
    const [switched, setSwitched] = useState(isSwitched);

    function handleSwitch () {
        setSwitched((switched) => !switched);
        triggerFn()
    }

    return <div onClick={handleSwitch} className="rounded-full relative flex items-center w-8 h-[15px] bg-stone-200 dark:bg-stone-900/50">
        <div className={`bg-accent rounded-full absolute w-[15px] h-[15px] ${switched ? 'translate-x-full' : 'translate-x-0'} transition-transform duration-300 ease-in`}></div>
    </div>
}