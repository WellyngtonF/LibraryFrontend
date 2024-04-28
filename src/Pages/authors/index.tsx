import { useEffect, useState } from 'react'
import Layout from '../../Layout'
import axios from 'axios'

import Table from '../../Components/table'
import { Button, Typography } from '@mui/material'

interface IAuthors {
  id: number
  name: string
}

const authorsTableHeaders = ['ID', 'Name']

const Authors = () => {
  const [authors, setAuthors] = useState([] as IAuthors[])

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:8000/authors')
      const data = await response.data
      setAuthors(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleClick = (data: IAuthors) => {
    window.location.href = `/authors/${data.id}`
  }

  useEffect(() => {
    document.title = 'Authors - Library'
    fetchAuthors()
  }, [])

  return (
    <Layout>
      <Typography variant='h4'>Authors</Typography>
      <Table data={authors} headers={authorsTableHeaders} onHover handleClick={handleClick}/>
      {/* on click add author, change the route to /authors/new */}
      <Button variant='contained' sx={{mt: 2}} color='primary' onClick={
        () => window.location.href = '/authors/new'        
      }>Add Author</Button>
    </Layout>
  )
}

export default Authors