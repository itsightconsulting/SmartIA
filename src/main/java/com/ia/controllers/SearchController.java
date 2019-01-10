package com.ia.controllers;

import com.ia.document.Analysis;
import com.ia.document.Data;
import com.ia.repository.AnalysisMongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
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

    @PostMapping("/addAnalysis")
    public Data addAnalysis(@RequestBody Analysis value) {

        Data result = new Data();

        Analysis a = new Analysis();
        a.setNameKey(value.getNameKey());
        a.setStartDateAnalysis(new Date());
        a.setOriginAnalysis(1);
        a.setStateAnalysis(1);
        analysisMongoRepository.insert(a);

        result.setId(a.getId());

        return result;
    }



    @RequestMapping(value = "/getAnalysis/{value}", method = RequestMethod.GET)
    @ResponseBody
    public Data getAnalysis(@PathVariable("value") String value) {
        Data ent = new Data();
        Analysis analysis = analysisMongoRepository.findById(value);

        if (analysis != null) {
            if(analysis.getStateAnalysis() == 1){ // Registrado
                ent.setState("Buscando análisis ...");
                ent.setFlagListo(false);
                ent.setEntity(null);
            }else if(analysis.getStateAnalysis() == 2){ // DatosRecolectados
                ent.setState("Recolectando datos del Análisis...");
                ent.setFlagListo(false);
                ent.setEntity(null);
            }else if(analysis.getStateAnalysis() == 3){ // AnalisisSemantico
                ent.setState("Recolectando datos Semanticos del Análisis...");
                ent.setFlagListo(false);
                ent.setEntity(null);
            }else if(analysis.getStateAnalysis() == 4){ // Completado
                ent.setState("Datos completados...");
                ent.setFlagListo(true);
                ent.setEntity(analysis);
            }
        }else{
            ent.setState("No encontrado");
            ent.setFlagListo(false);
            ent.setEntity(null);
        }

        return ent;
    }



}
