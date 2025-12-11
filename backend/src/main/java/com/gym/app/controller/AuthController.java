package com.gym.app.controller;

import com.gym.app.dto.LoginRequest;
import com.gym.app.dto.RegisterRequest;
import com.gym.app.entity.User;
import com.gym.app.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request) {
        User user = userService.login(request);
        if (user == null) {
            throw new RuntimeException("Invalid email or password");
        }
        return user;
    }
}
