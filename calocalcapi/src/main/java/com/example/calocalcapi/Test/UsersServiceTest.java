package com.example.calocalcapi.Test;

import com.example.calocalcapi.model.Users;
import com.example.calocalcapi.repository.UsersRepository;
import com.example.calocalcapi.service.UsersService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;

@RunWith(MockitoJUnitRunner.class)
public class UsersServiceTest {
    @Mock
    private UsersRepository userRepo;

    @InjectMocks
    private UsersService userService;

    @Test
    public void testGetUsers() {
        List<Users> expectedUsers = Arrays.asList(new Users(), new Users());
        Mockito.when(userRepo.findAll()).thenReturn(expectedUsers);

        List<Users> result = userService.getUsers();

        assertEquals(expectedUsers, result);
        Mockito.verify(userRepo, Mockito.times(1)).findAll();
    }

    @Test
    public void testGetUserById() {
        Users expectedUser = new Users();
        String userId = "google-oauth2|104050536160927924755";

        Mockito.when(userRepo.findById(userId)).thenReturn(Optional.of(expectedUser));

        userService.getUserById(userId);

        Mockito.verify(userRepo, Mockito.times(1)).findById(userId);
    }
}
