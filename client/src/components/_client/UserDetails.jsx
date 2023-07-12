import { useParams } from "react-router-dom";
import { useUserByUsername } from "~/hooks/useUsers";
import { formatDate } from "~/lib";
import { Input } from "../logic";
import { Spinner } from "../ui";
import { Header } from "./Header";

export const UserDetails = () => {
	const username = useParams().username;

	const { data: details, isLoading, } = useUserByUsername(username);

	if (isLoading) return <Spinner />;

	return (
		<>
			<Header />
			<section className="grid justify-between grid-cols-2 gap-2 p-8 mt-10 lg:grid-cols-2 lg:gap-5 md:mr-0 sm:w-full sm:grid-cols-1 sm:gap-3 sm:p-3">
				<label htmlFor="name" className="block text-sm font-semibold mt-1">שם:
					<Input type="text" id="name" placeholder="שם" readOnly className='w-[50%] md:w-[70%]' value={details?.name} />
				</label>

				<label htmlFor="username" className="block text-sm font-semibold mt-1">שם משתמש:
					<Input type="text" id="username" placeholder="שם משתמש" readOnly className='w-[50%] md:w-[70%]' value={details?.username} />
				</label>

				<label htmlFor="entityCard" className="block text-sm font-semibold mt-1">תעודת זהות:
					<Input type="text" id="entityCard" placeholder="תעודת זהות" readOnly className='w-[50%] md:w-[70%]' value={details?.entityCard} />
				</label>

				<label htmlFor="phoneNumber" className="block text-sm font-semibold mt-1">מספר פלאפון:
					<Input type="text" id="phoneNumber" placeholder="מספר פלאפון" readOnly className='w-[50%] md:w-[70%]' value={details?.phoneNumber} />
				</label>

				<label htmlFor="email" className="block text-sm font-semibold mt-1">מייל:
					<Input type="text" id="email" placeholder="מייל" readOnly className='w-[50%] md:w-[70%]' value={details?.email} />
				</label>


				<label htmlFor="address" className="block text-sm font-semibold mt-1">כתובת:
					<Input type="text" id="address" placeholder="כתובת" readOnly className='w-[50%] md:w-[70%]' value={details?.address} />
				</label>

				<label htmlFor="paymentType" className="block text-sm font-semibold mt-1">אופן תשלום:
					<Input type="text" id="paymentType" placeholder="אופן תשלום" readOnly className='w-[50%] md:w-[70%]' value={details?.paymentType} />
				</label>

				<label htmlFor="createdAt" className="block text-sm font-semibold mt-1">תאריך הצטרפות:
					<Input type="text" id="createdAt" placeholder="תאריך הצטרפות" readOnly className='w-[50%] md:w-[70%]' value={formatDate(details?.createdAt)} />
				</label>

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
