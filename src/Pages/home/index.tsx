import React from 'react';
import Link from 'react-router-dom';

import Layout from '../../Layout';
import { Typography } from '@mui/material';

const Home = () => {
    return (
        <Layout>
            <Typography variant="h4">About the project:</Typography>
            <br />
            <Typography variant="body1">
                This is a project to demonstrate the use of some stacks:
            </Typography>
            <br />
            <Typography variant="body2">
                - Python: as a backend responsible for serving a React frontend with fastapi and scrape some 
                marketplaces to get the best deals on the internet for books. <br />
                - React: as a frontend to show the books, authors, genres, and track my read data. <br />
                - Postgres: as a database to store the books, authors, genres, and track my read data. <br />
                - Docker: to containerize the backend and frontend. <br />
                - Github Actions: to automate the build and deploy of the project. <br />
                - AWS: to host the frontend and backend of the project.
            </Typography>
            <br />
            <Typography variant="body1">
                Marketplaces being scraped: 
            </Typography>
            <br />
            <Typography variant="body2" display='block'>
                - Amazon <br />
                - MercadoLibre <br />
                - Saraiva (todo)
            </Typography>
            <br /><br />
            <Typography variant="h4">About me:</Typography>
            <br />
            <Typography variant="body1">
                Im a software engineer with 5 years of experience in the field. <br />
                With professional experience in C#, Python, React, SQL, Shell, Docker, DevOps, Microsservices and Cloud. <br />
                You can find me on: <br />
                - <a href="https://github.com/WellyngtonF" target="_blank">GitHub</a> <br />
                - <a href="https://www.linkedin.com/in/wellyngton-ferreira-da-silva-505435179/" target="_blank">LinkedIn</a> <br />
            </Typography>
        </Layout>
    );
}

export default Home;