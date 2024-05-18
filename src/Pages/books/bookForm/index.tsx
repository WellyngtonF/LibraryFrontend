import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Button, Grid, Paper, FormControl, TextField, FormLabel,
    //  Select, 
    MenuItem } from '@mui/material'

import Layout from '../../../Layout'
import Select from '../../../Components/inputComponents/select'
import { IAuthor } from '../../authors/index'
import { IPublisher } from '../../publishers/index'
import { IGenre } from '../../genres/index'
import TransferList from '../../../Components/inputComponents/transferList'

interface IBook {
    title: string
    author_id: number
    publisher_id: number
    genre: number[]
    data_published: string
    data_acquired?: string
    is_read?: boolean
    pages?: number
}

const defaultBook: IBook = {
    title: '',
    author_id: 0,
    publisher_id: 0,
    genre: [],
    data_published: '',
    data_acquired: '',
    is_read: false,
    pages: 0
}

const BookForm = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState(defaultBook);
    
    const [authors, setAuthors] = useState<IAuthor[]>([]);
    const transformedAuthors = authors.map(author => ({ label: author.name, value: author.id }));
    
    const [publishers, setPublishers] = useState<IPublisher[]>([]);
    const transformedPublishers = publishers.map(publisher => ({ label: publisher.name, value: publisher.id }));

    const [genres, setGenres] = useState<IGenre[]>([]);
    const genresLeft = genres.filter(genre => !book.genre.includes(genre.id)).map(genre => ({ id: genre.id, label: genre.name }));
    const genresRight = genres.filter(genre => book.genre.includes(genre.id)).map(genre => ({ id: genre.id, label: genre.name }));
    const isEdit = id != 'new';

    const fetchBookData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/books/${id}`);
            const data = response.data;
            setBook(data);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchDefaultData = async () => {
        try {
            const authorsResponse = await axios.get('http://localhost:8000/authors');
            const publishersResponse = await axios.get('http://localhost:8000/publishers');
            const genresResponse = await axios.get('http://localhost:8000/genres');

            setAuthors(authorsResponse.data);
            setPublishers(publishersResponse.data);
            setGenres(genresResponse.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = () => {
        if (isEdit)
        {
            axios.put(`http://localhost:8000/books/${id}`, book)
            .then(() => {
                window.location.href = '/books'
            })
        } else {
            axios.post('http://localhost:8000/authors', book)
            .then(() => {
                window.location.href = '/books'
            })
        }
    }

    useEffect(() => {
        document.title = 'Add Book - Library'
        fetchDefaultData()
        if (isEdit) {
            document.title = 'Edit Book - Library'
            fetchBookData()
        }
    }, [])

    return (
        <Layout>
            <Paper sx={{ backgroundColor: '#161d2f' }}>
                <Grid container>
                    <FormControl sx={{ m: 2 }} fullWidth>
                        <FormLabel sx={{ color: 'white', backgroundColor: '#161d2f' }}>Book</FormLabel>
                        <TextField
                            id='title'
                            variant='outlined'
                            value={book.title}
                            sx={{borderRadius: '4px', overflow: 'hidden', backgroundColor: 'white', mt: 1}}
                            onChange={(e) => setBook({ ...book, title: e.target.value })}
                        />
                    </FormControl>
                    <Grid item container justifyContent='space-between' xs={6}>
                        <FormControl sx={{ marginX: 2 }} fullWidth>
                            <Select options={transformedAuthors} actualValue={book.author_id} label='Author' 
                                onChange={(e) => setBook({ ...book, author_id: Number(e.target.value) })} />
                        </FormControl>
                    </Grid>
                    <Grid item container justifyContent='space-between' xs={6}>
                        <FormControl sx={{ marginX: 2 }} fullWidth>
                            <Select options={transformedPublishers} actualValue={book.publisher_id} label='Publisher' 
                                onChange={(e) => setBook({ ...book, publisher_id: Number(e.target.value) })} />
                        </FormControl>
                    </Grid>
                    <Grid item container justifyContent='space-between' xs={4}>
                        <FormControl sx={{ marginX: 2 }} fullWidth>
                        <FormLabel sx={{ color: 'white', backgroundColor: '#161d2f' }}>Published Date</FormLabel>
                            <TextField
                                id='data_published'
                                type='date'
                                sx={{borderRadius: '4px', overflow: 'hidden', backgroundColor: 'white', mt: 1}}
                                value={book.data_published}
                                onChange={(e) => setBook({ ...book, data_published: e.target.value })}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item container justifyContent='space-between' xs={4}>
                        <FormControl sx={{ marginX: 2 }} fullWidth>
                        <FormLabel sx={{ color: 'white', backgroundColor: '#161d2f' }}>Acquired Date</FormLabel>
                            <TextField
                                id='data_acquired'
                                type='date'
                                sx={{borderRadius: '4px', overflow: 'hidden', backgroundColor: 'white', mt: 1}}
                                value={book.data_acquired}
                                onChange={(e) => setBook({ ...book, data_acquired: e.target.value })}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item container justifyContent='space-between' xs={4}>
                        <FormControl sx={{ marginX: 2 }} fullWidth>
                        <FormLabel sx={{ color: 'white', backgroundColor: '#161d2f' }}>Pages</FormLabel>
                            <TextField
                                id='pages'
                                type='number'
                                sx={{borderRadius: '4px', overflow: 'hidden', backgroundColor: 'white', mt: 1}}
                                value={book.pages}
                                onChange={(e) => setBook({ ...book, pages: Number(e.target.value) })}
                            />
                        </FormControl>
                    </Grid>
                    <FormControl sx={{ m: 2 }} fullWidth>
                        <FormLabel sx={{ color: 'white', backgroundColor: '#161d2f' }}>Genres</FormLabel>
                        <TransferList onChange={(e) => setBook({ ...book, genre: e.map((genre: any) => genre.id)})} 
                            leftData={genresLeft} rightData={genresRight} />
                    </FormControl>
                    <FormControl sx={{ m: 2 }} fullWidth>
                        <Button
                            variant='contained'
                            onClick={handleSubmit}
                        >
                            {isEdit ? 'Edit' : 'Add'}
                        </Button>
                    </FormControl>
                </Grid>
            </Paper>
            <Grid container >
                <Grid item justifyContent='flex-start' xs={6}>
                    <Button variant='contained' sx={{mt: 2}} color='primary' onClick={
                        () => window.location.href = '/books'        
                    }>Back</Button>
                </Grid>
                <Grid item container justifyContent='flex-end' xs={6}>
                    {
                        isEdit ?
                        <Button variant='contained' sx={{mt: 2}} color='warning' onClick={handleSubmit}>Edit</Button> : 
                        <Button variant='contained' sx={{mt: 2}} color='success' onClick={handleSubmit}>Add</Button>
                    }
                </Grid>
            </Grid>
        </Layout>
    )
}

export default BookForm