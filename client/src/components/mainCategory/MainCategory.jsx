import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from 'react';
import { useMainCategory } from '~/hooks/useMainCategory';
import { useOpen } from '~/hooks/useOpen';
import { Button } from '../logic';
import { SearchInput } from '../logic/SearchInput';
import { Spinner } from '../ui';
import { Actions } from './Actions';
import { Rows } from './Rows';

export const MainCategory = () => {
    const [text, setText] = useState("");

    const [open, setOpen] = useOpen();
    const { data: mainCategory, isLoading, refetch } = useMainCategory();

    const dataResults = mainCategory?.filter((data) => data.mainCategoryName.includes(text));

    if (isLoading) return <Spinner className='mt-32' />;

    return (
        <>
            <main className={`${open.action && "blur-sm"}`}>
                <div className="flex justify-center mb-5">
                    <h1 className="text-2xl mb-8 underline">
                        קטגוריה ראשית
                    </h1>
                </div>

                <section className="table-style xl:w-full xl:relative xl:bottom-4 md:w-full">
                    <div className="flex justify-between flex-row-reverse items-end mb-5">

                        <Button
                            className="button-add w-56"
                            onClick={() =>
                                setOpen({
                                    ...open,
                                    popUp: true,
                                    action: true,
                                    title: "add",
                                    content: "הוספת קטגוריה ראשית חדשה"
                                })
                            }
                        >
                            הוספת קטגוריה ראשית חדשה
                        </Button>
                        <div className="visible" />

                        <SearchInput
                            placeholder="שם..."
                            helperText="חיפוש קטגוריה ראשית"
                            setText={setText}
                        />
                    </div>
                    {dataResults?.length ? <TableContainer component={Paper} sx={{ height: 750 }}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow className="table-row">
                                    <TableCell />
                                    <TableCell />
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
        </>
    )
}
