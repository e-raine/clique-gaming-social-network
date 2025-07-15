import React from "react";
import { Tag } from "../ui/tag";
import { cn } from "@/lib/utils";

export interface TagListProps extends React.HTMLAttributes<HTMLDivElement> {
    tags: string[];
    variant?: "default" | "secondary" | "destructive" | "outline";
    size?: "sm" | "md" | "lg";
    maxTags?: number;
    showMoreText?: string;
    onTagClick?: (tag: string) => void;
}

const TagList = React.forwardRef<HTMLDivElement, TagListProps>(
    ({ 
        className, 
        tags, 
        variant = "default", 
        size = "md", 
        maxTags,
        showMoreText = "more",
        onTagClick,
        ...props 
    }, ref) => {
        const [showAll, setShowAll] = React.useState(false);
        
        const visibleTags = React.useMemo(() => {
            if (!maxTags || showAll) return tags;
            return tags.slice(0, maxTags);
        }, [tags, maxTags, showAll]);

        const hasMoreTags = maxTags && tags.length > maxTags && !showAll;

        return (
            <div
                ref={ref}
                className={cn("flex flex-wrap gap-1", className)}
                {...props}
            >
                {visibleTags.map((tag, index) => (
                    <Tag
                        key={`${tag}-${index}`}
                        variant={variant}
                        size={size}
                        className={onTagClick ? "cursor-pointer hover:opacity-80" : ""}
                        onClick={() => onTagClick?.(tag)}
                    >
                        #{tag}
                    </Tag>
                ))}
                {hasMoreTags && (
                    <Tag
                        variant="outline"
                        size={size}
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setShowAll(true)}
                    >
                        +{tags.length - maxTags} {showMoreText}
                    </Tag>
                )}
            </div>
        );
    }
);

TagList.displayName = "TagList";

export { TagList };
