import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';

function Header({handleClickOpen, handleClose}) {
  const [reviews, setReviews] = React.useState([]);
  React.useEffect(() => {
    getReviews();
}, []);

function getReviews() {
  axios.get('http://localhost:80/api/reviews/').then(function(response) {
    setReviews(response.data);
  });
}

const totalRatings = (reviews.reduce((a,v) =>  a = a + v.rate , 0 ))
const numberOfRatings = reviews.length
const rating = totalRatings / numberOfRatings
var a = Math.round(rating * 10) / 10

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <Button
          sx={{ my: 2, color: 'white', display: 'flex',alignItems:'center' }}
          href="/reviews"
        >
        <StarIcon style={{color:'#FFD700'}}/>{numberOfRatings === 0 ?(<>0</>):(<>{a}</>)}/5
        </Button>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
            
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
              href="/reviews"
                sx={{ my: 2, color: 'white', display: 'flex',alignItems:'center',fontWeight:'bold' }}
              >
            <Rating name="read-only" value={a} readOnly precision={0.5} />{numberOfRatings === 0 ?(<>0</>):(<>{a}</>)}/5
              </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          <Button variant="outlined" style={{color:'#fff',fontWeight:'bold',border:'1px solid #fff'}} onClick={handleClickOpen}>Add Book</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;