
import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import Header from '../../components/Header'
import axios from 'axios'; 
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import AddBook from '../../components/AddBook';
import { Grid, TextField } from '@mui/material';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { toast } from "react-toastify";
import Post from './Post';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function Reviews() {
  const [open, setOpen] = React.useState(false);
  const [value1, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [inputs, setInputs] = useState([])
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews();
}, []);

function getReviews() {
  axios.get('http://localhost:80/api/reviews/').then(function(response) {
    setReviews(response.data);
  });
}

  const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]:value}))
    }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  //   const data = new  FormData(event.currentTarget);
   if(!inputs.name){
       toast.error('Full name is needed!')
   }else if(!inputs.comment){
      toast.error('Comment is needed!')
   }else{
    inputs.rate = value1;
      axios.post('http://localhost:80/api/reviews/save', inputs).then(function(response){
          toast.success('Thanks for your feedback!')
          window.location.reload()
      });
 }
};

  return (
    <div>
    <Header handleClickOpen={handleClickOpen} handleClose={handleClose}/>
    <Box sx={{ pb: 7 }}>
    <center style={{marginTop:5,fontWeight:'bold'}}><Button variant="contained">Reviews({reviews.length})</Button></center>
    <CssBaseline />
    <List style={{marginBottom:160}}>
    {
      reviews.map((book) => (
         <Post
         name={book.name}
         comment={book.comment}
         rate={book.rate}
         created_at={book.created_at}
         />
       ))
  }
    </List>
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0,marginTop:20 }} elevation={3}>
      <BottomNavigation
      sx={{
        marginBottom: 12,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding:3
      }}
      >
      <Box component="form" style={{backgroundColor:'white'}} noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

      <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="given-name"
          name="name"
          required
          fullWidth
          id="name"
          label="Full Name"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="rate"
        id="rate"
        value={value1}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value1 !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value1]}</Box>
      )}
    </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="comment"
          label="Your Comment..."
          name="comment"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} style={{marginTop:-10}} sm={6}>
      <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
     Add Review
    </Button>
    </Grid>
    </Grid>
    </Box>
      </BottomNavigation>
    </Paper>
  </Box>


      <Dialog
    fullScreen
    open={open}
    onClose={handleClose}
    TransitionComponent={Transition}
  >
    <AppBar sx={{ position: 'relative' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
          
        </Typography>
        <Button autoFocus color="inherit" onClick={handleClose}>
          Cancel
        </Button>
      </Toolbar>
    </AppBar>
    <List>
     <AddBook handleClose={handleClose}/>
    </List>
  </Dialog>
    </div>

  );
}