import { Home, TitleTab } from "~/components";

export const HomePage = () => {
	return (
		<>
			<TitleTab title="בית" key='home' />
			<Home />
		</>
	);
};
