package com.ia.document;


import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Document(collection = "analysis")
public class Analysis implements Serializable {
    @Id
    @NotNull
    private String id;

    @NotNull
    private String nameKey;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
    private Date startDateAnalysis;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
    private Date endDateAnalysis;

    private Integer stateAnalysis;

    private Integer originAnalysis;

    private List<AnalysisItem> listDetails;

    private List<AnalysisHashtag> listHashtags;

    private List<UserTwitter> listUser;

    private List<AnalysisKeyword> listKeys;


    public List<AnalysisKeyword> getListKeys() {
        return listKeys;
    }

    public void setListKeys(List<AnalysisKeyword> listKeys) {
        this.listKeys = listKeys;
    }

    public List<AnalysisItem> getListDetails() {
        return listDetails;
    }

    public void setListDetails(List<AnalysisItem> listDetails) {
        this.listDetails = listDetails;
    }

    public List<AnalysisHashtag> getListHashtags() {
        return listHashtags;
    }

    public void setListHashtags(List<AnalysisHashtag> listHashtags) {
        this.listHashtags = listHashtags;
    }

    public List<UserTwitter> getListUser() {
        return listUser;
    }

    public void setListUser(List<UserTwitter> listUser) {
        this.listUser = listUser;
    }

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
