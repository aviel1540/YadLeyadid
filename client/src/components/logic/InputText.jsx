import { IconButton, InputAdornment, TextField } from "@mui/material";
import { forwardRef, useState } from "react";
import clsx from "clsx";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export const InputText = forwardRef((props, ref) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<TextField
			className={clsx(props.className)}
			autoComplete="false"
			defaultValue={props?.info && props?.info}
			placeholder={props.placeholder && props.placeholder}
			inputProps={{
				min: 0,
				style: { textAlign: props.placeholder ? "right" : "center" },
			}}
			helperText={props?.originalText}
			inputRef={ref}
			type={
				props.password ? (showPassword ? "text" : "password") : "text"
			}
			color="warning"
			required
			label={props.readOnly && "לא ניתן לעריכה"}
			variant="outlined"
			InputProps={{
				readOnly: props.readOnly,

				endAdornment: props.password && (
					<InputAdornment position="end">
						<IconButton
							onClick={() => setShowPassword(!showPassword)}
							edge="end"
						>
							{showPassword ? (
								<AiFillEye />
							) : (
								<AiFillEyeInvisible />
							)}
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
});
