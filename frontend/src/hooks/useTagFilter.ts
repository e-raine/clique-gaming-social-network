import { useState, useCallback } from 'react';

export interface TagFilterState {
    selectedTags: string[];
    isFiltering: boolean;
}

export interface PostWithTags {
    id: number;
    tags?: string[];
    [key: string]: unknown;
}

export const useTagFilter = (initialTags: string[] = []) => {
    const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
    
    const addTag = useCallback((tag: string) => {
        setSelectedTags(prev => {
            if (prev.includes(tag)) return prev;
            return [...prev, tag];
        });
    }, []);
    
    const removeTag = useCallback((tag: string) => {
        setSelectedTags(prev => prev.filter(t => t !== tag));
    }, []);
    
    const toggleTag = useCallback((tag: string) => {
        setSelectedTags(prev => {
            if (prev.includes(tag)) {
                return prev.filter(t => t !== tag);
            }
            return [...prev, tag];
        });
    }, []);
    
    const clearTags = useCallback(() => {
        setSelectedTags([]);
    }, []);
    
    const hasTag = useCallback((tag: string) => {
        return selectedTags.includes(tag);
    }, [selectedTags]);
    
    const filterPosts = useCallback((posts: PostWithTags[]) => {
        if (selectedTags.length === 0) return posts;
        
        return posts.filter(post => 
            post.tags && post.tags.some((tag: string) => selectedTags.includes(tag))
        );
    }, [selectedTags]);
    
    return {
        selectedTags,
        isFiltering: selectedTags.length > 0,
        addTag,
        removeTag,
        toggleTag,
        clearTags,
        hasTag,
        filterPosts
    };
};

// Common tag categories for gaming content
export const GAMING_TAG_CATEGORIES = {
    GAME_MODES: ['ranked', 'casual', 'competitive', 'arena', 'battle-royale', 'co-op', 'single-player'],
    ACHIEVEMENTS: ['victory', 'achievement', 'milestone', 'high-score', 'completion', 'speedrun'],
    SOCIAL: ['lfg', 'duo', 'squad', 'team', 'guild', 'clan', 'tournament'],
    CONTENT_TYPE: ['gameplay', 'tutorial', 'guide', 'tips', 'review', 'montage', 'highlight'],
    DIFFICULTY: ['easy', 'medium', 'hard', 'expert', 'nightmare', 'casual', 'hardcore'],
    GENRES: ['fps', 'moba', 'rpg', 'strategy', 'simulation', 'sports', 'racing', 'fighting']
};

// Helper function to get random tags for development/testing
export const getRandomTags = (count: number = 3): string[] => {
    const allTags = Object.values(GAMING_TAG_CATEGORIES).flat();
    const shuffled = [...allTags].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};
