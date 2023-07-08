package com.example.calocalcapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.calocalcapi.model.Foods;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface FoodsRepository extends JpaRepository <Foods, Integer>{
    List<Foods> findAllByUserId(String userId);

    void deleteByIdAndUserId(Integer foodId, String userId);

    Optional<Foods> findByIdAndUserId(Integer foodId, String userId);

    @Query("SELECT f FROM Foods f WHERE f.user.id = :userId AND DATE(f.date) = :date")
    List<Foods> findAllByUserIdAndDate(@Param("userId")String userId, @Param("date")LocalDate date);
}
