import React from "react";
import { useParams } from "react-router-dom";
import { useProductsForUser, useUserByUsername } from "~/hooks/useUsers";
import { Spinner } from "../ui/Spinner";
import { InputText } from "~/components/logic/InputText";
import { Button } from "@mui/material";
import { formatDate } from "~/utils/formatDate";

export const UserDetails = () => {
	const username = useParams().username;

	const {
		data: details,
		isLoading: detailsLoading,
		isFetching,
	} = useUserByUsername(username);
	// console.log("🚀  details:", details);

	const { data: products, isLoading: productsLoading } = useProductsForUser(
		details?._id
	);

	if (productsLoading || detailsLoading) return <Spinner />;

	return (
		<>
			{!isFetching && (
				<>
					<div className="flex justify-center mb-10">
						<span className="text-2xl">
							פרטי משתמש - {details?.name}
						</span>
					</div>
					<div className="flex justify-end">
						<span className="text-xl w-1/5">מוצרים מושאלים</span>
					</div>

					<div className="w-3/5">
						<div className="flex justify-center">
							<span className="text-xl ">פרטים אישיים</span>
						</div>
						<div className="flex justify-center mt-10">
							<InputText
								info={details?.name}
								originalText={"שם"}
								className={"!ml-5 w-35"}
								// ref={codeInputRef}
							/>
							<InputText
								info={details?.username}
								originalText={"שם משתמש"}
								className={"w-35"}
								// ref={codeInputRef}
							/>
						</div>
						<div className="flex justify-center mt-10">
							<InputText
								info={details?.idTeuda}
								originalText={"תעודת זהות"}
								className={"!ml-5 w-35"}
								// ref={codeInputRef}
							/>

							<InputText
								info={details?.email}
								originalText={"אימייל"}
								className={"w-35"}
								// ref={codeInputRef}
							/>
						</div>
						<div className="flex justify-center mt-10">
							<InputText
								info={details?.phoneNumber}
								originalText={"מספר פלאפון"}
								className={"!ml-5 w-35"}
								// ref={codeInputRef}
							/>
							<InputText
								info={details?.address}
								originalText={"כתובת"}
								className={"w-35"}
								// ref={codeInputRef}
							/>
						</div>
						<div className="flex justify-center mt-10">
							<InputText
								info={details?.paymentType}
								originalText={"אופן תשלום"}
								className={"!ml-5 w-35"}
								// ref={codeInputRef}
							/>
							<InputText
								info={formatDate(details?.createdAt)}
								originalText={"תאריך הצטרפות"}
								className={"w-35"}
								readOnly={true}
								// ref={codeInputRef}
							/>
						</div>

						<div className="flex justify-center mt-10">
							<Button
								size="large"
								type="submit"
								variant="contained"
								className="!bg-green !w-1/5 xl:!w-4/5 sm:!w-11/12"
								// onClick={submitHandler}
							>
								שמירת שינויים
							</Button>
						</div>
					</div>
				</>
			)}
		</>
	);
};
