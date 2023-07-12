package com.example.calocalcapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.calocalcapi.model.Users;

import java.util.Optional;

// This is my UsersRepository class, which contains one custom method to find a user by their Id

@Repository
public interface UsersRepository extends JpaRepository<Users, String>{
    Optional <Users> findById(String id);
}
