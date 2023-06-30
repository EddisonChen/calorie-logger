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

    public void deleteEmployee(String userId) {
        userRepo.deleteById(userId);
    }

    public Users updateUser(Users updatedUser) {
        Users existingUser = userRepo.findById(updatedUser.getId()).orElse(null);

        if (existingUser != null) {
            existingUser.setName(updatedUser.getName());
            existingUser.setEmail(updatedUser.getEmail());
            return userRepo.save(existingUser);
        }
        return existingUser;
    }
}
