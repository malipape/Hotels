/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Hoteles.web.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author danic
 */

/**
* clase motorbikes
*/
@Entity
@Table (name = "room")
public class Room implements Serializable {
/**
* atributo principal o llave principal
*/
    @Id 
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
/**
* atributo nombre
*/
    private String name;
/**
* atributo hotel
*/
    private String hotel;
/**
* atributo stars
*/
    private Integer stars;
/**
* atributo descripcion
*/
    private String description;

/**
* atriubto llave foranea ctaegory
*/  
    @ManyToOne
    @JoinColumn(name ="Category")
    @JsonIgnoreProperties("rooms")
    private Category category;
    
/**
* lista de mensajes
*/    
     @OneToMany(cascade = {CascadeType.PERSIST},mappedBy="room")
     @JsonIgnoreProperties({"room","client"})
     private List<Message> messages;
/**
* lista de reervaciones
*/     
     @OneToMany(cascade = {CascadeType.PERSIST},mappedBy="room")
     @JsonIgnoreProperties({"room","client"})
     private List<Reservation> reservations;

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }
     
     

     
     
    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Integer getStars() {
        return stars;
    }

    public void setStars(Integer stars) {
        this.stars = stars;
    }

 
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


 

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
  

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHotel() {
        return hotel;
    }

    public void setHotel(String hotel) {
        this.hotel = hotel;
    }


    

    
}
