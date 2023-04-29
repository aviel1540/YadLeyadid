import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { BsTelephoneFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { MdLocationOn, MdPayment } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useUsers } from "~/hooks/useUsers";
import { Spinner } from "../../ui/Spinner";
import { useState } from "react";
import { UsersTable } from "../table/UsersTable";
import { Actions } from "../Actions";

export const Users = () => {
	const [inputSearch, setInputSearch] = useState("");
	const [changeShow, setChangeShow] = useState(false);
	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
	});

	const { data: users, isLoading, refetch } = useUsers();

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
	// const handleChange = (e) => {
	// 	setChangeShow(e.target.checked);
	// };

	if (isLoading) return <Spinner />;

	return (
		<>
			{changeShow ? (
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
							onChange={({ target }) =>
								setInputSearch(target.value)
							}
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
							label="הצג בטבלה"
						/>
					</div>

					<div className="grid justify-items-end ml-16">
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
					{dataResults?.length > 0 ? (
						<div className="grid grid-cols-4 gap-2 p-8 justify-between mt-10 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1">
							{dataResults.map((user) => (
								<div
									className="max-w-sm p-6 m-3 w-4/5 text-center shadow-lg shadow-gray bg-white border border-gray rounded-lg hover:shadow-gray-dark lg:w-11/12"
									key={user._id}
								>
									<span className="text-2xl font-semibold text-gray-800">
										{user.name}
									</span>
									<div>
										<span className="text-sm font-semibold text-gray-dark">
											{user.idTeuda}
										</span>
									</div>
									<div className="flex items-center mt-4 text-gray-700 w-2/5">
										<a
											href={`https://api.whatsapp.com/send/?phone=972${user.phoneNumber}&text=שלום ${user.name},&type=phone_number&app_absent=0`}
											target="_blank"
										>
											<BsTelephoneFill title="שליחת הודעה" />
										</a>
										<span className="px-2 text-sm">
											{user.phoneNumber}
										</span>
									</div>
									<div className="flex items-center mt-4 text-gray-700 w-2/3">
										<a
											href={`http://maps.google.com/?q=${user.address}`}
											target="_blank"
										>
											<MdLocationOn title="הצג במפה" />
										</a>
										<span className="px-2 text-sm">
											{user.address}
										</span>
									</div>
									<div className="flex items-center mt-4 text-gray-700 w-2/3">
										<a href={`mailto:${user.email}`}>
											<GrMail title="שליחת מייל" />
										</a>
										<span className="px-2 text-sm">
											{user.email}
										</span>
									</div>
									<div className="flex items-center mt-4 text-gray-700 w-3/5">
										<MdPayment />
										<span className="px-2 text-sm">
											{user.paymentType}
										</span>
									</div>
									<div className="p-2 mt-5">
										<Button
											size="large"
											type="submit"
											variant="contained"
											className="!bg-orange !w-3/5 xl:!w-4/5 sm:!w-11/12"
											onClick={() =>
												userDetails(user.username)
											}
										>
											פרטים נוספים
										</Button>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="flex justify-center mt-8">
							<span className="text-red text-xl">
								לא נמצאו תוצאות.
							</span>
						</div>
					)}
				</>
			) : (
				<UsersTable
					setChangeShow={setChangeShow}
					changeShow={changeShow}
				/>
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
