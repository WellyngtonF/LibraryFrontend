import { useEffect, useState } from "react";
import axios from 'axios'

import { Button, Grid, Paper, FormControl, TextField, FormLabel } from '@mui/material'

import Layout from '../../../Layout'

interface IPublisher {
    id: number
    name: string
}

const PublisherForm = () => {
    const [publisher, setPublisher] = useState({} as IPublisher)

    useEffect(() => {
        document.title = 'Add Publisher - Library'
    })

    const handleSubmit = () => {
        axios.post('http://localhost:8000/publishers', publisher)
        .then(() => {
            window.location.href = '/publishers'
        })
    }

    return (
        <Layout>
            <Paper sx={{ backgroundColor: '#161d2f' }}>
                <Grid container>
                    <FormControl sx={{m: 2}} fullWidth>
                        <FormLabel sx={{color: 'white', backgroundColor: '#161d2f'}} >Publisher</FormLabel>
                        <TextField 
                            id='name' 
                            variant='outlined' 
                            value={publisher.name} 
                            sx={{borderRadius: '4px', overflow: 'hidden', backgroundColor: 'white'}}
                            onChange={(e) => setPublisher({...publisher, name: e.target.value})}
                        />
                    </FormControl>
                </Grid>
            </Paper>
            <Grid container>
                <Grid item justifyContent='flex-start' xs={6}>
                    <Button variant='contained' sx={{mt: 2}} color='primary' onClick={
                        () => window.location.href = '/publishers'        
                    }>Back</Button>
                </Grid>
                <Grid item container justifyContent='flex-end' xs={6}>
                    <Button variant='contained' sx={{mt: 2}} color='success' onClick={handleSubmit}>Add</Button>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default PublisherForm;