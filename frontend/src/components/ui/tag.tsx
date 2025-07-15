import React from "react";
import { cn } from "@/lib/utils";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "secondary" | "destructive" | "outline";
    size?: "sm" | "md" | "lg";
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
    ({ className, variant = "default", size = "md", ...props }, ref) => {
        return (
            <span
                ref={ref}
                className={cn(
                    "inline-flex items-center rounded-md px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer",
                    {
                        "bg-purple-600 text-white hover:bg-purple-700": variant === "default",
                        "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
                        "bg-destructive text-destructive-foreground hover:bg-destructive/90": variant === "destructive",
                        "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
                    },
                    {
                        "px-2 py-0.5 text-xs": size === "sm",
                        "px-3 py-1 text-sm": size === "md",
                        "px-4 py-1.5 text-base": size === "lg",
                    },
                    className
                )}
                {...props}
            />
        );
    }
);

Tag.displayName = "Tag";

export { Tag };
