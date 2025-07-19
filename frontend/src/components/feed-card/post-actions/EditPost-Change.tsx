import React  from "react";
import { FeedCardProps } from "../FeedCard";
import { useAtom } from "jotai";
import {
	editPostAtom,
	editPostDialogAtom,
	editPostErrorAtom,
	editPostLoadingAtom,
} from "./postAtoms";

type EditPostProps = {
	children: React.ReactNode;
	post: FeedCardProps;
};

const EditPostChange = ({ post, children }: EditPostProps) => {
	const [isOpen, setIsOpen] = useAtom(editPostDialogAtom);
	const [isLoading, setIsLoading] = useAtom(editPostLoadingAtom);
	const [error, setError] = useAtom(editPostErrorAtom);

	//formData
	const [formData, setFormData] = useAtom(editPostAtom);

	//Function to handle input change
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { value, name } = e.target;

		//Update only set field
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            setError(null); //reset any error

            if(!formData?.postTitle.trim() ){
                throw new Error("Post title is required");
            } 

            if (!formData.textContent.trim() && formData.images.length === 0){
				throw new Error("Please add an image or add text to share");
			}



        } catch (error){

        } finally {

        }
    }



	return <div>EditPost-change</div>;
};

export default EditPostChange;
