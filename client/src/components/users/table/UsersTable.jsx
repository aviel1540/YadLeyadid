import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Rows } from "./Rows";
import { Spinner } from "~/components/ui/Spinner";
import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUsers } from "~/hooks/useUsers";
import { Actions } from "../Actions";

export const UsersTable = () => {
	const [inputSearch, setInputSearch] = useState("");

	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
		id: "",
		info: {},
	});

	const { data: users, isLoading, refetch } = useUsers();

	const navigate = useNavigate();

	const dataResults = users?.filter(
		(user) =>
			user?.name.toLowerCase().includes(inputSearch.toLowerCase()) ||
			user.idTeuda.includes(inputSearch) ||
			user?.phoneNumber.includes(inputSearch)
	);

	// const userDetails = (username) => {
	// 	navigate(`details/${username}`);
	// };

	if (isLoading) return <Spinner />;

	return (
		<>
			<div className="flex justify-center mb-5">
				<span className="text-2xl mb-8">
					לקוחות
				</span>
			</div>
			<div className="flex justify-center">
				<TextField
					id="outlined-search"
					variant="standard"
					type="search"
					className="w-50"
					placeholder="שם, תעדות זהות, פלאפון"
					helperText="חיפוש לקוח"
					onChange={({ target }) => setInputSearch(target.value)}
					color="warning"
				/>
			</div>
			{/* <div className="flex justify-start">
				<FormControlLabel
					control={
						<Switch
							checked={changeShow}
							onChange={({ target }) =>
								setChangeShow(target.checked)
							}
							color="secondary"
						/>
					}
					label="הצג בכרטיסיות"
				/>
			</div> */}
			{dataResults?.length > 0 ? (
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
							הוספת לקוח
						</Button>
					</div>
					<TableContainer component={Paper} sx={{ height: 550 }}>
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
										align="right"
									>
										אופן תשלום
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
								{dataResults.map((row, index) => (
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
