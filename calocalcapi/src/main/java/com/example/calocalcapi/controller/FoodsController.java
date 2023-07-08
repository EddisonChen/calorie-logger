package com.example.calocalcapi.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.example.calocalcapi.model.Foods;
import com.example.calocalcapi.service.FoodsService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class FoodsController {
    @Autowired
        FoodsService foodService;

    // for RequestParam, put localhost:8080/api/food?userId=ex
    @PostMapping(value="/foods")
    public Foods createFood(@RequestBody Foods food, @RequestParam("userId") String userId) throws Exception {
        return foodService.createFood(food, userId);
    }

    @GetMapping(value="/foods")
    public List<Foods> getFoods(@RequestParam(value="userId") String userId) {
        return foodService.getFoods(userId);
    }

    @GetMapping(value="/foods/{date}")
    public List<Foods> getFoodsByDate(@PathVariable(value="date") LocalDate date, @RequestParam(value="userId") String userId) {
        return foodService.getFoodsByDate(userId, date);
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
