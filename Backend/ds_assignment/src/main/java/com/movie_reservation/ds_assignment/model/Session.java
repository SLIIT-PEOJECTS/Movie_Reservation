package com.movie_reservation.ds_assignment.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "session")
@Data

public class Session {

    @Id
    private String sessionID;
    private String sessionName;
    private String fromTime;
    private String toTime;

    public Session(String sessionID, String sessionName, String fromTime, String toTime){
        this.sessionID = sessionID;
        this.sessionName = sessionName;
        this.fromTime = fromTime;
        this.toTime = toTime;
    }

    public String getSessionID() {
        return sessionID;
    }

    public void setSessionID(String sessionID) {
        this.sessionID = sessionID;
    }

    public String getSessionName() {
        return sessionName;
    }

    public void setSessionName(String sessionName) {
        this.sessionName = sessionName;
    }

    public String getFromTime() {
        return fromTime;
    }

    public void setFromTime(String fromTime) {
        this.fromTime = fromTime;
    }

    public String getToTime() {
        return toTime;
    }

    public void setToTime(String toTime) {
        this.toTime = toTime;
    }

}
