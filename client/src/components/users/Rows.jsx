import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Collapse, IconButton, Table, TableBody, TableHead, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Fragment, useState } from "react";
import { MdDeleteForever, MdOutlineModeEdit, MdRemoveCircleOutline } from "react-icons/md";
import { RiAddFill, RiLockPasswordLine } from "react-icons/ri";
import { PaymentTypes } from "~/constants/PaymentTypes";
import { formatDate, replace } from "~/lib";

export const Rows = ({ row, index, setOpen, open }) => {
	const [openTable, setOpenTable] = useState(false);

	return (
		<Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpenTable(!openTable)}
					>
						{openTable ? (
							<KeyboardArrowUpIcon />
						) : (
							<KeyboardArrowDownIcon />
						)}
					</IconButton>
				</TableCell>

				<TableCell align="right">{index}.</TableCell>
				<TableCell align="right">{row.name}</TableCell>
				<TableCell align="right">{row.username}</TableCell>

				<TableCell align="right">{row.entityCard}</TableCell>

				<TableCell align="right" title="שליחת הודעה">
					<a
						href={`https://api.whatsapp.com/send/?phone=972${row.phoneNumber}&text=שלום ${row.name},&type=phone_number&app_absent=0`}
						target="_blank"
					>
						{row.phoneNumber.slice(0, 3)}-{row.phoneNumber.slice(3, 6)}-{row.phoneNumber.slice(6, 10)}
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

				<TableCell align="right">{formatDate(row.createdAt)}</TableCell>
				<TableCell align="right">{formatDate(row.updatedAt)}</TableCell>
				<TableCell align="right">{row.paymentType !== PaymentTypes.NOTHING ? row.paymentType : "נא לעדכן אופן תשלום"}</TableCell>

				<TableCell align="center">
					<IconButton
						title="עריכת סיסמא"
						onClick={() =>
							setOpen({
								...open,
								action: true,
								popUp: true,
								title: "editPassword",
								content: "עריכת סיסמא",
								id: row._id,
								info: row,
							})
						}
					>
						<RiLockPasswordLine color="#000000" />
					</IconButton>
					<IconButton
						title="עריכה"
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
						title="מחיקה"
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
								מוצרים - {row?.userProductList?.length > 0 ? `(${row?.userProductList?.length})` : `(${0})`}
								<IconButton
									title="שיוך מוצר"
									className="!text-green !text-2xl !-mt-0.5"
									onClick={() =>
										setOpen({
											...open,
											action: true,
											popUp: true,
											title: "asignProductToUser",
											content: "שיוך מוצרים ללקוח",
											id: row._id,
											info: row,
										})
									}
								>
									<RiAddFill />
								</IconButton>
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell className="!font-bold" align="right" />

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
										<TableCell className="!font-bold" align="right">
											הסר שיוך
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row?.userProductList?.map((details, index) => (
										<TableRow key={details.loanDate}>
											<TableCell align="right">
												{index + 1}.
											</TableCell>
											<TableCell align="right">
												{replace(details.productName)}
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
											<TableCell align="right">
												<IconButton
													title="Remove"
													onClick={() =>
														setOpen({
															...open,
															action: true,
															modalDialog: true,
															title: "delete-unassign",
															id: details.id,
															info: row
														})
													}
												>
													<MdRemoveCircleOutline color="#E94944" />
												</IconButton>
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
