package com.example.calocalcapi.Test;

import com.example.calocalcapi.model.Foods;
import com.example.calocalcapi.repository.FoodsRepository;
import com.example.calocalcapi.service.FoodsService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.time.LocalDate;

import static org.junit.Assert.assertEquals;


@RunWith(MockitoJUnitRunner.class)
public class FoodsServiceTest {
    @Mock
    private FoodsRepository foodRepo;

    @InjectMocks
    private FoodsService foodService;

    @Test
    public void testGetFoods() {
        String userId = "google-oauth2|104050536160927924755";
        List<Foods> expectedFoods = Arrays.asList(new Foods(), new Foods());
        Mockito.when(foodRepo.findAllByUserId(userId)).thenReturn(expectedFoods);

        List<Foods> result = foodService.getFoods(userId);

        assertEquals(expectedFoods, result);
        Mockito.verify(foodRepo, Mockito.times(1)).findAllByUserId(userId);
    }

    @Test
    public void testDeleteFood() {
        String userId = "google-oauth2|104050536160927924755";
        Integer foodId = 2;
        Foods food = new Foods();
        food.setId(2);

        Mockito.when(foodRepo.findByIdAndUserId(foodId, userId)).thenReturn(Optional.of(food));
        foodService.deleteFood(foodId, userId);
        Mockito.verify(foodRepo, Mockito.times(1)).deleteByIdAndUserId(foodId, userId);
    }

    @Test
    public void testUpdateFood() {
        String userId = "google-oauth2|104050536160927924755";
        Integer foodId = 2;
        Foods food = new Foods();
        food.setId(2);

        Mockito.when(foodRepo.findByIdAndUserId(foodId, userId)).thenReturn(Optional.of(food));
        foodService.updateFood(foodId, userId, food);
        Mockito.verify(foodRepo, Mockito.times(1)).findByIdAndUserId(foodId, userId);
    }

    @Test
    public void testGetFoodsByDate() {
        String userId = "google-oauth2|104050536160927924755";
        LocalDate date = LocalDate.of(2023, 07, 10);
        List<Foods> expectedFoods = Arrays.asList(new Foods(), new Foods());

        Mockito.when(foodRepo.findAllByUserIdAndDate(userId, date)).thenReturn(expectedFoods);

        List<Foods> actualFoods = foodService.getFoodsByDate(userId, date);

        assertEquals(expectedFoods, actualFoods);

        Mockito.verify(foodRepo, Mockito.times(1)).findAllByUserIdAndDate(userId, date);


    }
}
