import { Box, Collapse, IconButton, Table, TableBody, TableHead, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Fragment, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { formatDate, replace } from "~/utils";
import { MdDeleteForever, MdOutlineModeEdit, MdRemoveCircleOutline } from "react-icons/md";
import { RiAddFill, RiLockPasswordLine } from "react-icons/ri";
import { PaymentTypes } from "~/constants/PaymentTypes";

export const Rows = ({ row, userDetails, index, setOpen, open }) => {
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
                <TableCell align="right">{row.serialNumber}</TableCell>
                <TableCell align="right">{row.semiCategoryName}</TableCell>
                <TableCell align="center">
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
                                מוצרים - {row?.productList?.length > 0 ? `(${row?.productList?.length})` : `(${0})`}
                                <IconButton
                                    title="שיוך מוצר"
                                    className="!text-green !text-2xl !-mt-0.5"
                                    onClick={() =>
                                        setOpen({
                                            ...open,
                                            action: true,
                                            popUp: true,
                                            title: "asignProductToSemiCategory",
                                            content: "שיוך מוצרים לקטגוריה משנית",
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
                                            קטגוריה ראשית
                                        </TableCell>
                                        <TableCell className="!font-bold" align="right">
                                            סטטוס
                                        </TableCell>
                                        <TableCell className="!font-bold" align="right">
                                            הסר שיוך
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row?.productList?.map((details, index) => (
                                        <TableRow key={index}>
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
                                                {details.place}
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
