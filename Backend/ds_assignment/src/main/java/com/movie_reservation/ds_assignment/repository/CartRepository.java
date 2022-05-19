package com.movie_reservation.ds_assignment.repository;

import com.movie_reservation.ds_assignment.model.Cart;
import com.movie_reservation.ds_assignment.model.ManagerUser;
import com.movie_reservation.ds_assignment.model.Movie;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CartRepository extends MongoRepository<Cart, String> {

    List<Cart> findByMovieNameContaining(String movieName);
    void deleteById(ObjectId movieId);
}
