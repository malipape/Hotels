/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Hoteles.web.service;

import com.Hoteles.web.dao.ReservationRepository;
import com.Hoteles.web.entities.CountClients;
import com.Hoteles.web.entities.Reservation;
import com.Hoteles.web.entities.StatusReservation;
import java.text.ParseException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;


/**
 *
 * @author danic
 */
@Service
public class ReservationService {
    @Autowired
    
/**
* metodo borrar reservacion
*/  
    
    ReservationRepository reservationRepository;


/**
* metodo borrar reservacion
*/  
    
  public List<Reservation> getAll() {return (List<Reservation>) reservationRepository.getAll();};
  
/**
* metodo borrar reservacion
*/  
    
  public Optional<Reservation> getReservation(int id) {return reservationRepository.getReservation(id);};
  
  
/**
* metodo borrar reservacion
*/  
    
  public Reservation save(Reservation reservation) { 
       if (reservation.getIdReservation()== null){
           return reservationRepository.save(reservation);
       }
       else
       {
          Optional<Reservation> co =  reservationRepository.getReservation(reservation.getIdReservation());
          if (co.isEmpty()){
              return reservationRepository.save(reservation);
          }
          else
          {
              return reservation;
          }
       }
 
    }

/**
* metodo borrar reservacion
*/  
    
      public Reservation update (Reservation reservation){
        if (reservation.getIdReservation() != null){
            Optional<Reservation> e = reservationRepository.getReservation(reservation.getIdReservation());
            if (!e.isEmpty()){
                if (reservation.getStartDate()!= null){
                    e.get().setStartDate(reservation.getStartDate());
                }
                if (reservation.getDevolutionDate()!= null){
                    e.get().setDevolutionDate(reservation.getDevolutionDate());
                }
                if (reservation.getStatus()!= null){
                    e.get().setStatus(reservation.getStatus());
                }
                reservationRepository.save(e.get());
                return e.get();
            }
            else
            {
                return reservation;
            }
        }
        else
        {
            return reservation;
        }
    }

/**
* metodo borrar reservacion
*/    
  public boolean deleteReservation (int id){
      Boolean aBoolean = getReservation(id).map(
              reservation->{
            reservationRepository.delete(reservation);
            return true;
        }).orElse(false);
        return aBoolean;
   
  }
  
  public StatusReservation reporteStatusServicio (){
        List<Reservation>completed= reservationRepository.ReservacionStatusRepositorio("completed");
        List<Reservation>cancelled= reservationRepository.ReservacionStatusRepositorio("cancelled");
        
        return new StatusReservation(completed.size(), cancelled.size() );
    }
  
  public List<Reservation> reporteTiempoServicio (String datoA, String datoB){
        SimpleDateFormat parser = new SimpleDateFormat ("yyyy-MM-dd");
        
        Date datoUno = new Date();
        Date datoDos = new Date();
        
        try{
             datoUno = parser.parse(datoA);
             datoDos = parser.parse(datoB);
        }catch(ParseException evt){
            evt.printStackTrace();
        }if(datoUno.before(datoDos)){
            return reservationRepository.ReservacionTiempoRepositorio(datoUno, datoDos);
        }else{
            return new ArrayList<>();
        
        } 
    }
  
  public List<CountClients> reporteClientesServicio(){
            return reservationRepository.getClientesRepositorio();
        }

  
  

  
  

  
  
  
}