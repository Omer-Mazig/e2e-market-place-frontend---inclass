import { forwardRef } from "react";
import { cn } from "../../../utils";
import { Link } from "react-router-dom";

const Button = forwardRef(
  ({ destructive, className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Link : "button";
    return (
      <Comp
        className={cn(
          "ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          "bg-sky-500 text-white hover:bg-sky-500/90",
          "h-10 px-4 py-2",
          destructive && "bg-red-500 hover:bg-red-500/90",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
