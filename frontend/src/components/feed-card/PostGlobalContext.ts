//This file contains the context for feedcard elements to prevent prop drilling
import { createContext } from "react";

type PostGlobalContext = {
	id: number;
	type: string;
	images?: string[];
	textContent?: string;
	author: string;
	avatarUrl: string;
	tags?: string[];
	date: Date;
	game: string;
	postTitle: string;
	likeCount?: number;
	commentCount?: number;
	onLike?: () => void;
	onComment?: () => void;
    liked: boolean;
} | null;

export const PostGlobalContext = createContext<PostGlobalContext>(null);
