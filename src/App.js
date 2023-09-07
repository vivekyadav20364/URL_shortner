import './App.css';
import {Box} from '@mui/material';
import {Button} from '@mui/material';
import {Typography}  from '@mui/material';
import {TextField} from '@mui/material';

import { useState} from 'react';
import axios from 'axios';;
function App() {
  const [url,setUrl]=useState("");
  const [shortId,setShortId]=useState();
  const [clicked,setClicked]=useState();
  //console.log(url);
  const handleClick=async()=>{
    try {
      const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      if(url.match(urlRegex)){
      const {data}=await axios.post("https://url-shortner-backend-272z.onrender.com/url",{
        url:url,
      });
      console.log(data);
      setShortId(data.id);
      setClicked(0);
    }
    else{
      alert("Invalid URL!!");
    }
    } catch (error) {
      console.log(error);
    }
  }

  const handleRedirect=async(shortId)=>{
    try {
      const reDirect= await axios.get(`https://url-shortner-backend-272z.onrender.com/url/analytic/${shortId}`);
      console.log(reDirect.data);
      setClicked(reDirect.data.Totalclicks);
      const url = `https://url-shortner-backend-272z.onrender.com/${shortId}`;
      // Open the URL in a new tab
      window.open(url, '_blank');      
    } catch (error) {
      
    }
  }

  return (
    <div className='App'>
    <Box
    sx={{

      backgroundColor:"white",
      boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
      width: "90%",
      maxWidth: "400px", // Limit the width for responsiveness
      height: "35vh", // Allow the height to adjust based on content
      margin: "15vh auto", // Center horizontally and apply top margin
      padding: "16px", // Add padding for spacing inside the box
      borderRadius: "8px", // Add rounded corners
      '@media (max-width: 412px)': {
          margin:"15vh 20px",
          height:"45vh"
        }
    }}
  >
    <Typography sx={{ textAlign: "center", marginBottom: "16px" }} variant='h5'>URL Shortener</Typography>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextField
        onChange={(e) => setUrl(e.target.value)}
        sx={{ flex: 1, marginRight: "16px" }}
        id="standard-basic"
        label="Paste URL here!!"
        variant="outlined"
      />
      <Button
        onClick={handleClick}
        variant='contained'
        color='primary' // Use a Material-UI color for the button
      >
        Generate
      </Button>
    </Box>
    <Box sx={{ marginTop: "16px", display: "flex", justifyContent: "space-between",
        '@media (max-width: 412px)': {
          display:"block",
        }
      }}
     >
      <Box>
        <Typography variant='h6'>Shortened URL</Typography>
        <Box
          onClick={() => handleRedirect(shortId)}
          sx={{
            marginTop:"5px",
            textDecoration: "underline",
            cursor: "pointer",
            color: "primary.main", // Use a Material-UI color for the text
          }}
        >
          {shortId ? `https://url-shortner-backend-272z.onrender.com/${shortId}` : ''}
        </Box>
      </Box>
      <Box>
        <Typography sx={{
        '@media (max-width: 412px)': {
          marginTop:"8px",
        },
      }} variant='h6'>Visited</Typography>
        <Typography variant='h6'>{clicked}</Typography>
      </Box>
    </Box>
  </Box>
  </div>
  );
}

export default App;
