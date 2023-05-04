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
	const [showFilters, setShowFilters] = useState(false);
	const [acitveFilters, setAcitveFilters] = useState({
		loaned: false,
		inStock: false,
		repair: false
	});


	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
		id: "",
		info: {},
	});

	const { data, isLoading, refetch } = useProducts();


	// const dataResults = data?.filter((d) => d.place === acitveFilters.inStock);


	if (isLoading) return <Spinner />;

	return (
		<>
			<div className="flex justify-center">
				<span className="text-2xl mb-8">מוצרים</span>
			</div>

			<div className="flex justify-center mb-3">
				<IconButton onClick={() => setShowFilters(!showFilters)}>
					<GrFilter />
				</IconButton>
			</div>

			{showFilters && (
				<div className="flex justify-center">
					<Chip
						label="מושאל"
						variant="outlined"
						className={`!cursor-pointer !ml-2 ${acitveFilters.loaned && "!bg-gray-light"}`}
						onClick={() => setAcitveFilters({ ...acitveFilters, loaned: !acitveFilters.loaned, inStock: false, repair: false })}
					/>
					<Chip
						label="קיים במלאי"
						variant="outlined"
						className={`!cursor-pointer !ml-2 ${acitveFilters.inStock && "!bg-gray-light"}`}
						onClick={() => setAcitveFilters({ ...acitveFilters, inStock: !acitveFilters.inStock, loaned: false, repair: false })}
					/>
					<Chip
						label="בתיקון"
						variant="outlined"
						className={`!cursor-pointer  ${acitveFilters.repair && "!bg-gray-light"}`}
						onClick={() => setAcitveFilters({ ...acitveFilters, repair: !acitveFilters.repair, loaned: false, inStock: false })}
					/>
				</div>
			)}

			<div className="flex justify-center">
				{/* <TextField
					id="outlined-search"
					variant="standard"
					type="search"
					className="w-50"
					placeholder="שם, תעדות זהות, פלאפון"
					helperText="חיפוש לקוח"
					onChange={({ target }) => setInputSearch(target.value)}
					color="warning"
				/> */}
			</div>
			{data?.length > 0 ? (
				<div className="relative top-2 w-10/12 block m-auto p-5 xl:w-full xl:relative xl:bottom-4">
					<div className="grid justify-items-end mb-5">
						<Button
							className={
								"!bg-green !text-white hover:!bg-green/80 !w-44 !text-sm"
							}
							onClick={() =>
								setOpen({
									...open,
									popUp: true,
									action: true,
									title: "add",
								})
							}
						>
							הוספת מוצר
						</Button>
					</div>
					<TableContainer component={Paper} sx={{ height: 650 }}>
						<Table aria-label="collapsible table">
							<TableHead>
								<TableRow>
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
										מושייך לקטגוריה
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
								{data.map((row, index) => (
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
				</div>
			) : (
				<div className="flex justify-center mt-8">
					<span className="text-red text-xl">לא נמצאו תוצאות.</span>
				</div>
			)}
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
