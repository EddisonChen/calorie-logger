package com.example.calocalcapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.calocalcapi.model.Foods;
import com.example.calocalcapi.repository.FoodsRepository;
import java.util.List;

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

    public List<Foods> getFoods() {
        return foodRepo.findAll();
    }

    public void deleteFood(Integer foodId) {
        foodRepo.deleteById(foodId);
    }

    public Foods updateFood(Foods updatedFood) {
        Foods existingFood = foodRepo.findById(updatedFood.getId()).orElse(null);

        if (existingFood != null) {
            existingFood.setDate(updatedFood.getDate());
            existingFood.setMeal_type(updatedFood.getMeal_type());
            existingFood.setName(updatedFood.getName());
            existingFood.setAmount(updatedFood.getAmount());
            existingFood.setCalories(updatedFood.getCalories());
            existingFood.setProtein(updatedFood.getProtein());
            existingFood.setCarbohydrate(updatedFood.getCarbohydrate());
            existingFood.setFat(updatedFood.getFat());
            return foodRepo.save(existingFood);
        }

        return existingFood;
    }
}
