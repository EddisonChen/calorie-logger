package com.example.calocalcapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.calocalcapi.model.Users;
import com.example.calocalcapi.repository.UsersRepository;
import java.util.List;
import java.util.Optional;

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

    public Optional<Users> getUserById(String userId) {
        return userRepo.findById(userId);
    }

    public void deleteUser(String userId) {
        userRepo.deleteById(userId);
    }

    public Users updateUser(String id ,Users userDetails) {
        Users existingUser = userRepo.findById(id).get();
        existingUser.setName(userDetails.getName());
        existingUser.setEmail(userDetails.getEmail());
        existingUser.setSex(userDetails.getSex());
        existingUser.setUnit_type(userDetails.getUnit_type());
        existingUser.setHeight(userDetails.getHeight());
        existingUser.setWeight(userDetails.getWeight());
        existingUser.setAge(userDetails.getAge());
        existingUser.setActivity_level(userDetails.getActivity_level());
        existingUser.setGoal(userDetails.getGoal());
        existingUser.setGoal_calories(userDetails.getGoal_calories());
        existingUser.setGoal_protein(userDetails.getGoal_protein());
        existingUser.setGoal_carbohydrate(userDetails.getGoal_carbohydrate());
        existingUser.setGoal_fat(userDetails.getGoal_fat());

        return userRepo.save(existingUser);
    }
}

// UPDATE THIS CLASS!!!! INCLUDE NEW METHODS
