import { useUserByUsername } from "~/hooks/useUsers";
import { useAuthStore } from "~/store/auth";
import { Spinner } from "../ui/Spinner";
import { InputText } from "../logic/InputText";
import { formatDate } from "~/utils/formatDate";
import { Button } from "@mui/material";
import { UpdatePassword } from "./UpdatePassword";
import { SystemSettings } from "./SystemSettings";
import { DeleteAccount } from "./DeleteAccount";

export const UpdateDetails = () => {
	const { username } = useAuthStore();

	const {
		data: details,
		isLoading: detailsLoading,
		isFetching,
	} = useUserByUsername(username);

	console.log("details:", details);

	if (detailsLoading) return <Spinner />;

	return (
		<>
			{!isFetching && (
				<>
					<div className="flex justify-center">
						<span className="text-2xl underline decoration-wavy">
							עדכון פרטים
						</span>
					</div>
					<div className="flex justify-around flex-row-reverse mt-10 p-10  shadow-lg shadow-gray  ">
						<div className="mt-14">
							<div className="text-xl flex justify-center">
								<span className="text-lg">עדכון סיסמא</span>
							</div>
							<UpdatePassword />
							{/* <DeleteAccount /> */}
						</div>
						<div className="w-1/2 mt-5 p-10">
							<div className="flex justify-center">
								<span className="text-lg">
									עדכון פרטים אישיים
								</span>
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
								info={details?.phoneNumber}
								originalText={"מספר פלאפון"}
								className={"!ml-5 !mt-5 w-35"}
								// ref={codeInputRef}
							/>

							<InputText
								info={details?.email}
								originalText={"מייל"}
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
						<SystemSettings />
					</div>
				</>
			)}
		</>
	);
};
