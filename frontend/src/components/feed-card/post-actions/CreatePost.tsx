import { useAtom, useSetAtom } from "jotai";
import React from "react";
import {
	createPostAtom,
	createPostDialogAtom,
	createPostErrorAtom,
	createPostImagePreviewsAtom,
	createPostLoadingAtom,
	createPostSelectedImagesAtom,
} from "./postAtoms";
import { FeedCardProps } from "../FeedCard";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

type CreatePostProps = {
	children?: React.ReactNode;
	onPostAdded?: (post: FeedCardProps) => void;
};

const CreatePost = ({ children, onPostAdded }: CreatePostProps) => {
	//Dialog state management
	const [isOpen, setIsOpen] = useAtom(createPostDialogAtom);
	const [isLoading, setIsLoading] = useAtom(createPostLoadingAtom);
	const [error, setError] = useAtom(createPostErrorAtom);

	//Form Data
	const [formData, setFormData] = useAtom(createPostAtom);

	//Local state for image handling
	const setSelectedImages = useSetAtom(createPostSelectedImagesAtom);
	const [imagePreviews, setImagePreviews] = useAtom(createPostImagePreviewsAtom);


	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;

		//Update only the set field
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			setIsLoading(true);
			setError(null); //Clear any exisiting errors

			
			if (!formData.postTitle.trim()){
				throw new Error("Post title is required");
			} 

			if (!formData.textContent.trim() && formData.images.length === 0){
				throw new Error("Please add an image or add text to share");
			}

			const newPost: FeedCardProps = {
				id: Date.now(),
				type: // Check if type has image/s if not return text
					formData.images.length === 1
						? "single-image"
						: formData.images.length > 1
						? "multiple-images"
						: "text",
				images:
					formData.images.length > 0
						? formData.images.map((img) => URL.createObjectURL(img))
						: [],
				textContent: formData.textContent,
				author: "current user", //TO DO: Implement user here,
				avatarUrl: "user URL", //Replace with actual url,
				tags: formData.tags
					.split(" ")
					.map((tag) => tag.trim())
					.filter((tag) => tag !== ""),
				date: new Date(),
				game: formData.game,
				postTitle: formData.postTitle,
				likeCount: 0,
				commentCount: 0,
			};

			//Log in console
			console.log("Creating post: ", newPost);
			// Add your API call here to create the post
			// const response = await fetch('/api/posts', { method: 'POST', body: formData });

			// Reset form
			setFormData({
				postTitle: "",
				textContent: "",
				game: "",
				tags: "",
				images: [],
			});

			//close the dialog
			setIsOpen(false);

			// Notify parent component
			if (onPostAdded) {
				onPostAdded(newPost);
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Error creating post";
			setError(errorMessage);
			console.log("Error creating post: ", error);
		} finally {
			setIsLoading(false);
			
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		setFormData((prev) => ({
			...prev,
			images: files,
		}));

		if (files.length > 0){
			setSelectedImages(prev => [...prev, ...files]);
			files.forEach(file => {
				const reader = new FileReader();
				reader.onload = (e) => {
					const result = e.target?.result as string;
					setImagePreviews(prev =>[...prev, result]);
				}
				reader.readAsDataURL(file);
			});
		};
		
	};

	const removeImage = (index:number) => {
		setSelectedImages(prev => prev.filter((_, i) => i !== index));
		setImagePreviews(prev => prev.filter((_, i) => i !== index));
	}

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
				<DialogTitle className="sr-only">Create Post</DialogTitle>

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
									disabled={
										isLoading || !formData.postTitle.trim()
									}
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
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default CreatePost;
