import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

export const RadioButtons = ({ title, defaultValue, onChange }) => {
    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">{title}</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                required
                defaultValue={defaultValue}
                onChange={onChange}
            >
                <FormControlLabel value="true" control={<Radio />} label="כן" />
                <FormControlLabel value="false" control={<Radio />} label="לא" />
            </RadioGroup>
        </FormControl>
    )
}
