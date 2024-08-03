package com.example.note_nest_memo.model;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
	
    private Integer id;
    private String name;
    private String email;
    private String password;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp created_at;
    
    private List<Notes> notes = new ArrayList<>();
}
