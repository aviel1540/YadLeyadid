import React from "react";
import { useParams } from "react-router-dom";
import { useProductsForUser, useUserByUsername } from "~/hooks/useUsers";
import { Spinner } from "../ui/Spinner";

export const UserDetails = () => {
	const username = useParams().username;
	const { data: details, isLoading: detailsLoading } = useUserByUsername(username);

	const id = details._id;
	const {data : products, isLoading: productsLoading} = useProductsForUser(id);
	console.log(products);
	
	if (detailsLoading) return <Spinner />;
	return <div>rrrrr</div>;
};
