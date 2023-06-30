package com.example.calocalcapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.calocalcapi.model.Foods;

import java.util.List;
import java.util.Optional;

@Repository
public interface FoodsRepository extends JpaRepository <Foods, Integer>{
    List<Foods> findAllByUserId(String userId);

    void deleteByIdAndUserId(Integer foodId, String userId);

    Optional<Foods> findByIdAndUserId(Integer foodId, String userId);
}
