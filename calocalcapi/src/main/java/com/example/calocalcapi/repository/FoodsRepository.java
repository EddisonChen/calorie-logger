package com.example.calocalcapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.calocalcapi.model.Foods;

@Repository
public interface FoodsRepository extends JpaRepository <Foods, Integer>{

}
