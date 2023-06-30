package com.example.calocalcapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.calocalcapi.model.Users;
import com.example.calocalcapi.service.UsersService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UsersController {

    @Autowired
        UsersService userService;

    @PostMapping("/users")
    public Users createUser(@RequestBody Users user) {
        return userService.createUser(user);
    }

    @GetMapping("/users")
    public List<Users> getUsers() {
        return userService.getUsers();
    }

    @PutMapping("/users/{userId}")
    public Users updateUser(@PathVariable(value="userId") String id, @RequestBody Users userDetails) {
        return userService.updateUser(id, userDetails);
    }

    @DeleteMapping(value="users/{userId}")
    public void deleteUser(@PathVariable(value="userId") String id) {
        userService.deleteUser(id);
    }

}
