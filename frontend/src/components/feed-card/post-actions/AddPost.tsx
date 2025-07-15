"use client";

import React, { useState } from "react";
import { FeedCardProps } from "@/components/feed-card/FeedCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface AddPostDialogProps {
    children?: React.ReactNode;
    onPostAdded?: (post: FeedCardProps) => void;
}

const AddPost = ({ children, onPostAdded }: AddPostDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        postTitle: "",
        textContent: "",
        game: "",
        tags: "",
        images: [] as File[]
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Create new post object
            const newPost: FeedCardProps = {
                id: Date.now(), // Temporary ID, replace with actual API response
                type: formData.images.length > 0 ? "single-image" : "text",
                postTitle: formData.postTitle,
                textContent: formData.textContent,
                game: formData.game,
                tags: formData.tags.split(" ").filter(tag => tag.trim() !== ""),
                images: formData.images.length > 0 ? [URL.createObjectURL(formData.images[0])] : [],
                author: "Current User", // Replace with actual user data
                avatarUrl: "/default-avatar.png", // Replace with actual avatar
                date: new Date(),
                likeCount: 0,
                commentCount: 0
            };

            console.log("Creating post:", newPost);
            // Add your API call here to create the post
            // const response = await fetch('/api/posts', { method: 'POST', body: formData });
            
            // Reset form
            setFormData({
                postTitle: "",
                textContent: "",
                game: "",
                tags: "",
                images: []
            });

            // Close dialog
            setIsOpen(false);
            
            // Notify parent component
            if (onPostAdded) {
                onPostAdded(newPost);
            }
        } catch (error) {
            setError('Error creating post');
            console.error('Error creating post:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setFormData(prev => ({
            ...prev,
            images: files
        }));
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button variant="default" size="sm">
                        <Plus size={16} />
                        Add Post
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-[750px] max-h-[90vh] overflow-y-auto">
                <div className="flex flex-col items-center p-6">
                    {error && (
                        <div className="mb-4 w-full max-w-lg bg-red-400 p-4 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="w-full max-w-[700px]">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold">Create New Post</h3>
                                <Button 
                                    type="submit" 
                                    disabled={isLoading || !formData.postTitle || !formData.textContent}
                                >
                                    {isLoading ? "Creating..." : "Create Post"}
                                </Button>
                            </div>

                            <Input
                                className="w-full h-[59px] p-5 border rounded-[10px]"
                                type="text"
                                id="post-title"
                                name="postTitle"
                                value={formData.postTitle}
                                onChange={handleInputChange}
                                placeholder="Enter your post title"
                                required
                            />

                            <textarea
                                className="w-full h-[150px] p-5 border rounded-[10px] resize-none"
                                id="text-content"
                                name="textContent"
                                value={formData.textContent}
                                onChange={handleInputChange}
                                placeholder="Share your clips, wins, or ask the community..."
                                rows={4}
                                required
                            />

                            <Input
                                className="w-full h-[59px] p-5 border rounded-[10px]"
                                type="text"
                                id="game"
                                name="game"
                                value={formData.game}
                                onChange={handleInputChange}
                                placeholder="What game are you playing?"
                            />

                            <Input
                                className="w-full h-[59px] p-5 border rounded-[10px]"
                                type="text"
                                id="tags"
                                name="tags"
                                value={formData.tags}
                                onChange={handleInputChange}
                                placeholder="Add hashtags like #gaming #minecraft #victory"
                            />

                            <Input
                                className="w-full h-[59px] p-5 border rounded-[10px]"
                                type="file"
                                id="images"
                                name="images"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                                placeholder="Upload images"
                            />

                            {formData.images.length > 0 && (
                                <div className="text-sm text-gray-600">
                                    {formData.images.length} image(s) selected
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddPost;