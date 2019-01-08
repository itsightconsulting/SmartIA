package com.ia.document;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

@Document(collection = "analysisitem")
public class AnalysisItem  implements Serializable {
    @Id
    @NotNull
    private String id;

    private String AnalisisId;

    private Integer OrigenAnalisisId;

    private String ObjId;

    private String ObjDetalle;

    private String ObjDetalleAPI;

    private Boolean FlagProcesado;

    //Asociados a Twitter
    private Integer TweetTotalFavoritos;

    private Integer TweetTotalReteweet;

    private String TweetUsuarioId;

    private String TweetScreenName;

    private Integer TweetOrigen;

    private String TweetSource;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd/MM/yyyy HH:mm")
    private Date TweetFecha;

    private String TweetFullText;

    private String SentimentLabel;

    private Double SentimentScore;

    private Integer SentimentId;

    private Integer MotorAI;

    private Integer TweetSearchFiltersId;

    public Integer getTweetSearchFiltersId() {
        return TweetSearchFiltersId;
    }

    public void setTweetSearchFiltersId(Integer tweetSearchFiltersId) {
        TweetSearchFiltersId = tweetSearchFiltersId;
    }

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

    public Integer getOrigenAnalisisId() {
        return OrigenAnalisisId;
    }

    public void setOrigenAnalisisId(Integer origenAnalisisId) {
        OrigenAnalisisId = origenAnalisisId;
    }

    public String getObjId() {
        return ObjId;
    }

    public void setObjId(String objId) {
        ObjId = objId;
    }

    public String getObjDetalle() {
        return ObjDetalle;
    }

    public void setObjDetalle(String objDetalle) {
        ObjDetalle = objDetalle;
    }

    public String getObjDetalleAPI() {
        return ObjDetalleAPI;
    }

    public void setObjDetalleAPI(String objDetalleAPI) {
        ObjDetalleAPI = objDetalleAPI;
    }

    public Boolean getFlagProcesado() {
        return FlagProcesado;
    }

    public void setFlagProcesado(Boolean flagProcesado) {
        FlagProcesado = flagProcesado;
    }

    public Integer getTweetTotalFavoritos() {
        return TweetTotalFavoritos;
    }

    public void setTweetTotalFavoritos(Integer tweetTotalFavoritos) {
        TweetTotalFavoritos = tweetTotalFavoritos;
    }

    public Integer getTweetTotalReteweet() {
        return TweetTotalReteweet;
    }

    public void setTweetTotalReteweet(Integer tweetTotalReteweet) {
        TweetTotalReteweet = tweetTotalReteweet;
    }

    public String getTweetUsuarioId() {
        return TweetUsuarioId;
    }

    public void setTweetUsuarioId(String tweetUsuarioId) {
        TweetUsuarioId = tweetUsuarioId;
    }

    public String getTweetScreenName() {
        return TweetScreenName;
    }

    public void setTweetScreenName(String tweetScreenName) {
        TweetScreenName = tweetScreenName;
    }

    public Integer getTweetOrigen() {
        return TweetOrigen;
    }

    public void setTweetOrigen(Integer tweetOrigen) {
        TweetOrigen = tweetOrigen;
    }

    public String getTweetSource() {
        return TweetSource;
    }

    public void setTweetSource(String tweetSource) {
        TweetSource = tweetSource;
    }

    public Date getTweetFecha() {
        return TweetFecha;
    }

    public void setTweetFecha(Date tweetFecha) {
        TweetFecha = tweetFecha;
    }

    public String getTweetFullText() {
        return TweetFullText;
    }

    public void setTweetFullText(String tweetFullText) {
        TweetFullText = tweetFullText;
    }

    public String getSentimentLabel() {
        return SentimentLabel;
    }

    public void setSentimentLabel(String sentimentLabel) {
        SentimentLabel = sentimentLabel;
    }

    public Double getSentimentScore() {
        return SentimentScore;
    }

    public void setSentimentScore(Double sentimentScore) {
        SentimentScore = sentimentScore;
    }

    public Integer getSentimentId() {
        return SentimentId;
    }

    public void setSentimentId(Integer sentimentId) {
        SentimentId = sentimentId;
    }

    public Integer getMotorAI() {
        return MotorAI;
    }

    public void setMotorAI(Integer motorAI) {
        MotorAI = motorAI;
    }
}
