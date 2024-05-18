import { Link } from 'react-router-dom'
import { Box, Hidden, Typography } from '@mui/material'
import { Person, Home, Apartment, Style, Book, Star } from '@mui/icons-material'

const links = [
    {
        title: 'Home',
        icon: Home,
        path: '/'
    },
    {
        title: 'Publishers',
        icon: Apartment,
        path: '/publishers'
    },
    {
        title: 'Authors',
        icon: Person,
        path: '/authors'
    },
    {
        title: 'Genres',
        icon: Style,
        path: '/genres'
    },
    {
        title: 'Books',
        icon: Book,
        path: '/books'
    },
    {
        title: 'Wishlist',
        icon: Star,
        path: '/'
    }
]

const Sidebar = () => {
    return (
        <Box 
            sx={{
                backgroundColor: "#161d2f",
                padding: 2,
                borderRadius: 2,
                display: "flex",
                flexDirection: {
                xs: "row",
                lg: "column",
                },
                alignItems: "center",
                justifyContent: "space-between",
                width: {
                sm: "100%",
                lg: 200,
                },
            }}
        >
            <Box
                sx={{
                display: "flex",
                flexDirection: {
                    xs: "row",
                    lg: "column",
                },
                gap: 5,
                alignItems: {
                    xs: "center",
                    lg: "start",
                },
                width: "100%",
                }}
            >

                <Hidden smDown>
                    <Typography 
                        variant="h5"
                        component="h1"
                        my={2}
                        fontWeight={400}
                        fontSize={18}
                    >
                        <Box fontWeight='fontWeightBold'>
                            Library Service
                        </Box>
                    </Typography>
                </Hidden>

                <Box
                    sx={{
                        py: {
                          xs: "0px",
                          lg: "16px",
                        },
                        display: "flex",
                        flexDirection: {
                          xs: "row",
                          lg: "column",
                        },
                        gap: 4,
                    }}
                >
                    {links.map((link, index) => (
                        <Link
                        key={index}
                        to={link.path}
                        style={{
                            textDecoration: "none"
                        }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    color: "white",
                                    textDecoration: "none",
                                }}
                            >
                                {link.icon ? <link.icon /> : null}
                                <Hidden mdDown>
                                    <Typography>{link.title}</Typography>
                                </Hidden>
                            </Box>
                        </Link>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default Sidebar