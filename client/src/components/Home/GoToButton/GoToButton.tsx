import React from "react";

type Props = React.ComponentPropsWithoutRef<"div"> & {
	path: string;
};

const GoToButton: React.FC<Props> = (props) => {
	const { path } = props;

	return (
		<div
			className="px-4 py-2 mx-6 my-2 text-white transition transform bg-gray-800 cursor-pointer rounded-xl hover:scale-105 md:text-2xl md:flex-grow hover:bg-gray-900"
			{...props}
		>
			Go to <span className="text-yellow-400">{path}</span>
		</div>
	);
};

export default GoToButton;
