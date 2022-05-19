package com.movie_reservation.ds_assignment.repository;

import com.movie_reservation.ds_assignment.model.ManagerUser;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ManagerUserRepository extends MongoRepository<ManagerUser, String> {
    List<ManagerUser> findByFirstNameContaining(String firstName);
    Optional<ManagerUser> findByEmailAndPassword(String email, String password);
    List<ManagerUser> findByType(String type);

}
