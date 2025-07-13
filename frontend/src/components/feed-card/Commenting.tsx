import React, { useState } from "react";
import "./commenting-scrollbar.css";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart } from "lucide-react";
import Image from "next/image";

type Comment = {
	id: number;
	user: {
		name: string;
		avatarUrl?: string;
	};
	text: string;
	date: Date;
	likes: number;
	liked: boolean;
	replies: Comment[];
};

const mockUsers = [
	{ name: "You", avatarUrl: undefined },
	{ name: "Alice", avatarUrl: undefined },
	{ name: "Bob", avatarUrl: undefined },
];

type CommentingProps = {
	trigger: React.ReactNode;
	cardInner: React.ReactNode;
	cardFooter: React.ReactNode;
	author: string;
	likeCount: number;
	liked: boolean;
	onLike: () => void;
};

const Commenting = ({
	trigger,
	cardInner,
	cardFooter,
	author,
}: CommentingProps) => {
	const [comments, setComments] = useState<Comment[]>([
		{
			id: 1,
			user: mockUsers[1],
			text: "Great post!",
			date: new Date(Date.now() - 1000 * 60 * 60),
			likes: 2,
			liked: false,
			replies: [
				{
					id: 2,
					user: mockUsers[2],
					text: "I agree!",
					date: new Date(Date.now() - 1000 * 60 * 30),
					likes: 1,
					liked: false,
					replies: [],
				},
			],
		},
	]);
	const [input, setInput] = useState("");
	const [replyTo, setReplyTo] = useState<number | null>(null);
	const [replyInput, setReplyInput] = useState("");

	const handlePost = () => {
		if (input.trim()) {
			setComments([
				{
					id: Date.now(),
					user: mockUsers[0],
					text: input,
					date: new Date(),
					likes: 0,
					liked: false,
					replies: [],
				},
				...comments,
			]);
			setInput("");
		}
	};

	const handleReply = (parentId: number) => {
		if (!replyInput.trim()) return;
		setComments((prev) =>
			prev.map((c) =>
				c.id === parentId
					? {
							...c,
							replies: [
								{
									id: Date.now(),
									user: mockUsers[0],
									text: replyInput,
									date: new Date(),
									likes: 0,
									liked: false,
									replies: [],
								},
								...c.replies,
							],
					  }
					: c
			)
		);
		setReplyInput("");
		setReplyTo(null);
	};

	const handleLike = (id: number, isReply = false, parentId?: number) => {
		setComments((prev) =>
			prev.map((c) => {
				if (!isReply && c.id === id) {
					return {
						...c,
						liked: !c.liked,
						likes: c.liked ? c.likes - 1 : c.likes + 1,
					};
				}
				if (isReply && c.id === parentId) {
					return {
						...c,
						replies: c.replies.map((r) =>
							r.id === id
								? {
										...r,
										liked: !r.liked,
										likes: r.liked ? r.likes - 1 : r.likes + 1,
								  }
								: r
						),
					};
				}
				return c;
			})
		);
	};

	function renderComment(comment: Comment, isReply = false, parentId?: number) {
		return (
			<div
				key={comment.id}
				className={`flex gap-2 items-start ${isReply ? "ml-6" : ""}`}
			>
				<div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
					{comment.user.avatarUrl ? (
						<Image						src={comment.user.avatarUrl}
							alt={comment.user.name}
							className="w-8 h-8 rounded-full"
						/>
					) : (
						comment.user.name[0].toUpperCase()
					)}
				</div>
				<div className="flex-1">
					<div className="flex items-center gap-2">
						<span className="font-medium text-xs">{comment.user.name}</span>
						<span className="text-xs text-muted-foreground">
							{comment.date.toLocaleString()}
						</span>
					</div>
					<div className="text-sm mb-1">{comment.text}</div>
					<div className="flex gap-2 items-center text-xs">
						<button
							className={`hover:text-primary transition flex items-center gap-1 ${
								comment.liked ? "text-red-500" : ""
							}`}
							onClick={() => handleLike(comment.id, isReply, parentId)}
							type="button"
						>
							<Heart className="h-3 w-3" /> {comment.likes}
						</button>
						<button
							className="hover:text-primary transition"
							onClick={() => setReplyTo(comment.id)}
							type="button"
						>
							Reply
						</button>
					</div>
					{replyTo === comment.id && !isReply && (
						<form
							className="flex gap-2 mt-1"
							onSubmit={(e) => {
								e.preventDefault();
								handleReply(comment.id);
							}}
						>
							<Input
								value={replyInput}
								onChange={(e) => setReplyInput(e.target.value)}
								placeholder="Write a reply..."
								className="text-xs"
							/>
							<Button type="submit" size="sm" disabled={!replyInput.trim()}>
								Post
							</Button>
							<Button
								type="button"
								size="sm"
								variant="ghost"
								onClick={() => setReplyTo(null)}
							>
								Cancel
							</Button>
						</form>
					)}
					{/* Render replies */}
					{comment.replies.length > 0 && (
						<div className="flex flex-col gap-2 mt-1">
							{comment.replies.map((r) => renderComment(r, true, comment.id))}
						</div>
					)}
				</div>
			</div>
		);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>

			<DialogContent className="h-[700px] max-h-[90vh] max-w-3xl p-4 mx-auto mt-8 mb-8">
				<div className="sticky top-0 bg-background px-10 pt-8 pb-4 rounded-xl border-b">
					<DialogTitle className="text-center font-semibold leading-1 mb-2">
						{author}`&apos;`s Post
					</DialogTitle>
				</div>
				<div className="overflow-y-auto comment-dialog-scrollbar comment-dialog-scrollable-content px-10 pb-8 pt-4">
					<div className="mb-4">
						{cardInner}
						{cardFooter}
					</div>
					{/* Comment input and list */}
					<DialogHeader className="px-0">
						<div>
							<div className="flex flex-col gap-3 mt-2">
								<form
									className="flex gap-3"
									onSubmit={(e) => {
										e.preventDefault();
										handlePost();
									}}
								>
									<Input
										value={input}
										onChange={(e) => setInput(e.target.value)}
										placeholder="Add a comment..."
									/>
									<Button type="submit" disabled={!input.trim()} size="sm">
										Post
									</Button>
								</form>
								<div className="flex flex-col gap-2 mt-1">
									{comments.length === 0 && (
										<span className="text-xs text-muted-foreground">
											No comments yet.
										</span>
									)}
									{comments.map((c) => renderComment(c))}
								</div>
							</div>
						</div>
					</DialogHeader>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default Commenting;
