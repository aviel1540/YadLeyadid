import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Rows } from "./Rows";
import { Spinner } from "~/components/ui/Spinner";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUsers } from "~/hooks/useUsers";

export const UsersTable = ({ setChangeShow, changeShow }) => {
	const [inputSearch, setInputSearch] = useState("");

	const { data: users, isLoading} = useUsers();

	const navigate = useNavigate();

	const dataResults = users?.filter(
		(user) =>
			user?.name.toLowerCase().includes(inputSearch.toLowerCase()) ||
			user.idTeuda.includes(inputSearch) ||
			user?.phoneNumber.includes(inputSearch)
	);

	const userDetails = (username) => {
		navigate(`details/${username}`);
	};

	if (isLoading) return <Spinner />;

	return (
		<>
			<div className="flex justify-center mb-5">
				<span className="text-2xl mb-8">
					משתמשים
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
			<div className="flex justify-start">
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
			</div>
			{dataResults?.length > 0 ? (
				<div className="relative top-2 w-10/12 block m-auto p-5 xl:w-full xl:relative xl:bottom-4">
					<TableContainer component={Paper} sx={{ height: 550 }}>
						<Table aria-label="collapsible table">
							<TableHead>
								<TableRow>
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
										פרטים נוספים
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{dataResults.map((row) => (
									<Rows
										key={row._id}
										userDetails={userDetails}
										row={row}
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
