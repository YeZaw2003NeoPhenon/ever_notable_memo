package com.example.note_nest_memo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.note_nest_memo.dtoPlayloads.userDto;
import com.example.note_nest_memo.service.serviceImp.UserServiceImp;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {
	
	@Autowired
	private UserServiceImp userServiceImp;
	private int count = 0;
	
	@RequestMapping( value = "/create" , method = RequestMethod.POST , produces = MediaType.APPLICATION_JSON_VALUE , consumes  = MediaType.APPLICATION_JSON_VALUE)
	    public ResponseEntity<Object> createUser(@RequestBody userDto user){
	    Map<String, Object> response = new HashMap<>();
	    response.put("message", "You Salubriously Created User!");
	    response.put("success", true);
	    response.put("count", ++count);
	    userServiceImp.createUser(user);
	        return ResponseEntity.status(HttpStatus.CREATED).body(response);
	  }
	
	@RequestMapping( value = "/update/{userId}" , method = RequestMethod.PUT , produces = MediaType.APPLICATION_JSON_VALUE , consumes  = MediaType.APPLICATION_JSON_VALUE)
	    public ResponseEntity<Object> updateUser(@PathVariable Integer userId , @RequestBody userDto user){
	       userDto updatedUser = userServiceImp.updateUser(userId, user);
		    Map<String, Object> response = new HashMap<>();
	        response.put("message", "Note Flawlessly Updated!");
	        response.put("updatedNote", updatedUser);
	        response.put("success", true);
	        return ResponseEntity.status(HttpStatus.OK).body(response);
	  }
	
	  @RequestMapping( value = "/delete/{userId}" , method = RequestMethod.DELETE,produces = MediaType.APPLICATION_JSON_VALUE )
	    public ResponseEntity<String> deleteUser(@PathVariable Integer userId){
	        userServiceImp.deleteUser(userId);
	        return ResponseEntity.ok("User deleted successfully");
	  }
	  
	   @RequestMapping( value = "/select/{userId}" , method = RequestMethod.GET)
	    public ResponseEntity<userDto> getUser(@PathVariable Integer userId){
	        userDto userDto =  userServiceImp.getUser(userId);
	        return ResponseEntity.ok(userDto);
	    }
	    
	    @RequestMapping( value = "/" , method = RequestMethod.GET ,produces = MediaType.APPLICATION_JSON_VALUE , consumes  = MediaType.APPLICATION_JSON_VALUE)
	    public ResponseEntity<List<userDto>> getAllUsers(){
	        List<userDto> userDtos =  userServiceImp.getAllUsers();
	        return ResponseEntity.ok(userDtos);
	    }
	    
	    @RequestMapping(value = "/login" , method =  RequestMethod.POST ,produces = MediaType.APPLICATION_JSON_VALUE)
	    public ResponseEntity<Map<String, Object>> userLogin(@RequestBody Map<String , String> loginBody){
	    	   Map<String, Object> response = new HashMap<>();
	        try {
	        	userDto apiRes = userServiceImp.userLogin(loginBody.get("email"), loginBody.get("password"));
		    	   response.put("Plugged In User Datas:", apiRes);
		    	   response.put("message", "User Logged In Vicariously!");
		    	   response.put("success", true);
		    	   response.put("status", HttpStatus.OK.value());
	            return new ResponseEntity<>(response , HttpStatus.OK);
	            
	        } catch (Exception e) {
	        	  response.put("message", "Invalid email or password");
	              response.put("success", false);
	              response.put("status", HttpStatus.UNAUTHORIZED.value());
	              return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
	        }
	        
	    }
	
}
