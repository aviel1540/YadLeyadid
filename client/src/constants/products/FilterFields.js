export const FilterFields = [
	{
		id: "filterCanCreateGuestCoupon",
		name: "קיים במלאי",
		apply(data) {
			return data.filter((d) => d.canCreateGuestCoupon);
		},
	},
	{
		id: "filterActive",
		name: "מושאל",
		apply(data) {
			return data.filter((d) => d.isActive);
		},
	},

	{
		id: "filterCanUseInFreeShift",
		name: "בתיקון",
		apply(data) {
			return data.filter((d) => d.canUseInFreeShift);
		},
	},
];
