package com.movie_reservation.ds_assignment.controller;

import com.movie_reservation.ds_assignment.model.Tutorial;
import com.movie_reservation.ds_assignment.model.User;
import com.movie_reservation.ds_assignment.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    public void createUser(@RequestBody User user) {
        userRepository.insert(user);
    }

    @PostMapping("/delete/{id}")
    public void deleteUser(@PathVariable String id) {
        userRepository.deleteById(id);
    }

    @GetMapping("/list")
    public List<User> listUsers() {
        return userRepository.findAll();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") String id, @RequestBody User user) {
        Optional<User> UserData = userRepository.findById(id);
        if (UserData.isPresent()) {
            User _user = UserData.get();
            _user.setFirstName(user.getFirstName());
            _user.setLastName(user.getLastName());
            _user.setTel(user.getTel());
            return new ResponseEntity<>(userRepository.save(_user), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/password/{id}")
    public ResponseEntity<User> updatePass(@PathVariable("email") String email, @RequestBody User user) {
        Optional<User> UserData = userRepository.findById(email);
        if (UserData.isPresent()) {
            User _user = UserData.get();
            _user.setPassword(user.getPassword());
            return new ResponseEntity<>(userRepository.save(_user), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user)   {
        System.out.println("Email: " + user.getEmail());
        System.out.println("Passowrd: " + user.getPassword());

        Optional<User> managerUser = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
        if (managerUser.isPresent()) {
            return new ResponseEntity<>(managerUser.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}
