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
import { Chip, IconButton, Stack, TextField } from "@mui/material";
import { GrFilter } from "react-icons/gr";

export const Products = () => {
	const [showFilters, setShowFilters] = useState(false);
	const [A, setA] = useState(false);
	console.log("🚀 A:", A);

	const { data, isLoading } = useProducts();
	console.log("🚀 data:", data);

	const dataResults = data.filter((d) => d.place === "מושאל");
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
						className="!cursor-pointer !ml-2"
						onClick={() => setA(!A)}
					/>
					<Chip
						label="קיים במלאי"
						variant="outlined"
						className="!cursor-pointer !ml-2"
					/>
					<Chip
						label="בתיקון"
						variant="outlined"
						className="!cursor-pointer"
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
					<TableContainer component={Paper} sx={{ height: 650 }}>
						<Table aria-label="collapsible table">
							<TableHead>
								<TableRow>
									<TableCell
										className="!font-bold"
										align="right"
									></TableCell>
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
										פרטים נוספים
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.map((row, index) => (
									<Rows
										key={row._id}
										row={row}
										index={index + 1}
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
		</>
	);
};
