import { useField } from "formik";
import React from "react";

type Props = React.HTMLProps<HTMLInputElement> & {
	name: string;
};

const FormError: React.FC<Props> = (props) => {
	const field = useField(props.name);

	return (
		<>
			{field[1].error && (
				<div className="text-center text-red-500" {...props}>
					{field[1].error}
				</div>
			)}
		</>
	);
};

export default FormError;
