import React from "react";
import { useUsers } from "~/hooks/useUsers";
import { Spinner } from "../ui/Spinner";
import { GrMail } from "react-icons/gr";
import { MdLocationOn, MdPayment } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export const Users = () => {
	const { data: users, isLoading } = useUsers();

	const navigate = useNavigate();

	if (isLoading) return <Spinner />;

	const userDetails = (username) => {
		navigate(`details/${username}`);
	};

	return (
		<div className="grid grid-cols-4 gap-2 p-8 justify-between mt-10 lg:flex lg:flex-col">
			{users.map((user) => (
				<div
					className="max-w-sm p-6 m-3 w-4/5 text-center cursor-pointer shadow-lg shadow-slate-900/30 bg-white border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700 lg:w-11/12"
					key={user._id}
					onClick={() => userDetails(user.username)}
				>
					<span className="text-2xl font-semibold text-gray-800">
						{user.name}
					</span>
					<div>
						<span className="text-sm font-semibold text-gray-800">
							{user.idTeuda}
						</span>
					</div>
					<div className="flex items-center mt-4 text-gray-700">
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
					<div className="flex items-center mt-4 text-gray-700">
						<MdLocationOn />
						<a
							href={`http://maps.google.com/?q=${user.address}`}
							target="_blank"
						>
							<span className="px-2 text-sm">{user.address}</span>
						</a>
					</div>
					<div className="flex items-center mt-4 text-gray-700 cursor-pointer">
						<GrMail />
						<a href={`mailto:${user.email}`}>
							<span className="px-2 text-sm">{user.email}</span>
						</a>
					</div>
					<div className="flex items-center mt-4 text-gray-700">
						<MdPayment />
						<span className="px-2 text-sm">{user.paymentType}</span>
					</div>
				</div>
			))}
		</div>
	);
};
