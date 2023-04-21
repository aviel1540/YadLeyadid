import { IconButton } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Fragment } from "react";
import { BsInfoCircle } from "react-icons/bs";

export const Rows = ({ row, index }) => {
	return (
		<Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell align="right">{index}.</TableCell>
				<TableCell align="right">{row.productName}</TableCell>

				<TableCell align="right">{row.place}</TableCell>
				<TableCell align="right">{row.inCategory}</TableCell>
				<TableCell align="right" title="הצגת פרטים">
					<IconButton>
						<BsInfoCircle />
					</IconButton>
				</TableCell>
			</TableRow>
		</Fragment>
	);
};
