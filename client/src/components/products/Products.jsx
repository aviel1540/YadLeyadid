import React, { useState } from "react";
import { useProducts } from "~/hooks/useProducts";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Rows } from "./Rows";
import { Button, Chip, IconButton, Stack, TextField } from "@mui/material";
import { GrFilter } from "react-icons/gr";
import { Spinner } from "../ui/Spinner";
import { Actions } from "./Actions";

export const Products = () => {
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

	const { data: products, isLoading, refetch } = useProducts();


	const dataResults = products?.filter(
		(product) =>
			product?.productName.toLowerCase()?.includes(inputSearch?.toLowerCase()) ||
			product.inCategory?.includes(inputSearch) ||
			product?.place?.includes(inputSearch)
	);

	if (isLoading) return <Spinner />;

	return (
		<>
			<main className={`${open.action && "blur-sm"}`}>
				<div className="flex justify-center">
					<h1 className="text-2xl mb-8 underline">מוצרים</h1>
				</div>
				<section className="relative top-2 w-10/12 block m-auto p-5 xl:w-full xl:relative xl:bottom-4">
					<div className="flex justify-between flex-row-reverse items-end mb-5">
						{dataResults.length >= 1 ?
							<Button
								className="!bg-green !text-white hover:!bg-green/80 !w-44 !text-sm"
								onClick={() =>
									setOpen({
										...open,
										popUp: true,
										action: true,
										title: "add",
										content: "הוספת מוצר חדש"
									})
								}
							>

								הוספת מוצר
							</Button>
							: <div className="visible" />}
						<TextField
							id="outlined-search"
							variant="standard"
							type="search"
							className="w-50"
							placeholder="שם, סטטוס, קטגוריה..."
							helperText="חיפוש מוצר"
							onChange={({ target }) => setInputSearch(target.value)}
							color="warning"
						/>
					</div>
					{dataResults.length >= 1 ? <TableContainer component={Paper} sx={{ height: 750 }}>
						<Table aria-label="collapsible table">
							<TableHead>
								<TableRow>
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
										משוייך לקטגוריה
									</TableCell>
									<TableCell
										className="!font-bold"
										align="right"
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
