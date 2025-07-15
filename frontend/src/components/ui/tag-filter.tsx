import React from "react";
import { Tag } from "../ui/tag";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TagFilterProps {
    availableTags: string[];
    selectedTags: string[];
    onTagToggle: (tag: string) => void;
    onClearAll: () => void;
    className?: string;
    maxVisible?: number;
}

export const TagFilter: React.FC<TagFilterProps> = ({
    availableTags,
    selectedTags,
    onTagToggle,
    onClearAll,
    className,
    maxVisible = 10
}) => {
    const [showAll, setShowAll] = React.useState(false);
    
    const displayTags = showAll ? availableTags : availableTags.slice(0, maxVisible);
    const hasMore = availableTags.length > maxVisible;
    
    return (
        <div className={cn("space-y-3", className)}>
            {/* Selected Tags */}
            {selectedTags.length > 0 && (
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">Active Filters</h4>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClearAll}
                            className="h-auto p-1 text-xs"
                        >
                            <X className="h-3 w-3 mr-1" />
                            Clear All
                        </Button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {selectedTags.map(tag => (
                            <Tag
                                key={tag}
                                variant="default"
                                size="sm"
                                className="cursor-pointer"
                                onClick={() => onTagToggle(tag)}
                            >
                                #{tag}
                                <X className="h-3 w-3 ml-1" />
                            </Tag>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Available Tags */}
            <div className="space-y-2">
                <h4 className="text-sm font-medium">Filter by Tags</h4>
                <div className="flex flex-wrap gap-1">
                    {displayTags.map(tag => (
                        <Tag
                            key={tag}
                            variant={selectedTags.includes(tag) ? "default" : "outline"}
                            size="sm"
                            className="cursor-pointer transition-colors"
                            onClick={() => onTagToggle(tag)}
                        >
                            #{tag}
                        </Tag>
                    ))}
                    {hasMore && !showAll && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowAll(true)}
                            className="h-auto p-1 text-xs"
                        >
                            +{availableTags.length - maxVisible} more
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
