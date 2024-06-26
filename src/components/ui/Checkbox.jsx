// Checkbox.js
import { forwardRef } from "react";
import { cn } from "../../../utils";

const Checkbox = forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      className={cn("border px-2 py-1", className)}
      ref={ref}
      {...props}
    />
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
