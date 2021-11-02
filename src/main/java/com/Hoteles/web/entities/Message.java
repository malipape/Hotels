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
@Entity
@Table(name="message")

public class Message implements Serializable {
        @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer idMessage;
        private String messageText;

    @ManyToOne
    @JoinColumn(name ="Room")
    @JsonIgnoreProperties({"messages","reservations"})
    private Room room;
        
    @ManyToOne
    @JoinColumn(name ="Client")
    @JsonIgnoreProperties({"messages","reservations"})
    private Client client;
    


    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    
    
    public Integer getIdMessage() {
        return idMessage;
    }

    public void setIdMessage(Integer idMessage) {
        this.idMessage = idMessage;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
        
        
        
}
