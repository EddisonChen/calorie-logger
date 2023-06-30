package com.example.calocalcapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.calocalcapi.model.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users, String>{
}
