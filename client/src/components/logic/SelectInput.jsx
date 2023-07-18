import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { cn } from "~/lib";

export const SelectInput = (props) => {
    const { type, selectedValue, setSelectedValue, data, isLoading, className } = props;

    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedValue(value);
    };

    return (
        <Box className={cn(className)}>
            <FormControl fullWidth >
                <InputLabel
                    id="demo-simple-select-label"
                    sx={{ direction: "rtl" }}
                    className="!text-gray/70"
                >
                    {type}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedValue}
                    label={type}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                >
                    <MenuItem value={0}>
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
