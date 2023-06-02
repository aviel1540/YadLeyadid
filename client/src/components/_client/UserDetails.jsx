import { useParams } from "react-router-dom";
import { TextInput } from "~/components/logic/TextInput";
import { useUserByUsername } from "~/hooks/useUsers";
import { formatDate } from "~/utils/formatDate";
import { Spinner } from "../ui/Spinner";
import { Header } from "./Header";

export const UserDetails = () => {
	const username = useParams().username;

	const { data: details, isLoading, } = useUserByUsername(username);

	if (isLoading) return <Spinner />;

	return (
		<>
			<Header />
			<section className="grid justify-between grid-cols-2 w-10/12 mr-52 md:mr-0 sm:w-full gap-1  p-8 mt-10 lg:grid-cols-2 sm:grid-cols-2 sm:gap-5 sm:p-3">
				<TextInput
					info={details?.name}
					originalText={"שם"}
					className={"!ml-5 !mt-5 w-3/5  md:w-full"}
					readOnly={true}
				/>
				<TextInput
					info={details?.username}
					originalText={"שם משתמש"}
					className={"!ml-5 !mt-5 w-3/5 md:w-full"}
					readOnly={true}
				/>
				<TextInput
					info={details?.entityCard}
					originalText={"תעודת זהות"}
					className={"!ml-5 !mt-5 w-3/5 md:w-full"}
					readOnly={true}
				/>
				<TextInput
					info={details?.phoneNumber}
					originalText={"מספר פלאפון"}
					className={"!ml-5 !mt-5 w-3/5 md:w-full"}
					readOnly={true}
				/>
				<TextInput
					info={details?.email}
					originalText={"מייל"}
					className={"!ml-5 !mt-5 w-3/5 md:w-full"}
					readOnly={true}
				/>
				<TextInput
					info={details?.address}
					originalText={"כתובת"}
					className={"!ml-5 !mt-5 w-3/5 md:w-full"}
					readOnly={true}
				/>
				<TextInput
					info={details?.paymentType}
					originalText={"אופן תשלום"}
					className={"!ml-5 !mt-5 w-3/5 md:w-full"}
					readOnly={true}
				/>
				<TextInput
					info={formatDate(details?.createdAt)}
					originalText={"תאריך הצטרפות"}
					className={"!ml-5 !mt-5 w-3/5 md:w-full"}
					readOnly={true}
				/>
				<div className="mt-10 ml-16 w-full text-lg md:w-[16rem]">
					<label><span className="text-red">*</span>במידה ונמצאה טעות בפרטים, נא להתקשר לחברה.</label>
					<div className="mr-1">
						<label>יד לידיד: 04-3368822.</label>
					</div>
				</div>
			</section>
		</>
	);
};
