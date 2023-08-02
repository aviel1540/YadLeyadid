import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { useOpen } from "~/hooks/useOpen";
import { useAddProduct, useProducts } from "~/hooks/useProducts";
import { Button } from "../logic";
import { SearchInput } from "../logic/SearchInput";
import { Spinner } from "../ui";
import { Actions } from "./Actions";
import { Rows } from "./Rows";
import { filterData } from "./util";

export const Products = () => {
	const [text, setText] = useState("");

	const [open, setOpen] = useOpen();
	const { data: products, isLoading, refetch } = useProducts();

	const { mutate: addProduct } = useAddProduct(setOpen, open, refetch);

	const dataResults = filterData(products, text)

	if (isLoading) return <Spinner className='mt-32' />;

	return (
		<>
			<main className={`${open.action && "blur-sm"}`}>
				<div className="flex justify-center">
					<h1 className="text-2xl mb-8 underline">מוצרים</h1>
				</div>
				<section className="table-style xl:w-full xl:relative xl:bottom-4 md:w-full">
					<div className="flex justify-between flex-row-reverse items-end mb-5">
						<Button
							className="button-add w-44"
							onClick={() =>
								addProduct({ productName: "מוצר חדש" })
							}
						>
							הוספת מוצר חדש
						</Button>
						<div className="visible" />
						{dataResults?.length ? <SearchInput
							placeholder="שם, סטטוס, קטגוריה..."
							helperText="חיפוש מוצר"
							setText={setText}
						/> : null}
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
										align="right"
									>
										סטטוס
									</TableCell>
									<TableCell
										className="!font-bold"
										align="right"
									>
										משוייך לקטגוריה ראשית
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
										key={row?._id}
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
			{open.action && (
				<Actions
					open={open}
					setOpen={setOpen}
					refetch={refetch}
				/>
			)}
		</>
	);
};
