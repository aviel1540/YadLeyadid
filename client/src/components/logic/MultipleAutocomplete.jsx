import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Spinner } from '../ui/Spinner';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export const MultipleAutocomplete = ({ options, placeholder, label, isLoading, onChange }) => {
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={options}
            disableCloseOnSelect
            getOptionLabel={(option) => option.label}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                        onChange={(_, value) => console.log(value)}
                    />
                    {option.label}
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