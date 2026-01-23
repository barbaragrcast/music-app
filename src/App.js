import './App.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const CLIENT_ID = "69a55be5790a4014916ef3308513a126";
const CLIENT_SECRET = "aec2228ec82b49fcbef8de1c9ea1dced";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]); 

  useEffect(() => {
    const authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:
        'grant_type=client_credentials' +
        '&client_id=' + CLIENT_ID +
        '&client_secret=' + CLIENT_SECRET
    };

    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => {
        setAccessToken(data.access_token);
        console.log(data.access_token);
      });
  }, []);

  async function search() {
    console.log("Search for " + searchInput);

    const searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken 
      }
    };

    // Get artist ID
    const artistResponse = await fetch(
      'https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist',
      searchParameters
    );

    const artistData = await artistResponse.json();
    const artistID = artistData.artists.items[0].id;

    console.log("Artist ID:", artistID);

    // Get albums
    const albumsResponse = await fetch(
      `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`,
      searchParameters
    );

    const albumsData = await albumsResponse.json();
    setAlbums(albumsData.items);
  }

  return (
    <div className="App">
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Search"
            type="input"
            onKeyDown={event => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={search}>Search</Button>
        </InputGroup>
      </Container>

      <Container>
        <Row className="mx-2 row row-cols-4">
          {albums.map(album => (
            <Card key={album.id}>
              <Card.Img src={album.images[0]?.url} />
              <Card.Body>
                <Card.Title>{album.name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
