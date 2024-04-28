import { Paper, Table, TableContainer, TableRow, TableCell, TableBody, TableHead } from '@mui/material'
import React from 'react'

interface ITableProps {
    data : any[]
    headers : string[]
    onHover?: boolean
    handleClick?: (data: any) => void
}

const TableComponent = (TableProps: ITableProps) => {
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
                            <TableCell sx={{color: 'white'}} key={index}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index} hover={onHover} onClick={() => handleClick && handleClick(row)}>
                            {Object.values(row).map((value, index) => (
                                <TableCell sx={{color: 'white'}} key={index}>{value as React.ReactNode}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableComponent