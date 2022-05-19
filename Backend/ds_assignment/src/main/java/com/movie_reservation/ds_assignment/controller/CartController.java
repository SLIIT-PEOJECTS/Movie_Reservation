package com.movie_reservation.ds_assignment.controller;

import com.movie_reservation.ds_assignment.model.Cart;
import com.movie_reservation.ds_assignment.model.ManagerUser;
import com.movie_reservation.ds_assignment.model.Movie;
import com.movie_reservation.ds_assignment.repository.CartRepository;
import com.movie_reservation.ds_assignment.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/cart")
public class CartController {

    @Autowired
    CartRepository cartRepository;

    @PostMapping("/")
    public ResponseEntity<Cart> createCart(@RequestBody Cart cart) {
        try {
            Cart cartList = cartRepository.save(new Cart(cart.getId(), cart.getUserId(), cart.getMovieId(), cart.getMovieName(), cart.getMoviePrice()));
            return new ResponseEntity<>(cartList, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println("Error :- " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/")
    public ResponseEntity<List<Cart>> getAllCarts(@RequestParam(required = false) String movieName) {
        try {
            List<Cart> cart = new ArrayList<Cart>();
            if (movieName == null)
                cartRepository.findAll().forEach(cart::add);
            else
                cartRepository.findByMovieNameContaining(movieName).forEach(cart::add);
            if (cart.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(cart, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<Cart> getCartById(@PathVariable("id") String id) {
//        Optional<Cart> cart = cartRepository.findById(id);
//        if (cart.isPresent()) {
//            return new ResponseEntity<>(cart.get(), HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        }
//    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Cart>> getCartById(@PathVariable("id") String id) {
        try {
            List<Cart> cart = cartRepository.findByUserId(id);
            if (cart.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            else {
                return new ResponseEntity<>(cart, HttpStatus.OK);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cart> updateCart(@PathVariable("id") String id, @RequestBody Cart cart) {
        Optional<Cart> cartData = cartRepository.findById(id);
        if (cartData.isPresent()) {
            Cart cartList = cartData.get();
            cartList.setUserId(cart.getUserId());
            cartList.setMovieId(cart.getMovieId());
            cartList.setMovieName(cart.getMovieName());
            cartList.setMoviePrice(cart.getMoviePrice());
            return new ResponseEntity<>(cartRepository.save(cartList), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteCart(@PathVariable("id") String id) {
        try {
            cartRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


//    @DeleteMapping("/")
//    public ResponseEntity<HttpStatus> deleteAllMovies() {
//        try {
//            movieRepository.deleteAll();
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    /*
      Method - Get by Availability
      By - Isuru Pathum Herath
    */

//    @GetMapping("/available")
//    public ResponseEntity<List<Movie>> findByAvailability() {
//        try {
//            List<Movie> movies = movieRepository.findByAvailable(true);
//            if (movies.isEmpty()) {
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            }
//            return new ResponseEntity<>(movies, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
}
