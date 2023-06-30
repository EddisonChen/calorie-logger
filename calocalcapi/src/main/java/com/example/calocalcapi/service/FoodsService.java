package com.example.calocalcapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.calocalcapi.model.Foods;
import com.example.calocalcapi.repository.FoodsRepository;
import java.util.List;
import java.util.Optional;

@Service
public class FoodsService {

    private FoodsRepository foodRepo;

    @Autowired
        public FoodsService(FoodsRepository foodRepo) {
        this.foodRepo = foodRepo;
    }

    public Foods createFood(Foods food) {
        return foodRepo.save(food);
    }

    public List<Foods> getFoods(String userId) {
        return foodRepo.findAllByUserId(userId);
    }

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
}
