package com.gym.app.service;

import com.gym.app.dto.LoginRequest;
import com.gym.app.dto.RegisterRequest;
import com.gym.app.entity.User;
import com.gym.app.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(RegisterRequest req) {
        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPhone(req.getPhone());
        user.setPassword(req.getPassword());  // plain text for now (can hash later)
        user.setRole(req.getRole());
        user.setSpecialization(req.getSpecialization());
        user.setExperience(req.getExperience());
        user.setCertification(req.getCertification());
        return userRepository.save(user);
    }

    public User login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail());
        if (user == null) {
            return null; // email not found
        }

        if (!user.getPassword().equals(req.getPassword())) {
            return null; // wrong password
        }

        return user;
    }
}
