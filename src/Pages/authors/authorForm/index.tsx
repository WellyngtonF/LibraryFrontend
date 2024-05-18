import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Button, Grid, Paper, FormControl, TextField, FormLabel } from '@mui/material'

import Layout from '../../../Layout'

interface IAuthor {
    id: number
    name: string
}

const AuthorForm = () => {
    // get id from url
    const { id } = useParams<{id: string}>()
    const [author, setAuthor] = useState({} as IAuthor)
    const isEdit = id != 'new'

    const fetchAuthorData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/authors/${id}`)
            const data = response.data
            setAuthor(data)
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = () => {
        if (isEdit)
        {
            axios.put(`http://localhost:8000/authors/${id}`, author)
            .then(() => {
                window.location.href = '/authors'
            })
        } else {
            axios.post('http://localhost:8000/authors', author)
            .then(() => {
                window.location.href = '/authors'
            })
        }
    }

    useEffect(() => {
        document.title = 'Add Author - Library'
        if (isEdit)
        {
            document.title = 'Edit Author - Library'
            fetchAuthorData()
        } 
    }, [])

    return (
        <Layout>
            <Paper sx={{ backgroundColor: '#161d2f' }}>
                <Grid container>
                    <FormControl sx={{m: 2}} fullWidth>
                        <FormLabel sx={{color: 'white', backgroundColor: '#161d2f'}} >Author</FormLabel>
                        <TextField 
                            id='name' 
                            value={author.name}
                            sx={{borderRadius: '4px', overflow: 'hidden', backgroundColor: 'white'}}
                            onChange={(e) => setAuthor({...author, name: e.target.value})}
                            />
                    </FormControl>
                </Grid>
            </Paper>
            <Grid container >
                <Grid item justifyContent='flex-start' xs={6}>
                    <Button variant='contained' sx={{mt: 2}} color='primary' onClick={
                        () => window.location.href = '/authors'        
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

export default AuthorForm