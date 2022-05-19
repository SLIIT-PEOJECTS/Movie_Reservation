package com.movie_reservation.ds_assignment.controller;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.movie_reservation.ds_assignment.model.Login;
import com.movie_reservation.ds_assignment.model.ManagerUser;
import com.movie_reservation.ds_assignment.model.Token;
import com.movie_reservation.ds_assignment.repository.ManagerUserRepository;
import com.movie_reservation.ds_assignment.service.Impl.ManagerServiceImpl;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/manager")
public class ManagerUserController {

    @Autowired
    ManagerUserRepository managerUserRepository;

    public void sendEmail(String emailAddress, String password) throws UnirestException {
        try {
            HttpResponse<String> response = Unirest.post("http://localhost:8290/email/send")
                    .header("content-type", "application/json")
                    .body("{\n" +
                            "    \"from\": \"isurupathumherath1@gmail.com\",\n" +
                            "    \"to\": \"" + emailAddress + " \",\n" +
                            "    \"subject\": \"Sample email\",\n" +
                            "    \"content\": \"Hi, \n\nPlease find your username and password mentioned below.\n\n   Username: " + emailAddress + "\n   Password: " + password + "\n\nIf you have any login issue, please contact admin - 0761714844\n\nThank You and Best Regards\nAutomated Mail System\n@isurupathumherath \",\n" +
                            "    \"contentType\":\"text/plain\"\n" +
                            "}")
                    .asString();
            System.out.println(response.getBody());
            JSONObject json = new JSONObject(response.getBody());
            System.out.println(json);
        } catch (UnirestException e) {
            e.printStackTrace();
        }
    }

    @GetMapping("/token")
    public ResponseEntity<Token> getToken() {
        try{
            HttpResponse<String> response = Unirest.post("https://jwt-isuru-sliit-3rd.us.auth0.com/oauth/token")
                    .header("content-type", "application/x-www-form-urlencoded")
                    .body("grant_type=client_credentials&client_id=Q6zAhKoAYH4Liz9qcj80ivXSduCCn6vT&client_secret=712flzzjz_2do6XCUiXbyNI2Dgj32oZ5Y3aG8DjBf9Ht52x34jDlofoUV8gi3oiE&audience=http://localhost:8081/")
                    .asString();

            JSONObject json = new JSONObject(response.getBody());
            String accessToken = json.getString("access_token");
            System.out.println("Response: " + accessToken);
            Token token = new Token();
            token.setResponse(accessToken);
            return new ResponseEntity<>(token, HttpStatus.OK);
        }catch(Exception e){
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);

        }
    }

    /*
        Method - Create Manager
        By - Isuru Pathum Herath
    */

    @PostMapping("/")
    public ResponseEntity<ManagerUser> createManager(@RequestBody ManagerUser managerUser) {
        try {
            ManagerServiceImpl managerService = new ManagerServiceImpl();
            String username = managerUser.getFirstName()+managerUser.getLastName();
            String password = managerService.generatePassayPassword();

            sendEmail(managerUser.getEmail(), password);

            ManagerUser managerList = managerUserRepository.save(new ManagerUser(managerUser.getId(), managerUser.getFirstName(), managerUser.getMiddleName(), managerUser.getLastName(), managerUser.getMobileNumber(), managerUser.getEmail(), managerUser.getDOB(), managerUser.getNIC(), managerUser.getAddress(), managerUser.getType(), managerUser.getAccountStatus(), managerUser.getProfileURL(), password));
            return new ResponseEntity<>(managerList, HttpStatus.CREATED);
        }
        catch(DuplicateKeyException e) {
            System.out.println("Error :- " + e);
            return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
        }
        catch (Exception e) {
            System.out.println("Error :- " + e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ManagerUser> loginManager(@RequestBody Login login) throws UnirestException {
        System.out.println("Email: " + login.getEmail());
        System.out.println("Passowrd: " + login.getPassword());

        Optional<ManagerUser> managerUser = managerUserRepository.findByEmailAndPassword(login.getEmail(), login.getPassword());
        if (managerUser.isPresent()) {
            return new ResponseEntity<>(managerUser.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    /*
        Method - Get All Manager
        By - Isuru Pathum Herath
    */

    @GetMapping("/")
    public ResponseEntity<List<ManagerUser>> getAllManager(@RequestParam(required = false) String title) {
        try {
            List<ManagerUser> manager = new ArrayList<ManagerUser>();
            if (title == null)
                managerUserRepository.findAll().forEach(manager::add);
            else
                managerUserRepository.findByFirstNameContaining(title).forEach(manager::add);
            if (manager.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(manager, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*
        Method - Get Manager by Id
        By - Isuru Pathum Herath
    */

    @GetMapping("/{id}")
    public ResponseEntity<ManagerUser> getManagerById(@PathVariable("id") String id) {
        Optional<ManagerUser> managerUser = managerUserRepository.findById(id);
        if (managerUser.isPresent()) {
            return new ResponseEntity<>(managerUser.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    /*
        Method - Update Manager
        By - Isuru Pathum Herath
    */

    @PutMapping("/{id}")
    public ResponseEntity<ManagerUser> updateMovie(@PathVariable("id") String id, @RequestBody ManagerUser managerUser) {
        Optional<ManagerUser> managerData = managerUserRepository.findById(id);
        if (managerData.isPresent()) {
            ManagerUser managerList = managerData.get();
            managerList.setFirstName(managerUser.getFirstName());
            managerList.setMiddleName(managerUser.getMiddleName());
            managerList.setLastName(managerUser.getLastName());
            managerList.setMobileNumber(managerUser.getMobileNumber());
            managerList.setEmail(managerUser.getEmail());
            managerList.setDOB(managerUser.getDOB());
            managerList.setNIC(managerUser.getNIC());
            managerList.setAddress(managerUser.getAddress());
            managerList.setType(managerUser.getType());
            managerList.setAccountStatus(managerUser.getAccountStatus());
            managerList.setProfileURL(managerUser.getProfileURL());
            managerList.setPassword(managerUser.getPassword());
            return new ResponseEntity<>(managerUserRepository.save(managerList), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /*
      Method - Delete Manager by Id
      By - Isuru Pathum Herath
    */

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteManager(@PathVariable("id") String id) {
        try {
            managerUserRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*
      Method - Delete All Managers
      By - Isuru Pathum Herath
    */

    @DeleteMapping("/")
    public ResponseEntity<HttpStatus> deleteAllManagers() {
        try {
            managerUserRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*
      Method - Get by Type
      By - Isuru Pathum Herath
    */

    @GetMapping("/type")
    public ResponseEntity<List<ManagerUser>> findByAvailability() {
        try {
            List<ManagerUser> managerUsers = managerUserRepository.findByType("active");
            if (managerUsers.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(managerUsers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
