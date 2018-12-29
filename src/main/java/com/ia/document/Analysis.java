package com.ia.document;


import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

@Document(collection = "analysis")
public class Analysis implements Serializable {
    @Id
    @NotNull
    private String id;

    @NotNull
    private String nameKey;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd/MM/yyyy")
    private Date startDateAnalysis;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd/MM/yyyy")
    private Date endDateAnalysis;

    private Integer stateAnalysis;

    private Integer originAnalysis;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        id = id;
    }

    public String getNameKey() {
        return nameKey;
    }

    public void setNameKey(String nameKey) {
        this.nameKey = nameKey;
    }

    public Date getStartDateAnalysis() {
        return startDateAnalysis;
    }

    public void setStartDateAnalysis(Date startDateAnalysis) {
        this.startDateAnalysis = startDateAnalysis;
    }

    public Date getEndDateAnalysis() {
        return endDateAnalysis;
    }

    public void setEndDateAnalysis(Date endDateAnalysis) {
        this.endDateAnalysis = endDateAnalysis;
    }

    public Integer getStateAnalysis() {
        return stateAnalysis;
    }

    public void setStateAnalysis(Integer stateAnalysis) {
        this.stateAnalysis = stateAnalysis;
    }

    public Integer getOriginAnalysis() {
        return originAnalysis;
    }

    public void setOriginAnalysis(Integer originAnalysis) {
        this.originAnalysis = originAnalysis;
    }

    public String OriginAnalysisStr() {
        return this.getOriginAnalysis() == 1 ? "Twitter" : "IBM";
    }


    public String StateAnalysisStr() {
        return this.getStateAnalysis() == 1 ? "Process" : "Ending";
    }

}
