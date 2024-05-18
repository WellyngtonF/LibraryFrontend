import { useEffect, useState } from "react"
import axios from "axios"
import { Button, Typography } from "@mui/material"

import Layout from "../../Layout"
import {TableComponent as Table, IHeader} from "../../Components/table"

export interface IGenre {
    id: number
    name: string
}

const genresTableHeaders: IHeader[] = [
    {name: 'id', value: 'ID'},
    {name: 'name', value: 'Name'}
]

const Genres = () => {
    const [genres, setGenres] = useState([] as IGenre[])

    const fetchGenres = async () => {
        try {
            const response = await axios.get('http://localhost:8000/genres')
            const data = await response.data
            setGenres(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        document.title = 'Genres - Library'
        fetchGenres()
    }, [])

    return (
        <Layout>
            <Typography variant='h4'>Genres</Typography>
            <Table data={genres} headers={genresTableHeaders} onHover/>
            <Button variant='contained' sx={{mt: 2}} color='primary' onClick={() => window.location.href = '/genres/new'}>Add Genre</Button>
        </Layout>
    )
}

export default Genres