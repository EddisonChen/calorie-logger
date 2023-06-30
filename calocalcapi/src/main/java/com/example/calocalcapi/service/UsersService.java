package com.example.calocalcapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.calocalcapi.model.Users;
import com.example.calocalcapi.repository.UsersRepository;
import java.util.List;

@Service
public class UsersService {

    private UsersRepository userRepo;

    @Autowired
        public UsersService(UsersRepository userRepo) {
            this.userRepo = userRepo;
    };

    public Users createUser(Users user) {
        return userRepo.save(user);
    }

    public List<Users> getUsers() {
        return userRepo.findAll();
    }

    public void deleteUser(String userId) {
        userRepo.deleteById(userId);
    }

    public Users updateUser(String id ,Users userDetails) {
        Users existingUser = userRepo.findById(id).get();
        existingUser.setName(userDetails.getName());
        existingUser.setEmail(userDetails.getEmail());

        return userRepo.save(existingUser);
    }
}
