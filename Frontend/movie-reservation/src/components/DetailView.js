import React , { useEffect, useState  }from 'react';
import axios from 'axios';
import Footer from './Footer';
import Header from './Header';
import "../asset/css/Details.css";
import ReactStars from 'react-stars';
import QRCode from "qrcode.react";
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { getCustomerUser } from "../Services/SessionManager";

function DetailView() {
  useEffect(() => {
    getSingleMovie();
    const userid = getCustomerUser();
    if (userid === false) {
      
    } else {
      console.log(userid);
    }
  }, []);   

    let navigate = useNavigate();
    let {movieid} = useParams();
    let {moviename} = useParams();

    const [movie, setMovie] = React.useState('');
        
    const userid = getCustomerUser();    

    const [values, setValues] = useState({
      userId: userid,
      movieId: movieid,
      movieName: moviename,
      moviePrice: 0,
    });

    const {userId,movieId,movieName,moviePrice} = values;
    const cartitem = {userId,movieId,movieName,moviePrice};

    const getMovie = `http://localhost:8081/movie/${movieid}`;
    const toCart = `http://localhost:8081/cart/`;
     
    const getSingleMovie = () =>{
        axios.get(`${getMovie}`).then((res)=>{
            setMovie(res.data);                      
        }).catch(error => console.error(`Error: ${error}`));
    }
 

    const addMovieToCart = () =>{
      console.log(cartitem)
      axios.post(`${toCart}` , cartitem).then((res)=>{        
        console.log("response");
        console.log(res)
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
      
    // var tags=[];
    // for(let i=0; i<movie.tags.length; i++){
    //     let tagName = movie.tags[i];
    //     tags.push(<Badge pill bg="warning" text="dark">{tagName}</Badge>);
    // }
    // ressearchprojectssliit@gmail.com
    return (
      <>
        <Header tab="Movie View" />
        <Container fluid>
          <Row>
            <Col sm={6}>
              {/* <Card className="text-white mt-5 img-box">
                <Card.Img src={movie.movieURL} alt="Card image"  className='movie-img'/>
                <Card.ImgOverlay>
                  <Card.Title className='card-title'>{movie.name}</Card.Title>
                  <Card.Text className='card-desc'>{movie.description}</Card.Text>
                  <Card.Text>by {movie.director}</Card.Text>
                </Card.ImgOverlay>
              </Card> */}
              <span className='movie-img-span'>
                <img src={movie.movieURL} alt="Card image"  className='movie-img'/>
                <h3></h3>
              </span>
            </Col>
            <Col sm={6}>
              <div className="movie-details movie">
                <h2 className='movie-title move-data'>
                  {movie.name} by {movie.director}
                </h2>
                <p>
                  {movie.genre} movie releasd in {movie.releaseDate} <br /><br />
                  {movie.description} <br/><br />
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

                {/* {movie.map((movie) => (
                  <div className="m-3" key={movie.id}>{movie.tags}</div>
                ))} */}

                <div className="m-3">
                    {/* <Badge pill bg="warning" text="dark">{movie.tags[0]}</Badge>
                    <Badge pill bg="warning" text="dark">{movie.tags[1]}</Badge>
                    <Badge pill bg="warning" text="dark">{movie.tags[2]}</Badge> */}
                </div>
                
                
                <br />
                <div>
                  <Button disabled={!movie.available} variant="secondary" size="lg" style={{width:"15rem"}}
                   onClick={addMovieToCart}
                   >Add To Cart</Button>
                </div>
                <br />
                <div>
                  <QRCode
                    id="qr-gen"
                    value={movie.name}
                    size={200}
                    level={"H"}
                    includeMargin={true}
                  />
                  <br />
                  <br />
                  <Button variant="outline-dark" onClick={downloadQRCode} size="lg" style={{width:"15rem"}}>
                    Download QR Code</Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
}

export default DetailView;