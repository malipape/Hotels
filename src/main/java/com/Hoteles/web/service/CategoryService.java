/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Hoteles.web.service;

import com.Hoteles.web.dao.CategoryRepository;
import com.Hoteles.web.entities.Category;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author danic
 */
@Service
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;
    
  public List<Category> getAll() {return (List<Category>) categoryRepository.getAll();};
  
  public Optional<Category> getCategory(int id) {return categoryRepository.getCategory(id);};
  
  public Category save(Category category) { 
       if (category.getId()== null){
           return categoryRepository.save(category);
       }
       else
       {
          Optional<Category> co =  categoryRepository.getCategory(category.getId());
          if (co.isEmpty()){
              return categoryRepository.save(category);
          }
          else
          {
              return category;
          }
       }
 
    }
  
    public Category update (Category category){
        if (category.getId() != null){
            Optional<Category> e = categoryRepository.getCategory(category.getId());
            if (!e.isEmpty()){
                if (category.getName()!= null){
                    e.get().setName(category.getName());
                }
                if (category.getDescription()!= null){
                    e.get().setDescription(category.getDescription());
                }
                
                categoryRepository.save(e.get());
                return e.get();
            }
            else
            {
                return category;
            }
        }
        else
        {
            return category;
        }
    }
  
  public boolean deleteCategory (int id){
   

      
      Boolean aBoolean = getCategory(id).map(
              category->{
            categoryRepository.delete(category);
            return true;
        }).orElse(false);
        return aBoolean;
   
  }
  
}
