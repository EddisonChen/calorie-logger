package com.example.calocalcapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import com.example.calocalcapi.model.Users;
import com.example.calocalcapi.service.UsersService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UsersController {

    @Autowired
        UsersService userService;

    @PostMapping("/users")
    public Users createUser(@RequestParam(value = "id", required = true) String id,
                            @RequestParam(value = "name", required = true) String name,
                            @RequestParam(value = "email", required = true) String email) {
        Users user = new Users();
        user.setId(id);
        user.setName(name);
        user.setEmail(email);
        return userService.createUser(user);
    }

    @GetMapping("/users")
    public List<Users> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/users/{userId}")
    public Optional<Users> getUserById(@PathVariable(value="userId") String id) {
        return userService.getUserById(id);
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
