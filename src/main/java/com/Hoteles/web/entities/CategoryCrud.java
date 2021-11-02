/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Hoteles.web.entities;

import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author danic
 */
public interface CategoryCrud extends CrudRepository<Category, Integer>{
    
}
