import React from 'react';
import {Comment, Tooltip } from 'antd';
import Rating from '@mui/material/Rating';
import { Avatar } from '@mui/material';

function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  

function Post({ name, comment, rate, created_at}) {
    const actions = [
        <span style={{display:'flex',alignItems:'center'}}>
        {rate}/5 <Rating name="half-rating-read" value={rate} precision={0.5} readOnly /> 
        </span>,
      ];
      
  return (
    <>
    <Comment
    actions={actions}
    author={<a>{name}</a>}
    avatar={ <Avatar {...stringAvatar(`${name}`)} />}
    content={
      <>
        <p style={{cursor:'pointer'}}>
        {comment}
      </p>

      </>
    }
    datetime={
      <Tooltip title="2016-11-22 11:22:33">
        <span>{created_at}</span>
      </Tooltip>
    }
  />
  </>
  )
}

export default Post