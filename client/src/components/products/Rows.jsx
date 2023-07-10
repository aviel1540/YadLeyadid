import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Collapse, IconButton, Table, TableBody, TableHead, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Fragment, useState } from "react";
import { MdDeleteForever, MdOutlineModeEdit } from "react-icons/md";
import { ProductPlace } from "~/constants/productPlace";
import { replace } from "~/utils";

export const Rows = ({ row, index, setOpen, open }) => {
	const [openTable, setOpenTable] = useState(false);

	return (
		<Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>

				<TableCell>
					{row?.userDetails?.length > 0 && <IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpenTable(!openTable)}
					>
						{openTable ? (
							<KeyboardArrowUpIcon />
						) : (
							<KeyboardArrowDownIcon />
						)}
					</IconButton>}
				</TableCell>
				<TableCell align="right">{index}.</TableCell>

				<TableCell align="right">{replace(row.productName)}</TableCell>

				<TableCell align="right" className={`${row.place === ProductPlace.IN_STOCK ? "!text-green" : row.place === ProductPlace.LOANED ? "!text-red" : "!text-purple"}`} >{row.place}</TableCell>
				<TableCell align="right">{row.inCategory}</TableCell>
				<TableCell align="center">
					<IconButton
						title="Edit"
						onClick={() =>
							setOpen({
								...open,
								action: true,
								popUp: true,
								title: "edit",
								content: "עריכת נתונים",
								id: row._id,
								info: row,
							})
						}
					>
						<MdOutlineModeEdit color="#1fb6ff" />
					</IconButton>
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
						<MdDeleteForever color="#E21818" />
					</IconButton>

				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={6}
					className="!bg-gray/5"
				>
					<Collapse in={openTable} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography
								variant="h6"
								gutterBottom
								component="div"
								className="!flex"
							>
								לקוחות -	{row?.userDetails?.length > 0 ? `(${row?.userDetails?.length})` : `(${0})`}
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell className="!font-bold" align="right">שם לקוח</TableCell>
										<TableCell className="!font-bold" align="right">שם משתמש</TableCell>
										<TableCell className="!font-bold" align="right">
											תעודת זהות
										</TableCell>
										<TableCell className="!font-bold" align="right">
											מספר פלאפון
										</TableCell>
										<TableCell className="!font-bold" align="right">
											מייל
										</TableCell>

										<TableCell className="!font-bold" align="right">
											כתובת
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row?.userDetails?.map((details) => (
										<TableRow key={details.entityCard}>
											<TableCell align="right">
												{details.name}
											</TableCell>
											<TableCell align="right">
												{details.username}
											</TableCell>
											<TableCell align="right">
												{details.entityCard}
											</TableCell>
											<TableCell align="right">
												{details.phoneNumber}
											</TableCell>
											<TableCell align="right">
												{details.email}
											</TableCell>
											<TableCell align="right">
												{details.address}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse >
				</TableCell >
			</TableRow >
		</Fragment >
	);
};
