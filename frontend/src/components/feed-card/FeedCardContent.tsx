/**
 * FeedCardContent component renders different types of feed content:
 * - A single image
 * - A grid of up to 3 images (with a "+N more" indicator if more exist)
 * - Text content
 *
 * Props:
 * - type: Determines the content type ("single-image", "grid-images", or "text")
 * - images: Optional array of image URLs
 * - textContent: Optional string for text posts
 */

import Image from "next/image";

interface Props {
	type: "single-image" | "grid-images" | "text";
	images?: string[];
	textContent?: string;
}

export function FeedCardContent({
	type,
	images = [],
	textContent = "",
}: Props) {
	if (type === "single-image") {
		//if type is just a single image
		if (!images[0]) {
			return null;
		}
		return (
			<Image 
				width={400}
				height={400}
				src={images[0]}
				alt={`Image ${ + 1}`}
						className="w-full aspect-square object-cover flex items-center justify-center rounded-md bg-muted text-sm text-muted-foreground"
			/>
		);
	}

	if (type === "grid-images") {
		// if type is multiple images
		return (
			<div className="grid grid-cols-2 gap-2">
				{images.slice(0, 4).map((img, i) => (
					<Image
						width={400}
						height={400}
						key={i}
						src={img}
						alt={`Image ${i + 1}`}
						className="w-full aspect-square object-cover flex items-center justify-center rounded-md bg-muted text-sm text-muted-foreground"
					/>
				))}
				{images.length > 4 && (
					<div className="w-full aspect-square flex items-center justify-center rounded-md bg-muted text-sm text-muted-foreground">
						+{images.length - 3} more
					</div>
				)}
			</div>
		);
	}

	return ( //if type is just paragraph
		<p className="leading-relaxed text-left text-sm text-foreground whitespace-pre-wrap">
			{textContent}
		</p>
	);
}
