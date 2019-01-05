package com.ia.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Document(collection = "analysiskeyword")
public class AnalysisKeyword implements Serializable {
    @Id
    @NotNull
    private String id;

    private String AnalisisId;

    private String Keyword;

    private Integer Total;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAnalisisId() {
        return AnalisisId;
    }

    public void setAnalisisId(String analisisId) {
        AnalisisId = analisisId;
    }

    public String getKeyword() {
        return Keyword;
    }

    public void setKeyword(String keyword) {
        Keyword = keyword;
    }

    public Integer getTotal() {
        return Total;
    }

    public void setTotal(Integer total) {
        Total = total;
    }
}
