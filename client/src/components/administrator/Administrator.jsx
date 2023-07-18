import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from 'react';
import { Spinner } from "~/components/ui";
import { useOpen } from "~/hooks/useOpen";
import { useAdministrators } from '~/hooks/useUsers';
import { Button } from "../logic";
import { SearchInput } from "../logic/SearchInput";
import { Actions } from '../users/Actions';
import { filterData } from '../users/config';
import { Rows } from './Rows';

export const Administrator = () => {
    const [text, setText] = useState("");

    const [open, setOpen] = useOpen();
    const { data: administrators, isLoading, refetch } = useAdministrators();

    const dataResults = filterData(administrators, text)

    if (isLoading) return <Spinner className='mt-32' size={150} />;

    return (
        <>
            <main className={`${open.action && "blur-sm"}`}>
                <div className="flex justify-center mb-5">
                    <h1 className="text-2xl mb-8 underline">
                        מנהלי מערכת
                    </h1>
                </div>

                <section className="table-style xl:w-full xl:relative xl:bottom-4 md:w-full">
                    <div className="flex justify-between flex-row-reverse items-end mb-5">
                        {dataResults.length >= 1 ?
                            <Button
                                className="button-add w-52"
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
                                הוספת מנהל מערכת חדש
                            </Button>
                            : <div className="visible" />}

                        <SearchInput
                            placeholder="שם, תעדות זהות, פלאפון..."
                            helperText="חיפוש מנהל מערכת"
                            setText={setText}
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
