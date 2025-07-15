"use client";

import React, { useEffect, useState } from "react";
import { FeedCardProps } from "@/components/feed-card/FeedCard";
import { atom, useAtom } from "jotai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Edit, Plus, X } from "lucide-react";
import Image from "next/image";

/**
 * EditPost Component
 * 
 * A comprehensive dialog component for editing and deleting posts in the social media feed.
 * Features:
 * - Edit post title, content, game, and tags
 * - Image upload with preview functionality
 * - Delete post functionality
 * - Real-time form validation
 * - Responsive design
 */

//Jotai Atoms for global state management
export const editPostAtom = atom<FeedCardProps | null>(null);
export const editPostDialogAtom = atom<boolean>(false);
export const editPostErrorAtom = atom<string | null>(null);

/**
 * Props interface for the EditPost component
 */
interface EditPostDialogProps {
    post: FeedCardProps;
    children?: React.ReactNode;
}

/**
 * Main EditPost component
 * Handles editing and deleting posts with image upload functionality
 */
const EditPost = ({ post, children }: EditPostDialogProps) => {
    // Global state management using Jotai atoms
    const [isOpen, setIsOpen] = useAtom(editPostDialogAtom);
    const [editPost, setEditPost] = useAtom(editPostAtom);
    const [error, setError] = useAtom(editPostErrorAtom);
    
    // Local state for image handling
    const [selectedImages, setSelectedImages] = useState<File[]>([]); // Store File objects for upload
    const [imagePreviews, setImagePreviews] = useState<string[]>([]); // Store data URLs for preview display

    /**
     * Effect to initialize the post data when dialog opens
     * Sets the editPost atom with the current post data
     */
    useEffect(() => {
        if (isOpen) {
            setEditPost(post);
        }
    }, [isOpen, post, setEditPost]);

    /**
     * Handles form submission for editing a post
     * TODO: Replace console.log with actual API call
     * 
     * @param e - Form submission event
     */
    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log("Updating post:", editPost);
            console.log("Selected images:", selectedImages);
            // Add your API call here to update the post
            
            setIsOpen(false);
            setError(null);
        } catch {
            setError('Error Editing Post');
        }
    };

    /**
     * Handles post deletion
     * TODO: Replace console.log with actual API call
     * 
     * @param e - Form submission event
     */
    const handleDeleteSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log("Deleting post:", editPost?.id);
            // Add your API call here to delete the post
            
            setIsOpen(false);
            setError(null);
        } catch {
            setError('Error Deleting Post');
        }
    };

    /**
     * Handles input changes for text fields
     * Special handling for tags field - splits space-separated values into array
     * 
     * @param e - Input change event from text input or textarea
     */
    const handlePostChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        if (editPost) {
            const newPost: FeedCardProps = {
                ...editPost,
                [name]:
                    name === "tags"
                        ? value.split(" ").filter((tag) => tag.trim() !== "")
                        : value,
            };
            setEditPost(newPost);
        }
    };

    /**
     * Handles image file selection and creates preview URLs
     * Uses FileReader API to generate data URLs for immediate preview
     * 
     * @param e - File input change event
     */
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            // Add new files to existing selected images
            setSelectedImages(prev => [...prev, ...files]);
            
            // Create preview URLs for immediate display
            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const result = e.target?.result as string;
                    setImagePreviews(prev => [...prev, result]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    /**
     * Removes an image from both the selected files and preview arrays
     * 
     * @param index - Index of the image to remove
     */
    const removeImage = (index: number) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {/* Dialog Trigger - Can be customized via children prop */}
            <DialogTrigger asChild>
                {children || (
                    <Button variant="outline" size="sm">
                        <Edit size={16} />
                        Edit
                    </Button>
                )}
            </DialogTrigger>
            
            {/* Main Dialog Content */}
            <DialogContent className="max-w-[750px] max-h-[90vh] overflow-y-auto">
                {/* Accessibility: Hidden title for screen readers */}
                <DialogTitle className="sr-only">Edit Post</DialogTitle>
                
                <div className="flex flex-col items-center p-6">
                    {/* Error Display */}
                    {error && (
                        <div className="mb-4 w-full max-w-lg bg-red-400 p-4 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Main Form Content */}
                    {editPost ? (
                        <div className="w-full max-w-[700px]">
                            <form onSubmit={handleEditSubmit} className="space-y-4">
                                {/* Header with title and action buttons */}
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold">Edit Post</h3>
                                    <div className="flex gap-2">
                                        <Button 
                                            type="button" 
                                            variant="destructive" 
                                            onClick={handleDeleteSubmit}
                                        >
                                            Delete
                                        </Button>
                                        <Button type="submit">
                                            Save
                                        </Button>
                                    </div>
                                </div>

                                {/* Post Title Input */}
                                <Input
                                    className="w-full h-[59px] p-5 border rounded-[10px]"
                                    type="text"
                                    id="post-title"
                                    name="postTitle"
                                    value={editPost.postTitle || ""}
                                    onChange={handlePostChange}
                                    placeholder="Enter your post title"
                                    required
                                />

                                {/* Post Content Textarea */}
                                <textarea
                                    className="w-full h-[150px] p-5 border rounded-[10px] resize-none"
                                    id="text-content"
                                    name="textContent"
                                    value={editPost.textContent || ""}
                                    onChange={handlePostChange}
                                    placeholder="Share your clips, wins, or ask the community..."
                                    rows={4}
                                    required
                                />

                                {/* Game Input */}
                                <Input
                                    className="w-full h-[59px] p-5 border rounded-[10px]"
                                    type="text"
                                    id="game"
                                    name="game"
                                    value={editPost.game || ""}
                                    onChange={handlePostChange}
                                    placeholder="What game are you playing?"
                                />

                                {/* Tags Input - Space-separated values */}
                                <Input
                                    className="w-full h-[59px] p-5 border rounded-[10px]"
                                    type="text"
                                    id="tags"
                                    name="tags"
                                    value={editPost.tags?.join(" ") || ""}
                                    onChange={handlePostChange}
                                    placeholder="Add hashtags like #gaming #minecraft #victory"
                                />

                                {/* Image Upload Section */}
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {/* Add Images Button - Square upload area */}
                                        <div className="relative">
                                            <input
                                                type="file"
                                                id="images"
                                                name="images"
                                                accept="image/*"
                                                multiple
                                                onChange={handleImageChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                aria-label="Upload images"
                                                title="Upload images"
                                            />
                                            <div className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors cursor-pointer">
                                                <div className="flex flex-col items-center gap-1 text-muted-foreground">
                                                    <Plus size={20} />
                                                    <span className="text-xs">Add Images</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Image Previews - Shows selected images with remove functionality */}
                                        {imagePreviews.map((preview, index) => (
                                            <div key={index} className="relative group">
                                                <Image
                                                    src={preview}
                                                    alt={`Preview ${index + 1}`}
                                                    width={200}
                                                    height={96}
                                                    className="w-full h-24 object-cover rounded-lg border"
                                                />
                                                {/* Remove button - appears on hover */}
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    aria-label={`Remove image ${index + 1}`}
                                                    title={`Remove image ${index + 1}`}
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </form>
                        </div>
                    ) : (
                        // Loading state
                        <div>Loading...</div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

/**
 * Export the EditPost component as default
 * Used in feed cards dropdown menu for post editing functionality
 */
export default EditPost;
