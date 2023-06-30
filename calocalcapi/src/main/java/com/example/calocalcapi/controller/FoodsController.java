package com.example.calocalcapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.example.calocalcapi.model.Foods;
import com.example.calocalcapi.service.FoodsService;

@RestController
@RequestMapping("/api")
public class FoodsController {
    @Autowired
        FoodsService foodService;

    @PostMapping(value="/foods")
    public Foods createFood(@RequestBody Foods food) {
        return foodService.createFood(food);
    }

    @GetMapping(value="/foods")
    public List<Foods> getFoods(@RequestParam(value="userId") String userId) {
        return foodService.getFoods(userId);
    }

    @PutMapping(value="/foods/{foodId}")
    public Foods updateFood(@PathVariable(value="foodId") Integer foodId, @RequestParam(value="userId") String userId,@RequestBody Foods foodDetails) {
        return foodService.updateFood(foodId, userId, foodDetails);
    }

    @DeleteMapping(value="/foods/{foodId}")
    public void deleteFood(@PathVariable(value="foodId") Integer foodId, @RequestParam(value="userId") String userId) {
        foodService.deleteFood(foodId, userId);
    }

}
