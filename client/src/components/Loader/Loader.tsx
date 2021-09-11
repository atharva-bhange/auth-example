import React from "react";

type Props = React.HTMLProps<HTMLDivElement>;

const Loader: React.FC<Props> = (props) => {
	return (
		<div
			style={{ borderTopColor: "white", borderRadius: "50%" }}
			className={props.className}
			{...props}
		/>
	);
};

export default Loader;
