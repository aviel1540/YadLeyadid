import { IconButton } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Fragment } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { MdDeleteForever, MdOutlineModeEdit } from "react-icons/md";

export const Rows = ({ row, index, setOpen, open }) => {
	return (
		<Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell align="right">{index}.</TableCell>
				<TableCell align="right">{row.productName}</TableCell>

				<TableCell align="right">{row.place}</TableCell>
				<TableCell align="right">{row.inCategory}</TableCell>
				<TableCell align="right">
					<IconButton
						title="Remove"
						onClick={() =>
							setOpen({
								...open,
								action: true,
								modalDialog: true,
								title: "delete",
								id: row._id
							})
						}
					>
						<MdDeleteForever />
					</IconButton>
					<IconButton
						title="Edit"
						onClick={() =>
							setOpen({
								...open,
								action: true,
								popUp: true,
								title: "edit",
								id: row._id,
								info: row,
							})
						}
					>
						<MdOutlineModeEdit />
					</IconButton>
				</TableCell>
			</TableRow>
		</Fragment>
	);
};
