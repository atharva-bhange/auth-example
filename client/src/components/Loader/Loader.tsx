import React from "react";

type Props = React.HTMLProps<HTMLDivElement> & {
	size?: number;
};

const Loader: React.FC<Props> = (props) => {
	const { size = 10 } = props;

	return (
		<div
			style={{ borderTopColor: "white" }}
			className={`w-${size} h-${size}  ease-linear border-4 border-t-4 border-gray-500 rounded-full animate-spin`}
			{...props}
		/>
	);
};

export default Loader;
