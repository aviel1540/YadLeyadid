import { Box, Collapse, IconButton, Table, TableBody, TableHead, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Fragment, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { formatDate } from "~/utils/formatDate";
import { MdDeleteForever, MdOutlineModeEdit } from "react-icons/md";

export const Rows = ({ row, userDetails, index, setOpen, open }) => {
	const [openTable, setOpenTable] = useState(false);

	return (
		<Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell align="right">{index}.</TableCell>

				<TableCell>
					{row?.userProductList?.length > 0 && <IconButton
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
				<TableCell align="right">{row.name}</TableCell>
				<TableCell align="right">{row.username}</TableCell>

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

				{/* <TableCell align="right" title="הצגת פרטים">
					<IconButton onClick={() => userDetails(row.username)}>
						<BsInfoCircle />
					</IconButton>
				</TableCell> */}
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
			<TableRow>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={6}
					className="!bg-gray/10"
				>
					<Collapse in={openTable} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography
								variant="h6"
								gutterBottom
								component="div"
								className="!flex"
							>
								מוצרים - {row?.userProductList?.length}
								{/* <IconButton
									title="שיוך מחלקה"
									className="!text-green-700 !text-2xl"
									onClick={() =>
										actionRow(
											setOpen,
											open,
											setInfo,
											row,
											"assignCompanieToCoupon"
										)
									}
								>
									<RiAddFill />
								</IconButton> */}
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell className="!font-bold" align="right">
											שם מוצר
										</TableCell>
										<TableCell className="!font-bold" align="right">
											שם קטגוריה
										</TableCell>
										<TableCell className="!font-bold" align="right">
											תאריך השאלה
										</TableCell>
										<TableCell className="!font-bold" align="right">
											תאריך החזרה
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row?.userProductList?.map((details) => (
										<TableRow key={details.loanDate}>
											<TableCell align="right">
												{details.productName}
											</TableCell>
											<TableCell align="right">
												{details.inCategory}
											</TableCell>
											<TableCell align="right">
												{formatDate(details.loanDate)}
											</TableCell>
											<TableCell align="right">
												{formatDate(details.loanReturn)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</Fragment>
	);
};
