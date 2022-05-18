import React , { useEffect }from 'react';
import axios from 'axios';
import Footer from './Footer';
import Header from './Header';
import "../asset/css/Details.css";
import ReactStars from 'react-stars';
import QRCode from "qrcode.react";
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';

function DetailView() {
    const [movie, setMovie] = React.useState('');

    const getMovie = 'http://localhost:8081/movie/6285383d5598f01ad8e7504a';
     
    const getSingleMovie = () =>{
        axios.get(`${getMovie}`).then((res)=>{
            setMovie(res.data);
        }).catch(error => console.error(`Error: ${error}`));
    }

    const downloadQRCode = () => {
        const canvas = document.getElementById("qr-gen");
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${movie.name}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
  
    useEffect(()=>{
        getSingleMovie();
    },[])    
    
    // var tags=[];
    // for(let i=0; i<movie.tags.length; i++){
    //     let tagName = movie.tags[i];
    //     tags.push(<Badge pill bg="warning" text="dark">{tagName}</Badge>);
    // }

    return (
      <>
        <Header tab="Movie View" />
        <Container fluid>
          <Row>
            <Col sm={8}>
              <Card className="bg-dark text-white mt-5 img-box">
                <Card.Img src={movie.movieURL} alt="Card image" />
                <Card.ImgOverlay>
                  <Card.Title>{movie.name}</Card.Title>
                  <Card.Text>{movie.description}</Card.Text>
                  <Card.Text>by {movie.director}</Card.Text>
                </Card.ImgOverlay>
              </Card>
            </Col>
            <Col sm={4}>
              <div className="movie-details mt-5">
                <h2>
                  {movie.name} by {movie.director}
                </h2>
                <p>{movie.genre} movie releasd in {movie.releaseDate} <br/>
                Casts By : {movie.cast}
                </p>
                <ReactStars
                  count={5}
                  onChange={null}
                  edit={false}
                  size={24}
                  color2={"#ffd700"}
                  value={movie.rating}
                />

                <div className='m-3'>
                    {/* {tags}                   */}
                </div>

                <div>
                    <Button disabled={!movie.available}>Add To Cart</Button>
                </div>

                <div>
                <QRCode
                    id="qr-gen"
                    value={movie.name}
                    size={200}
                    level={"H"}
                    includeMargin={true}
                />
                <Button onClick={downloadQRCode}>
                Download QR Code
                </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
}

export default DetailView;