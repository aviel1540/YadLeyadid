import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

export const MultipleAutocomplete = ({ options, placeholder, label, isLoading, onChange }) => {
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={options}
            disableCloseOnSelect
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            getOptionLabel={(option) => option?.label}
            onChange={onChange}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option?.label}
                </li>
            )}
            disabled={isLoading}
            style={{ width: 500 }}
            renderInput={(params) => (
                <TextField {...params} label={label} placeholder={placeholder} />
            )}
        />
    );
}