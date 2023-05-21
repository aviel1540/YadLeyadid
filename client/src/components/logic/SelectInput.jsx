import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { PaymentTypes } from "~/constants/PaymentTypes";
import clsx from "clsx";

export const SelectInput = ({
    type,
    selectedValue,
    setSelectedValue,
    className
}) => {
    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedValue(value);
    };

    return (
        <Box className={clsx(className)}>
            <FormControl fullWidth>
                <Select
                    value={selectedValue}
                    onChange={handleChange}
                    required
                    displayEmpty
                    color="warning"
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value="">
                        <em className="text-gray/70">{type}</em>
                    </MenuItem>
                    <MenuItem value={PaymentTypes.CHEQUE}>צ'ק</MenuItem>
                    <MenuItem value={PaymentTypes.CREDITCARD}>כרטיס אשראי</MenuItem>
                </Select>
                <FormHelperText>{type}</FormHelperText>
            </FormControl>
        </Box>
    );
};
