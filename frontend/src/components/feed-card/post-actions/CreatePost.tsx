import { useAtom } from "jotai";
import React from "react";
import {
	createPostAtom,
	createPostDialogAtom,
	createPostErrorAtom,
	createPostLoadingAtom,
} from "./postAtoms";
import { FeedCardProps } from "../FeedCard";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogTitle,
	DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

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

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);

		setFormData((prev) => ({
			...prev,
			images: files,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const checkType = ({ formData }) => {
			if (formData.images.length === 1) {
				return "single-image";
			} else if (formData.images.length > 1) {
				return "multiple-images";
			} else return "text";
		};

		try {
			setIsLoading(true);
			setError(null); //Clear any exisiting errors

			const newPost: FeedCardProps = {
				id: Date.now(),
				type: checkType({ formData }),
				images:
					formData.images.length > 0
						? [URL.createObjectURL(formData.images[0])]
						: [],
				textContent: formData.textContent,
				author: "current user", //TO DO: Implement user here,
				avatarUrl: "", //Replace with actual url,
				tags: formData.tags.split(" ").filter((tag) => tag.trim() !== ""),
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
			setError("Error creating post");
			console.log("Error creating post: ", error);
		} finally {
			setIsLoading(false);
		}
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
										isLoading || !formData.postTitle || !formData.textContent
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

export default CreatePost;
