import { TextField } from "@mui/material";
import clsx from "clsx";
import { forwardRef } from "react";

export const TextInput = forwardRef((props, ref) => {

	return (
		<TextField
			className={clsx(props.className)}
			autoComplete="false"
			defaultValue={props?.info}
			inputProps={{
				min: 0,
				style: { textAlign: "center" },
			}}
			helperText={props?.originalText}
			inputRef={ref}
			color="warning"
			required
			label={props.readOnly && "לא ניתן לעריכה"}
			variant="outlined"
		/>
	);
});
