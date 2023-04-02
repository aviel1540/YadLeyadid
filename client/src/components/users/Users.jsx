import { Button, TextField } from "@mui/material";
import { BsTelephoneFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { MdLocationOn, MdPayment } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useUsers } from "~/hooks/useUsers";
import { Spinner } from "../ui/Spinner";
import { useState } from "react";

export const Users = () => {
	const [inputSearch, setInputSearch] = useState("");

	const { data: users, isLoading } = useUsers();

	const navigate = useNavigate();

	const dataResults = users?.filter((user) =>
		user.name.toLowerCase().includes(inputSearch.toLowerCase())
	);

	const userDetails = (username) => {
		navigate(`details/${username}`);
	};

	if (isLoading) return <Spinner />;

	return (
		<>
			<div className="flex justify-center">
				<TextField
					id="outlined-search"
					variant="standard"
					type="search"
					className="w-50"
					placeholder={`שם משתמש...`}
					helperText={`חיפוש`}
					onChange={({ target }) => setInputSearch(target.value)}
					color="secondary"
				/>
			</div>
			<div className="grid grid-cols-4 gap-2 p-8 justify-between mt-10 lg:flex lg:flex-col">
				{dataResults.map((user) => (
					<div
						className="max-w-sm p-6 m-3 w-4/5 text-center shadow-lg shadow-gray bg-white border border-gray rounded-lg lg:w-11/12"
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
							<BsTelephoneFill />
							<a
								href={`https://api.whatsapp.com/send/?phone=972${user.phoneNumber}&text=שלום ${user.name},&type=phone_number&app_absent=0`}
								target="_blank"
							>
								<span className="px-2 text-sm">
									{user.phoneNumber}
								</span>
							</a>
						</div>
						<div className="flex items-center mt-4 text-gray-700 w-2/3">
							<MdLocationOn />
							<a
								href={`http://maps.google.com/?q=${user.address}`}
								target="_blank"
							>
								<span className="px-2 text-sm">
									{user.address}
								</span>
							</a>
						</div>
						<div className="flex items-center mt-4 text-gray-700 cursor-pointer w-2/3">
							<GrMail />
							<a href={`mailto:${user.email}`}>
								<span className="px-2 text-sm">
									{user.email}
								</span>
							</a>
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
								onClick={() => userDetails(user.username)}
							>
								הצג עוד פרטים
							</Button>
						</div>
					</div>
				))}
			</div>
		</>
	);
};
