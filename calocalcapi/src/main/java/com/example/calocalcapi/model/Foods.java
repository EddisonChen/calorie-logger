package com.example.calocalcapi.model;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name="foods")
public class Foods {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="date")
    private Date date;

    @Column(name="meal_type")
    private String meal_type;

    @Column(name="name")
    private String name;

    @Column(name="amount")
    private Integer amount;

    @Column(name="calories")
    private Integer calories;

    @Column(name="protein")
    private Integer protein;

    @Column(name="carbohydrate")
    private Integer carbohydrate;

    @Column(name="fat")
    private Integer fat;

    @ManyToOne
    @JoinColumn(name="user_id")
    private Users user;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getMeal_type() {
        return meal_type;
    }

    public void setMeal_type(String meal_type) {
        this.meal_type = meal_type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Integer getCalories() {
        return calories;
    }

    public void setCalories(Integer calories) {
        this.calories = calories;
    }

    public Integer getProtein() {
        return protein;
    }

    public void setProtein(Integer protein) {
        this.protein = protein;
    }

    public Integer getCarbohydrate() {
        return carbohydrate;
    }

    public void setCarbohydrate(Integer carbohydrate) {
        this.carbohydrate = carbohydrate;
    }

    public Integer getFat() {
        return fat;
    }

    public void setFat(Integer fat) {
        this.fat = fat;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }
}
