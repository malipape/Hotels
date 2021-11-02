/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Hoteles.web.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;

/**
 *
 * @author danic
 */
@Entity
@Table(name="reservation")

public class Reservation implements Serializable {
    

        @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer idReservation;
        
     // @Temporal(javax.persistence.TemporalType.DATE)
        private Date startDate;
        
     // @Temporal(javax.persistence.TemporalType.DATE)
        private Date devolutionDate;
      
        private String status = "created";
        
        
    @ManyToOne
    @JoinColumn(name ="Room")
    @JsonIgnoreProperties("reservations")
    private Room room;
        
    @ManyToOne
    @JoinColumn(name ="Client")
    @JsonIgnoreProperties({"reservations","messages"})
    private Client client;   
    private String score = null;
    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }



    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }
        
        

    
    
    
    public Integer getIdReservation() {
        return idReservation;
    }

    public void setIdReservation(Integer idReservation) {
        this.idReservation = idReservation;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getDevolutionDate() {
        return devolutionDate;
    }

    public void setDevolutionDate(Date devolutionDate) {
        this.devolutionDate = devolutionDate;
    }
       
        
        
        
        
}