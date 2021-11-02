/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Hoteles.web.dao;

import com.Hoteles.web.entities.Client;
import com.Hoteles.web.entities.CountClients;
import com.Hoteles.web.entities.Reservation;
import com.Hoteles.web.entities.ReservationCrud;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author danic
 */
@Repository
public class ReservationRepository {
    @Autowired
  private ReservationCrud reservationCrudRepository;
  
  public List<Reservation> getAll(){return (List<Reservation>) reservationCrudRepository.findAll();};
  
  public Optional<Reservation> getReservation(int id) {return reservationCrudRepository.findById(id);};
  
  public Reservation save(Reservation reservation){ return reservationCrudRepository.save(reservation);};
    
   public void delete(Reservation reservation) {reservationCrudRepository.delete(reservation);};
   public List<Reservation> ReservacionStatusRepositorio (String status){
         return reservationCrudRepository.findAllByStatus(status);
     }
     
     public List<Reservation> ReservacionTiempoRepositorio (Date a, Date b){
         return reservationCrudRepository.findAllByStartDateAfterAndStartDateBefore(a, b);
     
     }
     
     public List<CountClients> getClientesRepositorio(){
         List<CountClients> res = new ArrayList<>();
         List<Object[]> report = reservationCrudRepository.countTotalReservationByClient();
         for(int i=0; i<report.size(); i++){
             res.add(new CountClients((Long)report.get(i)[1],(Client) report.get(i)[0]));
         }
         return res;
     }

}