import React, { useState,useEffect } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { toast } from "react-toastify";
import { useHistory } from 'react-router-dom';

const theme = createTheme();

function AddBook({ handleClose }) {
    const [inputs, setInputs] = useState([])
    const history = useHistory('')
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]:value}))
      }
      const handleSubmit = (event) => {
          event.preventDefault();
        //   const data = new  FormData(event.currentTarget);
         if(!inputs.title){
             toast.error('Title is needed!')
         }else if(!inputs.rate){
            toast.error('Rate is needed!')
         }else if(isNaN(+inputs.rate)){
            toast.error("Rate is required as a number!")
          }else if(!inputs.description){
            toast.error('Description is needed!')
         }else{
            axios.post('http://localhost:80/api/books/save', inputs).then(function(response){
                toast.success('Book been successfully added!')
                setInputs([])
                handleClose()
                history.push('/')
                window.location.reload()
            });
         }
        };
  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="title"
                required
                fullWidth
                id="title"
                label="Title"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="rate"
                label="Rating"
                name="rate"
                autoComplete="family-name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
           Add Book
          </Button>
        </Box>
      </Box>
    </Container>
  </ThemeProvider>  
  )
}

export default AddBook