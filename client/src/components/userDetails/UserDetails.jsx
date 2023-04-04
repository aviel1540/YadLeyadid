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
						<span className="text-2xl underline decoration-wavy">
							פרטי משתמש - {details?.name}
						</span>
					</div>
					<div className="flex justify-end relative top-16">
						<span className="text-xl w-1/5">מוצרים מושאלים</span>
					</div>

					<div className="w-1/2 p-10">
						<div className="flex justify-center">
							<span className="text-xl ">פרטים אישיים</span>
						</div>
						<InputText
							info={details?.name}
							originalText={"שם"}
							className={"!ml-5 !mt-5 w-35"}
							// ref={codeInputRef}
						/>
						<InputText
							info={details?.username}
							originalText={"שם משתמש"}
							className={"!ml-5 !mt-5 w-35"}
							// ref={codeInputRef}
						/>

						<InputText
							info={details?.idTeuda}
							originalText={"תעודת זהות"}
							className={"!ml-5 !mt-5 w-35"}
							// ref={codeInputRef}
						/>

						<InputText
							info={details?.email}
							originalText={"אימייל"}
							className={"!ml-5 !mt-5 w-35"}
							// ref={codeInputRef}
						/>

						<InputText
							info={details?.phoneNumber}
							originalText={"מספר פלאפון"}
							className={"!ml-5 !mt-5 w-35"}
							// ref={codeInputRef}
						/>
						<InputText
							info={details?.address}
							originalText={"כתובת"}
							className={"!ml-5 !mt-5 w-35"}
							// ref={codeInputRef}
						/>

						<InputText
							info={details?.paymentType}
							originalText={"אופן תשלום"}
							className={"!ml-5 !mt-5 w-35"}
							// ref={codeInputRef}
						/>
						<InputText
							info={formatDate(details?.createdAt)}
							originalText={"תאריך הצטרפות"}
							className={"!ml-5 !mt-5 w-35"}
							readOnly={true}
							// ref={codeInputRef}
						/>

						<div className="flex justify-center mt-10">
							<Button
								size="large"
								type="submit"
								variant="contained"
								className="!bg-green !w-2/6 !text-base sm:!w-4/6"
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
