import React from "react";
import { useParams } from "react-router-dom";
import { useProductsForUser, useUserByUsername } from "~/hooks/useUsers";
import { Spinner } from "../ui/Spinner";
import { TextInput } from "~/components/logic/TextInput";
import { Button } from "@mui/material";
import { formatDate } from "~/utils/formatDate";
import { Header } from "../_client/Header";

export const UserDetails = () => {
	const username = useParams().username;


	const {
		data: details,
		isLoading: detailsLoading,
		isFetching,
	} = useUserByUsername(username);
	// console.log("🚀  details:", details);

	// const { data: products, isLoading: productsLoading } = useProductsForUser(
	// 	details?._id
	// );

	if (detailsLoading) return <Spinner />;

	return (
		<>
			<Header />

			<div className="grid justify-between grid-cols-2 w-10/12 mr-52 md:mr-0 sm:w-full gap-1  p-8 mt-10 lg:grid-cols-2 sm:grid-cols-2 sm:gap-5 sm:p-3">
				<TextInput
					info={details?.name}
					originalText={"שם"}
					className={"!ml-5 !mt-5 w-3/5  md:w-full"}
				// ref={codeInputRef}
				/>
				<TextInput
					info={details?.username}
					originalText={"שם משתמש"}
					className={"!ml-5 !mt-5 w-3/5 md:w-full"}
				// ref={codeInputRef}
				/>

				<TextInput
					info={details?.idTeuda}
					originalText={"תעודת זהות"}
					className={"!ml-5 !mt-5 w-3/5 md:w-full"}
				// ref={codeInputRef}
				/>

				<TextInput
					info={details?.email}
					originalText={"אימייל"}
					className={"!ml-5 !mt-5 w-3/5 md:w-full"}
				// ref={codeInputRef}
				/>

				<TextInput
					info={details?.phoneNumber}
					originalText={"מספר פלאפון"}
					className={"!ml-5 !mt-5 w-3/5 md:w-full"}
				// ref={codeInputRef}
				/>
				<TextInput
					info={details?.address}
					originalText={"כתובת"}
					className={"!ml-5 !mt-5 w-3/5 md:w-full"}
				// ref={codeInputRef}
				/>

				<TextInput
					info={details?.paymentType}
					originalText={"אופן תשלום"}
					className={"!ml-5 !mt-5 w-3/5 md:w-full"}
				// ref={codeInputRef}
				/>
				<TextInput
					info={formatDate(details?.createdAt)}
					originalText={"תאריך הצטרפות"}
					className={"!ml-5 !mt-5 w-3/5 md:w-full"}
					readOnly={true}
				// ref={codeInputRef}
				/>



			</div>
			<Button
				size="large"
				type="submit"
				variant="contained"
				className="!bg-green !w-72 !mr-4 !mt-5 !text-base sm:!mr-4 sm:!w-11/12"
			// onClick={submitHandler}
			>
				שמירת שינויים
			</Button>
		</>
	);
};
