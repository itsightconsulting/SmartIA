package com.ia.document;


public class Data {

    private Boolean FlagListo;
    private String State;
    private Analysis Entity;
    private String Id;

    public String getId() {
        return Id;
    }

    public void setId(String id) {
        Id = id;
    }

    public Analysis getEntity() {
        return Entity;
    }

    public void setEntity(Analysis entity) {
        Entity = entity;
    }

    public Boolean getFlagListo() {
        return FlagListo;
    }

    public void setFlagListo(Boolean flagListo) {
        FlagListo = flagListo;
    }

    public String getState() {
        return State;
    }

    public void setState(String state) {
        State = state;
    }

}
