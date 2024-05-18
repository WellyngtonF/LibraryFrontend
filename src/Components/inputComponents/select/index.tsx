import { Select, MenuItem, FormLabel } from "@mui/material";

interface SelectData {
    value: number
    label: string
}

interface SelectProps {
    options: SelectData[]
    actualValue: number
    onChange: (e: any) => void
    label: string
}

const SelectInput = (props : SelectProps) => {
    const {label, options, actualValue, onChange} = {...props}
    return (
        // The backgroud color objective its #3B4D7D
        <>
            <FormLabel sx={{ color: 'white', backgroundColor: '#161d2f' }}>{label}</FormLabel>
            <Select id='author_id' value={actualValue} 
                sx={{borderRadius: '4px', overflow: 'hidden', backgroundColor: 'white', mt: 1}}
                onChange={onChange}>
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
            </Select>
        </>
    );
    }

export default SelectInput;