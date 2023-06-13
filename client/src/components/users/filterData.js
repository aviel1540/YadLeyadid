export const filterData = (data, inputSearch) => {
  return data?.filter(
    (d) =>
      d?.name.toLowerCase()?.includes(inputSearch?.toLowerCase()) ||
      d?.entityCard?.includes(inputSearch) ||
      d?.phoneNumber?.includes(inputSearch)
  );
};
