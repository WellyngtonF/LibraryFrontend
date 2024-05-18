import React, { useEffect, useState } from "react"
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { Typography } from "@mui/material"

interface items {
    id: number
    label: string,
    order?: number
}

interface TransferListProps {
    rightData: items[]
    leftData: items[]
    onChange: (e: any) => void
    order?: boolean
}

function not(a: readonly items[], b: readonly items[]) {
    return a.filter((value) => b.indexOf(value) === -1)
}

const TransferList = (props: TransferListProps) => {
    const { rightData, leftData, onChange, order } = props
    const [checked, setChecked] = useState<items[]>([])
    const [left, setLeft] = useState<items[]>([])
    const [right, setRight] = useState<items[]>([])

    const intersection = (a: items[], b: items[]) => {
        return a.filter((value) => b.indexOf(value) !== -1)
    }

    const leftChecked = intersection(checked, left)
    const rightChecked = intersection(checked, right)

    const handleToggle = (value: items) => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]
    
        if (currentIndex === -1) {
          newChecked.push(value)
        } else {
          newChecked.splice(currentIndex, 1)
        }
    
        setChecked(newChecked)
    }

    useEffect(() => 
    {
        setLeft(leftData)
        // add value to right state adding order number based on the order of array
        setRight(rightData.map((item, index) => ({ ...item, order: index })))
    }, [leftData, rightData])

    const customList = (items: readonly items[], label: string) => (
            <Paper elevation={0} sx={{ overflow: 'auto', height: '100%' }}>
                <Typography variant="h6" align="center">{label}</Typography>
                <List dense component="div" role="list" sx={{ width: '100%'}}>
                    {items.map((item: items) => {
                        const labelId = `transfer-list-item-${item.id}-label`
                        const isChecked = checked.indexOf(item) !== -1
                        return (
                            <ListItemButton key={item.id} role="listitem" onClick={handleToggle(item)}>
                                <ListItemIcon>
                                    <Checkbox
                                        checked={isChecked}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={item.label} />
                            </ListItemButton>
                        )
                    })}
                    <ListItemButton />
                </List>
            </Paper>
    )

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked))
        setLeft(not(left, leftChecked))
        setChecked(not(checked, leftChecked))
        onChange(right.concat(leftChecked))
    }

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked))
        setRight(not(right, rightChecked))
        setChecked(not(checked, rightChecked))
        onChange(not(right, rightChecked))
    }

    const handleUpButton = () => {
        const newRight = [...right]
        const updatedChecked = [...rightChecked]
        updatedChecked.sort((a, b) => a.order! - b.order!)
        updatedChecked.forEach((item) => {
            const currentIndex = newRight.findIndex((rightItem) => rightItem.id === item.id)
            if (currentIndex > 0) {
                const temp = newRight[currentIndex - 1].order
                newRight[currentIndex - 1].order = item.order
                newRight[currentIndex].order = temp
            }
        })
        newRight.sort((a, b) => a.order! - b.order!)
        setRight(newRight)
        setChecked(not(checked, updatedChecked))
        onChange(newRight)
    }

    const handleDownButton = () => {
        const newRight = [...right]
        const updatedChecked = [...rightChecked]
        updatedChecked.sort((a, b) => a.order! - b.order!)
        updatedChecked.reverse().forEach((item) => {
            const currentIndex = newRight.findIndex((rightItem) => rightItem.id === item.id)
            if (currentIndex < newRight.length - 1) {
                const temp = newRight[currentIndex + 1].order
                newRight[currentIndex + 1].order = item.order
                newRight[currentIndex].order = temp
            }
        })
        newRight.sort((a, b) => a.order! - b.order!)
        setRight(newRight)
        onChange(newRight)
    }

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" >
            <Grid item xs={12} md={5}>
                <Paper elevation={1} sx={{ display: 'flex', flexDirection: 'column', height: '300px' }}>
                    {customList(left, 'Disponíveis')}
                </Paper>
            </Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button 
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={left.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={right.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12} md={5}>
                <Paper elevation={1} sx={{ display: 'flex', flexDirection: 'column', height: '300px' }}>
                    {customList(right, 'Selecionados')}
                </Paper>
            </Grid>
            { order ?
                <Grid item>
                {/* Buttons to change the order of the items in right list */}
                <Grid container direction="column" alignItems="center">
                    <Button 
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleUpButton}
                        disabled={right.length === 0}
                        aria-label="move selected right"
                    >
                        &uarr;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleDownButton}
                        disabled={right.length === 0}
                        aria-label="move selected left"
                    >
                        &darr;
                    </Button>
                </Grid>
            </Grid>
            : null}
        </Grid>
    )
}

export default TransferList