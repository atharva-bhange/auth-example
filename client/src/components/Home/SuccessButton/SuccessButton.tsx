import React from "react";

type Props = React.ComponentPropsWithoutRef<"div"> & {
	title: string;
};

const SuccessButton: React.FC<Props> = (props) => {
	const { title } = props;

	return (
		<div
			className="flex flex-grow p-4 mx-6 my-2 text-2xl font-semibold text-center text-white transition transform bg-green-600 cursor-pointer rounded-xl md:flex-1 md:mx-10 hover:scale-105 hover:bg-green-500"
			{...props}
		>
			<div className="flex-grow">{title}</div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="w-8 h-8 mr-6"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fillRule="evenodd"
					d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
					clipRule="evenodd"
				/>
			</svg>
		</div>
	);
};

export default SuccessButton;
