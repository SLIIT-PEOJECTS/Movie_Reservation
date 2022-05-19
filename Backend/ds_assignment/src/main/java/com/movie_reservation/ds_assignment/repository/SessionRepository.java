package com.movie_reservation.ds_assignment.repository;

import com.movie_reservation.ds_assignment.model.Session;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SessionRepository extends MongoRepository<Session, String> {

    List<Session> findSessionBySessionID(String sessionID);
//    List<Session> findByAvailable(boolean available);

}