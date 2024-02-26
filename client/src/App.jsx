import React, { useEffect, useState,useMemo } from 'react';
import {io} from 'socket.io-client'
import { Button,Container,Stack,TextField,Typography } from '@mui/material';
function App() {
  const socket=useMemo(()=>(io("http://localhost:3000")),[]);  //cors lagana hai tb ye dikhega ya phir server and client both on same url
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState('');
  const [socketid, setSocketid] = useState('');
  const [messages, setMessages] = useState([]);
  const handleSubmit = (e) =>{
    e.preventDefault();
    socket.emit("message",{message,room});
    setMessage('');
  }
  console.log(messages);
  useEffect(()=>{
    socket.on("connect",()=>{   
      setSocketid(socket.id);      
      console.log('connected',socket.id)
    });
    socket.on( "receive-message" , (data)=>{
        console.log('recieve data : ',data)
        setMessages([...messages, data]) 
    })
    socket.on("welcome" , (s)=>{
      console.log(s);
    })
    return () => {
      socket.disconnect()
    };
  },[])
  return (
    <Container maxWidth="sm">
      {/* <Typography variant='h1' component="div" gutterBottom>
        Welcome to socket.io
      </Typography> */}
      <Typography variant='h3' component="div" gutterBottom>
        {socketid}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e)=> setMessage(e.target.value)}
          id='outlined-basic'
          label='message'
          variant='outlined'
        />
        <TextField
          value={room}
          onChange={(e)=> setRoom(e.target.value)}
          id='outlined-basic'
          label='Room'
          variant='outlined'
        />
        <Button type='submit' variant='contained' color='primary'>Send</Button>
      </form>
      <Stack>
        {messages.map((m,i)=>(
          <Typography key={i} variant='h6' component="div" gutterBottom>
            {m}
          </Typography>
        ))}
      </Stack>
    </Container>
  )
}

export default App

