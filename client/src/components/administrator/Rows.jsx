import { IconButton } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Fragment } from "react";
import { MdDeleteForever, MdOutlineModeEdit } from "react-icons/md";

export const Rows = ({ row, userDetails, index, setOpen, open }) => {

    return (
        <Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>

                <TableCell align="right">{index}.</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.username}</TableCell>
                <TableCell align="right">{row.entityCard}</TableCell>
                <TableCell align="right">
                    {row.phoneNumber.slice(0, 3)}-{row.phoneNumber.slice(3, 6)}-{row.phoneNumber.slice(6, 10)}
                </TableCell>
                <TableCell align="right" >
                    {row.address}
                </TableCell>
                <TableCell align="right" >
                    {row.email}
                </TableCell>

                <TableCell align="right">
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
                </TableCell>
            </TableRow>
        </Fragment>
    );
};
