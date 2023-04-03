import { IconButton } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Fragment } from "react";
import { BsInfoCircle } from "react-icons/bs";

export const Rows = ({ row, userDetails }) => {
	return (
		<Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell align="right">{row.name}</TableCell>

				<TableCell align="right">{row.idTeuda}</TableCell>

				<TableCell align="right" title="שליחת הודעה">
					<a
						href={`https://api.whatsapp.com/send/?phone=972${row.phoneNumber}&text=שלום ${row.name},&type=phone_number&app_absent=0`}
						target="_blank"
					>
						{row.phoneNumber}
					</a>
				</TableCell>

				<TableCell align="right" title="צפייה במפה">
					<a
						href={`http://maps.google.com/?q=${row.address}`}
						target="_blank"
					>
						{row.address}
					</a>
				</TableCell>

				<TableCell align="right" title="שליחת מייל">
					<a href={`mailto:${row.email}`}>{row.email}</a>
				</TableCell>

				<TableCell align="right">{row.paymentType}</TableCell>

				<TableCell align="right" title="הצגת פרטים">
					<IconButton onClick={() => userDetails(row.username)}>
						<BsInfoCircle />
					</IconButton>
				</TableCell>
			</TableRow>
		</Fragment>
	);
};
