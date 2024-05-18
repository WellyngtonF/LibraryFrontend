import { useState, useEffect } from "react"
import { Button, Typography } from "@mui/material"
import axios from 'axios'

import Layout from "../../Layout"
import {TableComponent as Table, IHeader} from "../../Components/table"

export interface IPublisher {
    id: number
    name: string
}

const publishersTableHeaders: IHeader[] = [
    {name: 'id', value: 'ID'},
    {name: 'name', value: 'Name'}
]

const Publishers = () => {
    const [publishers, setPublishers] = useState([] as IPublisher[])

    const fetchPublishers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/publishers')
            const data = await response.data
            setPublishers(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        document.title = 'Publishers - Library'
        fetchPublishers()
    }, [])
    
    return (
        <Layout>
            <Typography variant='h4'>Publishers</Typography>
            <Table data={publishers} headers={publishersTableHeaders} onHover />
            <Button variant='contained' sx={{mt: 2}} color='primary' onClick={
                () => window.location.href = '/publishers/new'
            }>Add Publisher</Button>
        </Layout>
    )
}

export default Publishers;