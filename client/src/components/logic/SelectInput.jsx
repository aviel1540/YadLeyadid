import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import clsx from "clsx";


export const SelectInput = ({
    type,
    selectedValue,
    setSelectedValue,
    data,
    isLoading,
    className
}) => {

    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedValue(value);
    };

    return (
        <Box className={clsx(className)}>
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
                >
                    <MenuItem value="">
                        <em className="text-gray/70">{type}</em>
                    </MenuItem>
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
