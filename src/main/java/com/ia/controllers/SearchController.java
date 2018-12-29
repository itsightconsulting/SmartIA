package com.ia.controllers;

import com.ia.document.Analysis;
import com.ia.repository.AnalysisMongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SearchController {

    @Autowired
    AnalysisMongoRepository analysisMongoRepository;


    @RequestMapping(method= RequestMethod.GET, value="/getAnalysis")
    public List<Analysis> listAnalysis() {
        return analysisMongoRepository.findAll();
    }



}
