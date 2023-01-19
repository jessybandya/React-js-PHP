import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';

export default function Post({ title, rate, description, created_at}) {
    const [imageUrl, setImageUrl] = React.useState("");

    React.useEffect(() => {
      const delay = imageUrl ? 50000 : 0;
  
      new Promise(resolve => setTimeout(resolve, delay)).then(() => {
        fetch("https://dog.ceo/api/breeds/image/random")
          .then(res => res.json())
          .then(data => setImageUrl(data.message))
          .catch(err => console.log("Problemino!", err))
      });
    }, [imageUrl]);
  return (
    <Card sx={{ maxWidth: 300,margin:1 }}>
      <CardMedia
        component="img"
        alt={title}
        height="140"
        width="140"
        image={imageUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
      <StarIcon style={{color:'#FFD700'}}/><span style={{fontWeight:'bold'}}>{rate}</span>
        <Button align='right' size="small">{created_at}</Button>
      </CardActions>
    </Card>
  );
}

// function Post({ title, rate, description, created_at}) {
