package com.movie_reservation.ds_assignment.repository;

import com.movie_reservation.ds_assignment.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

}
