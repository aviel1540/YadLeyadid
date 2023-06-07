import React, { useState } from 'react'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Rows } from './Rows';
import { Spinner } from "~/components/ui/Spinner";
import { useAdministrators } from '~/hooks/useUsers';
import TextField from '@mui/material/TextField';
import { Actions } from '../users/Actions';
import { Button } from '@mui/material';
import { filterData } from '~/utils/filterData';

export const Administrator = () => {
    const { data: administrators, isLoading, refetch } = useAdministrators();

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


    const dataResults = filterData(administrators, inputSearch)

    if (isLoading) return <Spinner />;

    return (
        <>
            <main className={`${open.action && "blur-sm"}`}>
                <div className="flex justify-center mb-5">
                    <h1 className="text-2xl mb-8 underline">
                        מנהלי מערכת
                    </h1>
                </div>

                <section className="relative top-2 w-10/12 block m-auto p-5 xl:w-full xl:relative xl:bottom-4">
                    <div className="flex justify-between flex-row-reverse items-end mb-5">
                        {dataResults.length >= 1 ? <Button
                            className="!bg-green/90 !text-white !rounded-md hover:!bg-green !w-44 !text-sm"
                            onClick={() =>
                                setOpen({
                                    ...open,
                                    popUp: true,
                                    action: true,
                                    title: "add",
                                    content: "הוספת מנהל מערכת חדש"
                                })
                            }
                        >
                            הוספת מנהל מערכת
                        </Button>
                            : <div className="visible" />}
                        <TextField
                            id="outlined-search"
                            variant="standard"
                            type="search"
                            className="w-50"
                            placeholder="שם, תעדות זהות, פלאפון..."
                            helperText="חיפוש מנהל מערכת"
                            onChange={({ target }) => setInputSearch(target.value)}
                            color="warning"
                        />

                    </div>
                    {dataResults?.length >= 1 ? <TableContainer component={Paper} sx={{ height: 600 }}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow className='table-row'>
                                    <TableCell />

                                    <TableCell
                                        className="!font-bold"
                                        align="right"
                                    >
                                        שם
                                    </TableCell>
                                    <TableCell
                                        className="!font-bold"
                                        align="right"
                                    >
                                        שם משתמש
                                    </TableCell>
                                    <TableCell
                                        className="!font-bold"
                                        align="right"
                                    >
                                        תעדות זהות
                                    </TableCell>
                                    <TableCell
                                        className="!font-bold"
                                        align="right"
                                    >
                                        פלאפון
                                    </TableCell>
                                    <TableCell
                                        className="!font-bold"
                                        align="right"
                                    >
                                        כתובת
                                    </TableCell>
                                    <TableCell
                                        className="!font-bold"
                                        align="right"
                                    >
                                        מייל
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