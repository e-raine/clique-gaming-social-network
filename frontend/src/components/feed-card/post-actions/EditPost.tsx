"use client";

import React, { useEffect } from "react";
import { FeedCardProps } from "@/components/feed-card/FeedCard";
import { atom, useAtom } from "jotai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Edit} from "lucide-react";

export const editPostAtom = atom<FeedCardProps | null>(null);
export const editPostDialogAtom = atom<boolean>(false);
export const editPostErrorAtom = atom<string | null>(null);

interface EditPostDialogProps {
    post: FeedCardProps;
    children?: React.ReactNode;
}

const EditPost = ({ post, children }: EditPostDialogProps) => {
    const [isOpen, setIsOpen] = useAtom(editPostDialogAtom);
    const [editPost, setEditPost] = useAtom(editPostAtom);
    const [error, setError] = useAtom(editPostErrorAtom);

    // Set the post data when dialog opens
    useEffect(() => {
        if (isOpen) {
            setEditPost(post);
        }
    }, [isOpen, post, setEditPost]);

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log("Updating post:", editPost);
            // Add your API call here to update the post
            
            setIsOpen(false);
            setError(null);
        } catch (error) {
            setError('Error Editing Post');
        }
    };

    const handleDeleteSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log("Deleting post:", editPost?.id);
            // Add your API call here to delete the post
            
            setIsOpen(false);
            setError(null);
        } catch (error) {
            setError('Error Deleting Post');
        }
    };

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

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button variant="outline" size="sm">
                        <Edit size={16} />
                        Edit
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

                    {editPost ? (
                        <div className="w-full max-w-[700px]">
                            <form onSubmit={handleEditSubmit} className="space-y-4">
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

                                <Input
                                    className="w-full h-[59px] p-5 border rounded-[10px]"
                                    type="text"
                                    id="game"
                                    name="game"
                                    value={editPost.game || ""}
                                    onChange={handlePostChange}
                                    placeholder="What game are you playing?"
                                />

                                <Input
                                    className="w-full h-[59px] p-5 border rounded-[10px]"
                                    type="text"
                                    id="tags"
                                    name="tags"
                                    value={editPost.tags?.join(" ") || ""}
                                    onChange={handlePostChange}
                                    placeholder="Add hashtags like #gaming #minecraft #victory"
                                />

                                <Input
                                    className="w-full h-[59px] p-5 border rounded-[10px]"
                                    type="file"
                                    id="images"
                                    name="images"
                                    accept="image/*"
                                    multiple
                                    placeholder="Upload images"
                                />
                            </form>
                        </div>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditPost;
