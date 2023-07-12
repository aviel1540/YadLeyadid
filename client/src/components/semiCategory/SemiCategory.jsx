import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from 'react';
import { TextField } from '@mui/material';
import { useSemiCategory } from '~/hooks/useSemiCategory';
import { Button } from '../logic';
import { Spinner } from '../ui';
import { Actions } from './Actions';
import { Rows } from './Rows';

export const SemiCategory = () => {
    const [inputSearch, setInputSearch] = useState("");

    const [open, setOpen] = useState({
        action: false,
        popUp: false,
        modalDialog: false,
        title: "",
        content: "",
        id: "",
        info: {},
    });
    console.log("🚀 open:", open)

    const { data: semiCategory, isLoading, refetch } = useSemiCategory();

    const dataResults = semiCategory?.filter((data) => data.semiCategoryName.includes(inputSearch));


    if (isLoading) return <Spinner />;

    return (
        <>
            <main className={`${open.action && "blur-sm"}`}>
                <div className="flex justify-center mb-5">
                    <h1 className="text-2xl mb-8 underline">
                        קטגוריה משנית
                    </h1>
                </div>

                <section className="table-style xl:w-full xl:relative xl:bottom-4 md:w-full">
                    <div className="flex justify-between flex-row-reverse items-end mb-5">
                        {dataResults.length >= 1 ?
                            <Button
                                title="הוספת קטגוריה משנית חדשה"
                                className="button-add w-56"
                                onClick={() =>
                                    setOpen({
                                        ...open,
                                        popUp: true,
                                        action: true,
                                        title: "add",
                                        content: "הוספת קטגוריה משנית חדשה"
                                    })
                                }
                            />


                            : <div className="visible" />}
                        <TextField
                            id="outlined-search"
                            variant="standard"
                            type="search"
                            className="w-50"
                            placeholder="שם..."
                            helperText="חיפוש משנית ראשית"
                            onChange={({ target }) => setInputSearch(target.value)}
                            color="warning"
                        />

                    </div>
                    {dataResults.length >= 1 ? <TableContainer component={Paper} sx={{ height: 900 }}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow className="table-row">
                                    <TableCell />
                                    <TableCell />
                                    <TableCell
                                        className="!font-bold"
                                        align="right"
                                    >
                                        מספר סידורי
                                    </TableCell>
                                    <TableCell
                                        className="!font-bold"
                                        align="right"
                                    >
                                        שם
                                    </TableCell>
                                    <TableCell
                                        className="!font-bold"
                                        align="center"
                                    >
                                        פעולות
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataResults?.map((row, index) => (
                                    <Rows
                                        key={row._id}
                                        row={row}
                                        index={index + 1}
                                        open={open}
                                        setOpen={setOpen}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                        :
                        <div className="flex justify-center mt-24">
                            <span className="text-red text-lg">
                                לא נמצאו תוצאות.
                            </span>
                        </div>
                    }
                </section>
            </main>
            {
                open.action && (
                    <Actions
                        open={open}
                        setOpen={setOpen}
                        refetch={refetch}
                    />
                )
            }
        </ >
    )
}
