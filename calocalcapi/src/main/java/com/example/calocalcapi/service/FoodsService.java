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

    public Foods updateFood(Integer id, Foods foodDetails) {
        Foods existingFood = foodRepo.findById(id).get();
        existingFood.setDate(foodDetails.getDate());
        existingFood.setMeal_type(foodDetails.getMeal_type());
        existingFood.setName(foodDetails.getName());
        existingFood.setAmount(foodDetails.getAmount());
        existingFood.setCalories(foodDetails.getCalories());
        existingFood.setProtein(foodDetails.getProtein());
        existingFood.setCarbohydrate(foodDetails.getCarbohydrate());
        existingFood.setFat(foodDetails.getFat());

        return foodRepo.save(existingFood);
    }
}
