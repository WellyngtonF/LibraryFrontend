import { useEffect, useState } from "react"
import axios from "axios"
import { Button, Typography } from "@mui/material"

import Layout from "../../Layout"
import { TableComponent as Table, IHeader} from "../../Components/table"

interface IBook {
    id: number
    title: string
    author: string
    publisher: string
    genre: string
    data_published: string
    data_acquired: string
    isRead: boolean
    pages: number
}

const booksTableHeaders: IHeader[] = [
    {name: 'id', value: 'ID'},
    {name: 'title', value: 'Title'},
    {name: 'author', value: 'Author'},
    {name: 'publisher', value: 'Publisher'},
    // {name: 'genre', value: 'Genre'},
    {name: 'data_published', value: 'Published'},
    {name: 'data_acquired', value: 'Acquired'},
    {name: 'isRead', value: 'Read'},
    // {name: 'pages', value: 'Pages'}
]

const Books = () => {
    const [books, setBooks] = useState([] as IBook[])

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8000/books')
            const data = await response.data
            setBooks(data)
        } catch (error) {
            console.error(error)
        }
    }

    const handleClick = (data: IBook) => {
        window.location.href = `/books/${data.id}`
    }

    useEffect(() => {
        document.title = 'Books - Library'
        fetchBooks()
    }, [])

    return (
        <Layout>
            <Typography variant='h4'>Books</Typography>
            <Table data={books} headers={booksTableHeaders} onHover handleClick={handleClick}/>
            <Button variant='contained' sx={{mt: 2}} color='primary' onClick={
                () => window.location.href = '/books/new'
            }>Add Book</Button>
        </Layout>
    )
}

export default Books