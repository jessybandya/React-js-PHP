import React, { useState,useEffect } from 'react'
import Header from '../../components/Header'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios'; 
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import AddBook from '../../components/AddBook';
import Post from './Post';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Home() {
    const [books, setBooks] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filteredPosts, setFilteredPosts] = React.useState([]);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
      axios.get('http://localhost:80/api/books/').then(function(response) {
          setBooks(response.data);
      });
  }

  
  React.useEffect(() => {
    if (books !== undefined) {
      const finalPosts = books.filter(res => {
        return res.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      })

      setFilteredPosts(finalPosts)
    }else {
      return <div>No results3</div>
    }
  }, [searchTerm])

  const updateSearchResults = (e) => {
    setSearchTerm(e.target.value)
    // document.getElementsByClassName('dropdown-content3')[0].style.display = 'auto';
  }

  return (
    <div>
    <Header handleClickOpen={handleClickOpen} handleClose={handleClose}/>

    <Paper
    component="form"
    sx={{ display: 'flex', alignItems: 'center'}}
  >

    <InputBase
      sx={{ ml: 1, flex: 1 }}
      onChange={updateSearchResults}
      placeholder="Search book by title..."
    />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon />
    </IconButton>

    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

  </Paper> 
  <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
  {searchTerm === "" ?(
     <>
    {
      books.map((book) => (
         <Post
         title={book.title}
         rate={book.rate}
         description={book.description}
         created_at={book.created_at}
         />
       ))
  }
  </>
  ):(
    <>
    {
     filteredPosts.length > 0 ?(
       <span style={{display:'flex', flexWrap:'wrap',justifyContent:'center'}}>
       {
                       filteredPosts.map((book) => (
                        <Post
                        title={book.title}
                        rate={book.rate}
                        description={book.description}
                        created_at={book.created_at}
                        />
                      ))
                       }
       </span>
     ):(
      <center style={{fontWeight:'bold'}}><h4>No results for `{searchTerm}`</h4></center>
     )       
   
   }
    </>
  )}


  </div>
  
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
  )
}

export default Home