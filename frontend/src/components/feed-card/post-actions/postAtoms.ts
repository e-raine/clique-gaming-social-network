import { atom } from "jotai";
import { FeedCardProps } from "../FeedCard";

export const createPostAtom = atom<{
	postTitle: string;
	textContent: string;
	game: string;
	tags: string;
	images: File[];
}>({
	postTitle: "",
	textContent: "",
	game: "",
	tags: "",
	images: [],
});

export const createPostDialogAtom = atom<boolean>(false);
export const createPostErrorAtom = atom<string | null> (null);
export const createPostLoadingAtom = atom <boolean> (false);
export const createPostSelectedImagesAtom = atom <File[]>([]);
export const createPostImagePreviewsAtom = atom <string[]>([]);

export const editPostAtom = atom<FeedCardProps | null>(null);
export const editPostDialogAtom = atom<boolean>(false);
export const editPostErrorAtom = atom<string | null>(null);
export const editPostLoadingAtom = atom <boolean> (false);
export const editPostSelectedImagesAtom = atom <File[]>([]);
