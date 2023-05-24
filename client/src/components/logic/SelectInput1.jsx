import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const SelectInput1 = ({
    type,
    selectedValue,
    setSelectedValue,
    data,
    isLoading,
}) => {
    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedValue(value);
    };

    return (
        <Box className="!w-2/5 sm:!w-full">
            <FormControl fullWidth>
                <InputLabel
                    id="demo-simple-select-label"
                    sx={{ direction: "rtl" }}
                >
                    {type}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedValue}
                    label={type}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    color="warning"
                >
                    {!isLoading &&
                        data?.map((type) => (
                            <MenuItem key={type?.key} value={type?.code}>
                                {type?.name}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        </Box>
    );
};
