package com.ia.document;

import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.function.BinaryOperator;

@Document(collection = "usertwitter")
public class UserTwitter implements Serializable {
    @Id
    @NotNull
    private String id;

    private String TweetUsuarioId;

    private String TweetScreenName;

    private String Nombre;

    private String Descripcion;

    private Integer Sexo;

    private String Avatar;

    private Integer TotalSeguidores;

    private Boolean CuentaVerificada;

    private String ObjDetalleAPI;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getNombre() {
        return Nombre;
    }

    public void setNombre(String nombre) {
        Nombre = nombre;
    }

    public String getDescripcion() {
        return Descripcion;
    }

    public void setDescripcion(String descripcion) {
        Descripcion = descripcion;
    }

    public Integer getSexo() {
        return Sexo;
    }

    public void setSexo(Integer sexo) {
        Sexo = sexo;
    }

    public String getAvatar() {
        return Avatar;
    }

    public void setAvatar(String avatar) {
        Avatar = avatar;
    }

    public Integer getTotalSeguidores() {
        return TotalSeguidores;
    }

    public void setTotalSeguidores(Integer totalSeguidores) {
        TotalSeguidores = totalSeguidores;
    }

    public Boolean getCuentaVerificada() {
        return CuentaVerificada;
    }

    public void setCuentaVerificada(Boolean cuentaVerificada) {
        CuentaVerificada = cuentaVerificada;
    }

    public String getObjDetalleAPI() {
        return ObjDetalleAPI;
    }

    public void setObjDetalleAPI(String objDetalleAPI) {
        ObjDetalleAPI = objDetalleAPI;
    }
}
