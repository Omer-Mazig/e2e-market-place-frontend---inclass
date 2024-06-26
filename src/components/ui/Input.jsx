// Input.js
import { forwardRef } from "react";
import { cn } from "../../../utils";

const Input = forwardRef(({ className, ...props }, ref) => {
  return (
    <input className={cn("border px-2 py-1", className)} ref={ref} {...props} />
  );
});

Input.displayName = "Input";

export { Input };
