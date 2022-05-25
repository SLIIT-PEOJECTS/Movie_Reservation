import React, { useEffect } from 'react';
import axios from 'axios';
import Footer from './Footer';
import Header from './Header';
import "../asset/css/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel, Card, ListGroup, ListGroupItem, Button, Modal, Form, Container, Row, Col} from 'react-bootstrap';
import { CameraReelsFill, Film, DoorOpenFill, DoorClosedFill, GeoAlt } from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom";
import ReactStars from 'react-stars';

function Home(props) {
    const navigate = useNavigate();

    const [data, setData] = React.useState([]);
    const [theater, setTheater] = React.useState([]);

    const getMovie = 'http://localhost:8081/movie/available';
    const getTheater = 'http://localhost:8081/theater/';
     
    const getMovieList = () =>{
        axios.get(`${getMovie}`).then((res)=>{
            setData(res.data);
        }).catch(error => console.error(`Error: ${error}`));
    }

    const getTheaterList = () =>{
      axios.get(`${getTheater}`).then((res)=>{
        setTheater(res.data);
        console.log(res.data)
      })
    }

    useEffect(()=>{
        getMovieList();
        getTheaterList();
    },[])

  return (
    <div className="wrapper">
      <Header tab="X-trem Movie Hub" />
      <div className="carousel">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://wallpaperbat.com/img/282369-poster-movie-film-movies-posters-wallpaper-5120x2880-859165.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="http://images6.fanpop.com/image/photos/37800000/The-Hobbit-The-Battle-Of-The-Five-Armies-Banner-HD-the-hobbit-37844505-2284-1050.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://moviegalleri.net/wp-content/gallery/acharya-first-look/Chiranjeevi-Acharya-First-Look-HD-Wallpaper.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://livecinemanews.com/wp-content/uploads/2021/01/ErncsUcVQAAjDnj.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.kerala9.com/wp-content/uploads/2022/02/bheeshma-parvam-movie-posters-HD.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <hr style={{ width: "75%", marginLeft: "auto", marginRight: "auto" , marginTop:"5rem"}} />
      <div className="middle-view" id="movie-list">
        <div className="grid">
          {data.map((data) => (
            <Card
              style={{ width: "20rem" }}
              className="shadow-lg bg-white rounded box"
              key={data.id}
            >
              <Card.Img variant="top" src={data.movieURL} />
              <Card.Body style={{ color: "#0c141c" }}>
                <Card.Title style={{}}>
                  <b>{data.name}</b>
                </Card.Title>
                <Card.Text>
                  Genre : {data.genre} <br />
                  <div className="now-screen">
                    <div className="animation">
                      <CameraReelsFill color="#d9534f" />
                    </div>
                    <p>Now Screening</p>
                  </div>{" "}
                  Rating <br />
                  <ReactStars
                    count={5}
                    onChange={null}
                    edit={false}
                    size={24}
                    color2={"#ffd700"}
                    value={data.rating}
                  />
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Will Stream In {data.language}</ListGroupItem>
                <ListGroupItem>Directed By {data.director}</ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Button
                  variant="secondary"
                  size="sm"
                  style={{ width: "16rem", marginLeft: "1rem" }}
                  onClick={() => {
                    navigate(`/view/${data.id}/${data.name}`);
                  }}
                >
                  View Movie{" "}
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
      <div className="hall-list" id="hall-list">
        <hr style={{ width: "75%", marginLeft: "auto", marginRight: "auto" }} />
        <h2> We are now available at</h2>
        <Container style={{maxWidth:"70%"}}>
          <Row className="justify-content-md-center">
          {theater.map((data) => (
              <Card className='m-3'>
              <Card.Header style={{fontSize:"2rem", fontWeight:"bold", color:"#8eaccb", marginRight:"5px"}}>{data.name}<Film color="#8eaccb" /></Card.Header>
              <Card.Body style={{fontSize:"1rem", fontWeight:"bold", color:"#2c444c"}}>
                <blockquote className="blockquote mb-0">
                  <p>
                    {" "}{data.address}{" "} <GeoAlt color="#296e01" />
                  </p>
                  {/* <footer className="blockquote-footer">
                    Someone famous in{" "}
                    <cite title="Source Title">Source Title</cite>
                  </footer> */}
                </blockquote>
              </Card.Body>
            </Card>
        ))}
          </Row>
        </Container>
        <br />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
