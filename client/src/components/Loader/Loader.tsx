import React from "react";

type Props = React.HTMLProps<HTMLDivElement> & {
	size?: number;
};

const Loader: React.FC<Props> = (props) => {
	const { size = 10 } = props;

	return (
		<div
			style={{ borderTopColor: "white", borderRadius: "50%" }}
			className={`ease-linear border-4 border-gray-500  animate-spin w-${size} h-${size}`}
			{...props}
		/>
	);
};

export default Loader;
