import React from "react";
import { useParams } from "react-router-dom";
import { useUserByUsername } from "~/hooks/useUsers";
import { Spinner } from "../ui/Spinner";

export const UserDetails = () => {
	const username = useParams().username;

	const { data: details, isLoading } = useUserByUsername(username);

	if (isLoading) return <Spinner />;

	return <div>rrrrr</div>;
};
