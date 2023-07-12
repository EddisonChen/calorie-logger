package com.example.calocalcapi.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.calocalcapi.model.Foods;
import com.example.calocalcapi.repository.FoodsRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.example.calocalcapi.model.Users;
import com.example.calocalcapi.repository.UsersRepository;

// This is my FoodsService class which contains all the methods that I need in order to create, retrieve, update, and delete foods from the Foods table

@Service
public class FoodsService {

    private FoodsRepository foodRepo;
    private UsersRepository userRepo;

    @Autowired
        public FoodsService(FoodsRepository foodRepo, UsersRepository userRepo) {
        this.foodRepo = foodRepo;
        this.userRepo = userRepo;

    }

    public Foods createFood(Foods food, String userId) throws Exception {
        Optional<Users> optionalUser = userRepo.findById(userId);
        if (optionalUser.isPresent()) {
            Users user = optionalUser.get();
            food.setUser(user);
            return foodRepo.save(food);
        } else {
            throw new Exception("User not found with ID: " + userId);
        }
    }

    public List<Foods> getFoods(String userId) {
        return foodRepo.findAllByUserId(userId);
    }

    @Transactional
    public void deleteFood(Integer foodId, String userId) {
        foodRepo.deleteByIdAndUserId(foodId, userId);
    }

    public Foods updateFood(Integer foodId, String userId, Foods foodDetails) {
        Optional<Foods> existingFoodOptional = foodRepo.findByIdAndUserId(foodId, userId);

        if (existingFoodOptional.isPresent()) {
            Foods existingFood = existingFoodOptional.get();
            existingFood.setDate(foodDetails.getDate());
            existingFood.setMeal_type(foodDetails.getMeal_type());
            existingFood.setName(foodDetails.getName());
            existingFood.setAmount(foodDetails.getAmount());
            existingFood.setCalories(foodDetails.getCalories());
            existingFood.setProtein(foodDetails.getProtein());
            existingFood.setCarbohydrate(foodDetails.getCarbohydrate());
            existingFood.setFat(foodDetails.getFat());

            return foodRepo.save(existingFood);
        } else {
            throw new RuntimeException("Food not found for foodId: " + foodId + " and userId: " + userId);
        }
    }

    public List<Foods> getFoodsByDate(String userId, LocalDate date) {
        return foodRepo.findAllByUserIdAndDate(userId, date);
    }
}
