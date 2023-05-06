export const formatDate = (inputDate, seperator = "/", isReverse = false) => {
	const date = new Date(inputDate);
	let day = date.getDate().toString();
	if (+day < 10) {
		day = "0" + day;
	}
	let month = (date.getMonth() + 1).toString();
	if (+month < 10) {
		month = "0" + month;
	}
	const year = date.getFullYear();
	let reuslt = `${day}${seperator}${month}${seperator}${year}`;
	if (isReverse) {
		reuslt = reuslt.split(seperator).reverse().join(seperator);
	}
	return reuslt;
};
