import { useField } from "formik";
import React from "react";

type Props = React.HTMLProps<HTMLInputElement> & {
	label: string;
};

const CustomInput = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
	const { label, ...rest } = props;

	const [field, meta] = useField(props.name!);

	const isError = meta.touched && meta.error;

	return (
		<div className="flex flex-col mb-3">
			<label className="text-lg font-semibold text-white" htmlFor={props.name}>
				{label}
			</label>
			<input
				className={`h-10 p-2 text-lg border-2 border-gray-500 border-solid rounded-lg outline-none focus:border-black ${
					isError && "border-red-500"
				}`}
				{...field}
				{...rest}
			/>
			{isError && (
				<div className="text-red-500 transition-transform text text-l ">
					{meta.error}
				</div>
			)}
		</div>
	);
});

export default CustomInput;
