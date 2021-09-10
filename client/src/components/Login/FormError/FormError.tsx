import { useField } from "formik";
import React from "react";

type Props = React.HTMLProps<HTMLInputElement> & {
	name: string;
};

const FormError: React.FC<Props> = (props) => {
	const [_, meta] = useField(props.name);

	return (
		<>
			{meta.error && (
				<div className="text-center text-red-500" {...props}>
					{meta.error}
				</div>
			)}
		</>
	);
};

export default FormError;
