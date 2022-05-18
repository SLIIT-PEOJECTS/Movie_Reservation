package com.movie_reservation.ds_assignment.controller;

import com.movie_reservation.ds_assignment.model.User;
import com.movie_reservation.ds_assignment.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/create")
    public String create(String firstName, String lastName, String tel, String email, String password){
        User u = userService.create(firstName, lastName, tel,email,password);
        return u.toString();
    }

    @RequestMapping("/get")
    public User getUser(@RequestParam String firstName){
        return userService.getByFirstName(firstName);
    }

    @RequestMapping("/getAll")
    public List<User> getAll(){
        return userService.getall();
    }

    @RequestMapping("/update")
    public String update(@RequestParam String firstName, String lastName, String tel, String email, String password){
        User u=userService.update(firstName,lastName,tel,email,password);
        return u.toString();
    }

    @RequestMapping("/delete")
    public String delete(@RequestParam String firstName){
        userService.delete(firstName);
        return "Deleted";
    }

    @RequestMapping("/deleteall")
    public String deleteAll() {
        userService.deleteAll();
        return "Deleted all records";
    }
}
