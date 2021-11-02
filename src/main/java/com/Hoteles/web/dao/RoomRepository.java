/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Hoteles.web.dao;

import com.Hoteles.web.entities.Room;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.Hoteles.web.entities.RoomCrud;

/**
 *
 * @author danic
 */

@Repository
public class RoomRepository {
    @Autowired
  private RoomCrud roomCrudRepository;
  
  public List<Room> getAll(){return (List<Room>) roomCrudRepository.findAll();};
  
  public Optional<Room> getRoom(int id) {return roomCrudRepository.findById(id);};
  
  public Room save(Room room){ return roomCrudRepository.save(room);};
    
  public void delete(Room room ) {roomCrudRepository.delete(room);};
}
