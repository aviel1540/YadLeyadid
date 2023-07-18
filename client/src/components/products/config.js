export const filterData = (data, text) => {
  return data?.filter(
    (d) =>
      d?.productName.toLowerCase()?.includes(text?.toLowerCase()) ||
      d.inCategory?.includes(text) ||
      d?.place?.includes(text)
  );
};
