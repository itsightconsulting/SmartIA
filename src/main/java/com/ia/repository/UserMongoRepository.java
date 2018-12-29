package com.ia.repository;

import com.ia.document.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.io.Serializable;
import java.util.List;

@Repository
@CrossOrigin(value = {})
public interface UserMongoRepository extends MongoRepository<User, Serializable> {

    @RestResource(path = "name", rel = "name")
    List<User> findByName(@Param("name") String name);


}