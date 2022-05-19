package com.movie_reservation.ds_assignment.controller;

import com.movie_reservation.ds_assignment.model.Cart;
import com.movie_reservation.ds_assignment.model.Movie;
import com.movie_reservation.ds_assignment.model.Session;
import com.movie_reservation.ds_assignment.repository.CartRepository;
import com.movie_reservation.ds_assignment.repository.MovieRepository;
import com.movie_reservation.ds_assignment.repository.SessionRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/session")

public class SessionController {

    @Autowired
    SessionRepository sessionRepository;

    @PostMapping("/")
    public ResponseEntity<Session> createSession(@RequestBody Session session) {
        try {
            Session sessionList = sessionRepository.save(new Session(session.getSessionID(), session.getSessionName(), session.getFromTime(), session.getToTime()));
            return new ResponseEntity<>(sessionList, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println("Error :- " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/")
    public ResponseEntity<List<Session>> getAllSessions(@RequestParam(required = false) String id) {
        try {
            List<Session> sessions = new ArrayList<Session>();
            if (id == null)
                sessionRepository.findAll().forEach(sessions::add);
            else
                sessionRepository.findSessionBySessionID(id).forEach(sessions::add);
            if (sessions.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(sessions, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{sessionID}")
    public ResponseEntity<Session> getSessionById(@PathVariable("sessionID") String sessionID) {
        Optional<Session> sessions = sessionRepository.findById(sessionID);
        if (sessions.isPresent()) {
            return new ResponseEntity<>(sessions.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PutMapping("/{sessionID}")
    public ResponseEntity<Session> updateSession(@PathVariable("sessionID") String sessionID, @RequestBody Session session) {
        Optional<Session> sessionData = sessionRepository.findById(sessionID);
        if (sessionData.isPresent()) {
            Session sessionList = sessionData.get();
            sessionList.setSessionName(session.getSessionName());
            sessionList.setFromTime(session.getFromTime());
            sessionList.setToTime(session.getToTime());
            return new ResponseEntity<>(sessionRepository.save(sessionList), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{sessionID}")
    public ResponseEntity<HttpStatus> deleteSession(@PathVariable("sessionID") String sessionID) {
        try {
            sessionRepository.deleteById(sessionID);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/")
    public ResponseEntity<HttpStatus> deleteAllSessions() {
        try {
            sessionRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @GetMapping("/available")
//    public ResponseEntity<List<Session>> findByAvailability() {
//        try {
//            List<Session> sessions = sessionRepository.findByAvailable(true);
//            if (sessions.isEmpty()) {
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            }
//            return new ResponseEntity<>(sessions, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

}
