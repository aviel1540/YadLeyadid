export const filterData = (data, text) => {
  return data?.filter(
    (d) =>
      d?.name.toLowerCase()?.includes(text?.toLowerCase()) ||
      d?.entityCard?.includes(text) ||
      d?.phoneNumber?.includes(text)
  );
};
