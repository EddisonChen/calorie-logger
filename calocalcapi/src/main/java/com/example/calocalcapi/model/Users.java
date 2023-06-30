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

    public List<Foods> getFoods() {
        return foods;
    }

    public void setFoods(List<Foods> foods) {
        this.foods = foods;
    }
}
