package com.example.note_nest_memo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CountDownLatch;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.example.note_nest_memo.dtoPlayloads.notesDto;
import com.example.note_nest_memo.service.serviceImp.NoteServiceImp;

@CrossOrigin
@RestController
@RequestMapping("/api/notes")
public class NotesController {
	
	@Autowired
	private NoteServiceImp noteServiceImp;
	
	private int count = 0;
	@RequestMapping( value = "/create/{userId}" , method = RequestMethod.POST)
	public ResponseEntity<Object> createNotes( @RequestBody notesDto notesDto , @PathVariable String userId ){
		
		notesDto note = noteServiceImp.createNotes(notesDto, userId);
		 Map<String, Object> response = new HashMap<>();
	       response.put("message", "You Crafted off Your Notes Without Any Issues!");
	        response.put("Your Note Descriptions:", note);
	        response.put("count", ++count);
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	
	@RequestMapping( value = "/update/{notesId}" , method = RequestMethod.PUT)
	public ResponseEntity<Object> updateNotes( @RequestBody notesDto notesDto , @PathVariable Integer notesId ){
		
		notesDto updatedNote = noteServiceImp.updateNote(notesDto, notesId);
	    Map<String, Object> response = new HashMap<>();
        response.put("message", "Note Flawlessly Updated!");
        response.put("updatedNote", updatedNote);
        response.put("success", true);
        return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@RequestMapping( value = "/delete/{notesId}" , method = RequestMethod.DELETE)
	public ResponseEntity<Map<String, Object>> deleteNotes( @PathVariable Integer notesId ){
	   noteServiceImp.deleteNote(notesId);
	
	   Map<String, Object> response = new HashMap<>();
	   response.put("message", "note was obsequitously deleted!");
	   response.put("success", true);
	   response.put("status", HttpStatus.OK.value());
	   // just for tranquility , we can also handle this graciously by creating Api(request) or whatever new Obj
	   return new ResponseEntity<>(response , HttpStatus.OK);
	}
	
	@RequestMapping( value = "/selectUser/{userId}" , method = RequestMethod.GET)
    public ResponseEntity<List<notesDto>> getNotesByUser(@PathVariable String userId){
        List<notesDto> Note=noteServiceImp.getNoteByUser(userId);
        return new ResponseEntity<List<notesDto>>(Note,HttpStatus.OK);
    }
	
	@RequestMapping( value = "/select/{notesId}" , method = RequestMethod.GET)
    public ResponseEntity<notesDto> getNoteById(@PathVariable Integer notesId){
        notesDto note = noteServiceImp.getNote(notesId);
        return new ResponseEntity<notesDto>(note , HttpStatus.ACCEPTED);
    }
	
    @RequestMapping(value = "/" , method = RequestMethod.GET)
    @CrossOrigin
    public ResponseEntity<List<notesDto>> getNotes(){
        List<notesDto> Note = noteServiceImp.getAllNote();
        return new ResponseEntity<List<notesDto>>(Note,HttpStatus.OK);
    }
    
}
