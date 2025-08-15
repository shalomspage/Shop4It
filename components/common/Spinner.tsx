
import { cn } from "@/lib/utils";
import { ImSpinner3 } from "react-icons/im";

interface SpinnerProps {
    sm?: boolean;
    md?: boolean;
    lg?: boolean;
}

export default function Spinner({ sm, md, lg }: SpinnerProps) {
    const className = cn( 'animate-spin text-emerald-900', {
        'text-emerald-900': true,
        'w-4 h-4': sm,
        'w-8 h-8': md,
        'w-12 h-12': lg,
    });

    return (
        <div role="status">
            <ImSpinner3 className={className} />
            <span className="sr-only">Loading...</span>
        </div>
    );
}