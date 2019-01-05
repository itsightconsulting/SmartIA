package com.ia.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Document(collection = "analysishashtag")
public class AnalysisHashtag implements Serializable {
    @Id
    @NotNull
    private String id;

    private String AnalisisId;

    private String Hashtag;

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

    public String getHashtag() {
        return Hashtag;
    }

    public void setHashtag(String hashtag) {
        Hashtag = hashtag;
    }

    public Integer getTotal() {
        return Total;
    }

    public void setTotal(Integer total) {
        Total = total;
    }
}
