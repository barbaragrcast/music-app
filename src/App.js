import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const CLIENT_ID = "69a55be5790a4014916ef3308513a126 "
const CLIENT_SECRET = "aec2228ec82b49fcbef8de1c9ea1dced"


function App() {
const [searchInput, setSearchInput] = useState("");
const [accessToken, setAccessToken] = useState("");

useEffect(() =>{
    // API Access Token
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
        .then(result => result.json())
        .then(data => {
          setAccessToken(data.access_token)
          setAccessToken(data.access_token)
          console.log(data.access_token)
        })
}, [])
  

  async function search(){
    console.log("Search for " + searchInput);
    var searhParameters ={
      method: 'GET',
      headers: { "Content-Type" : 'application/json',
        'Authorization': 'Bearer' + accessToken
    }
  }
  var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
  .then(response => response.json()).then(data => {return data.artist.items[0].id})
  
  }

  
return (
    <div className="App">
      <Container>
        <InputGroup className = "mb-3" size = "lg">
          <FormControl
            placeholder = "Search"
            type = "input"
            // Event listener for when the user presses the enter key
            onKeyPress = {event => {
              if (event.key === "Enter"){
                console.log('pressed enter');
                search();
              }
            }}
            // Event listener for when the user types in the input field
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick = {()=>{console.log('clicked button')}}>
            Search
          </Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className ="mx-2 row row-cols-4">
                <Card>
                  <Card.Img src = '#' />
                  <Card.Body>
                    <Card.Title> Album Name Here </Card.Title>
                  </Card.Body>
                </Card>
          
        </Row>
        
      </Container>
    </div>
  );
}

export default App;
