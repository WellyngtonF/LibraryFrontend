import { Paper, Table, TableContainer, TableRow, TableCell, TableBody, TableHead } from '@mui/material'

export interface IHeader {
    name: string
    value: string
}

interface ITableProps {
    data : any[]
    headers : IHeader[]
    onHover?: boolean
    handleClick?: (data: any) => void
}

export const TableComponent = (TableProps: ITableProps) => {
    const data = TableProps.data
    const headers = TableProps.headers
    const onHover = TableProps.onHover
    const handleClick = TableProps.handleClick

    return (
        <TableContainer component={Paper} sx={{ backgroundColor: '#161d2f' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableCell sx={{color: 'white'}} key={index}>{header.value}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index} hover={onHover} onClick={() => handleClick && handleClick(row)}>
                            {headers.map((header, index) => (
                                <TableCell sx={{color: 'white'}} key={index}>{row[header.name]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}