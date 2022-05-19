package com.movie_reservation.ds_assignment.model;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document("cart")
@Data
public class Cart {
    @Id
    private String id;
    private String userId;
    private String movieId;
    private String movieName;
    private float moviePrice;

    public Cart(String id, String userId, String movieId, String movieName, float moviePrice) {
        this.id = id;
        this.userId = userId;
        this.movieId = movieId;
        this.movieName = movieName;
        this.moviePrice = moviePrice;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getMovieId() {
        return movieId;
    }

    public void setMovieId(String movieId) {
        this.movieId = movieId;
    }

    public String getMovieName() {
        return movieName;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }

    public float getMoviePrice() {
        return moviePrice;
    }

    public void setMoviePrice(float moviePrice) {
        this.moviePrice = moviePrice;
    }
}
