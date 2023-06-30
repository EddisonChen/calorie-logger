package com.example.calocalcapi.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="users")
public class Users {
    @Id
    @Column(name="id")
    private String id;

    @Column(name="name")
    private String name;

    @Column(name="email")
    private String email;

    @Column(name="sex")
    private String sex;

    @Column(name="unit_type")
    private String unit_type;

    @Column(name="height")
    private Integer height;

    @Column(name="weight")
    private Integer weight;

    @Column(name="age")
    private Integer age;

    @Column(name="activity_level")
    private Integer activity_level;

    @Column(name="goal")
    private Integer goal;

    @Column(name="goal_calories")
    private Integer goal_calories;

    @Column(name="goal_protein")
    private Integer goal_protein;

    @Column(name="goal_carbohydrate")
    private Integer goal_carbohydrate;

    @Column(name="goal_fat")
    private Integer goal_fat;

    @OneToMany
    private List<Foods> foods;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getUnit_type() {
        return unit_type;
    }

    public void setUnit_type(String unit_type) {
        this.unit_type = unit_type;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getActivity_level() {
        return activity_level;
    }

    public void setActivity_level(Integer activity_level) {
        this.activity_level = activity_level;
    }

    public Integer getGoal() {
        return goal;
    }

    public void setGoal(Integer goal) {
        this.goal = goal;
    }

    public Integer getGoal_calories() {
        return goal_calories;
    }

    public void setGoal_calories(Integer goal_calories) {
        this.goal_calories = goal_calories;
    }

    public Integer getGoal_protein() {
        return goal_protein;
    }

    public void setGoal_protein(Integer goal_protein) {
        this.goal_protein = goal_protein;
    }

    public Integer getGoal_carbohydrate() {
        return goal_carbohydrate;
    }

    public void setGoal_carbohydrate(Integer goal_carbohydrate) {
        this.goal_carbohydrate = goal_carbohydrate;
    }

    public Integer getGoal_fat() {
        return goal_fat;
    }

    public void setGoal_fat(Integer goal_fat) {
        this.goal_fat = goal_fat;
    }

    public List<Foods> getFoods() {
        return foods;
    }

    public void setFoods(List<Foods> foods) {
        this.foods = foods;
    }
}
