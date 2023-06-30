package com.example.calocalcapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.calocalcapi.model.Foods;
import com.example.calocalcapi.service.FoodsService;

@RestController
@RequestMapping("/api")
public class FoodsController {
    @Autowired
        FoodsService foodService;

    @RequestMapping(value="/foods", method=RequestMethod.POST)
    public Foods createFood(@RequestBody Foods food) {
        return foodService.createFood(food);
    }

    @RequestMapping(value="/foods", method=RequestMethod.GET)
    public List<Foods> getFoods() {
        return foodService.getFoods();
    }

    @RequestMapping(value="/foods/{foodId}", method=RequestMethod.PUT)
    public Foods updateFood(@PathVariable(value="foodId") Integer id, @RequestBody Foods foodDetails) {
        return foodService.updateFood(id, foodDetails);
    }

    @RequestMapping(value="/foods/{foodId}", method = RequestMethod.DELETE)
    public void deleteFood(@PathVariable(value="foodId") Integer id) {
        foodService.deleteFood(id);
    }

}
