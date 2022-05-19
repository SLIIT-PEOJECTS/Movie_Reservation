/*
  Created by - Isuru Pathum Herath
  Name - Movie Profile
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useParams } from "react-router-dom";
import { getToken } from '../../Services/SessionManager';
import Navbar from '../../components/dashboard/Navbar';
import Sidebar from '../../components/dashboard/Sidebar';

const MovieProfile = props => {

    // state
    const [movie, setMovie] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        fetchMovieDetails();


    }, []);

    const fetchMovieDetails = () => {
        axios
            .get(`http://localhost:8081/movie/${id}`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            })
            .then(response => {
                console.log(response)
                setMovie(response.data)
            })
            .catch(error => alert('Error Loading Movie Details'));

        var date = movie.releaseDate;
        var momentDate = moment.utc(date).format('MM/DD/YYYY');
        console.log(momentDate);
    }

    return (
        <div>
            <Navbar />
            <Sidebar />

            <div className="container " style={{ marginLeft: "90px", position: "absolute" }}>
                <div className="card scrollable-div" style={{ width: "1240px", height: "590px" }}>
                    <section class="section about-section gray-bg" id="about">
                        <div class="container">
                            <div class="row align-items-center flex-row-reverse">
                                <div class="col-lg-6">
                                    <div class="about-text go-to">
                                        <h3 class="dark-color">{movie.name}</h3>
                                        <h6 class="theme-color lead">Released Date : {moment.utc(movie.releaseDate).format('MM/DD/YYYY')}</h6>
                                        <br />
                                        <div style={{ width: "550px", overflow: "auto" }}>{movie.description}</div>

                                        <br />
                                        <div class="row about-list">
                                            <div class="col-md-8">
                                                <div class="media">
                                                    <label>Genre</label>
                                                    <p>{movie.genre}</p>
                                                </div>
                                                <div class="media">
                                                    <label>Language</label>
                                                    <p>{movie.language}</p>
                                                </div>
                                                <div class="media">
                                                    <label>Rating</label>
                                                    <p>{movie.rating}</p>
                                                </div>
                                                <div class="media">
                                                    <label>Director</label>
                                                    <p>{movie.director}</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="about-avatar">
                                        <img src={movie.movieURL} title="" alt="" width="400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default MovieProfile;