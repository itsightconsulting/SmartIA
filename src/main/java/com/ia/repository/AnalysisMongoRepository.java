package com.ia.repository;


import com.ia.document.Analysis;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.io.Serializable;
import java.util.List;

@Repository
@CrossOrigin(value = {})
public interface AnalysisMongoRepository extends MongoRepository<Analysis, Serializable> {

    List<Analysis> findAllByNameKey(String key);

    Analysis findByNameKey(String key);

    Analysis findById(String id);

}
