package vastra_backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.Data;
import vastra_backend.requestDTO.ChangePasswordRequest;
import vastra_backend.requestDTO.LoginRequest;
import vastra_backend.requestDTO.RegisterRequest;
import vastra_backend.requestDTO.UpdateProfileRequest;
import vastra_backend.responseDTO.RegisterResponse;
import vastra_backend.service.UserService;

@RestController
@RequestMapping("/users")

@Data
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest request) {

        RegisterResponse response = userService.register(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@Valid @RequestBody LoginRequest request) {

        String token = userService.login(
                request.getEmail(), request.getPassword());

        Map<String, String> response = new HashMap<>();

        response.put("message", "Login successful");
        response.put("token", token);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile")
    public ResponseEntity<RegisterResponse> getMyProfile(Authentication authenticaton) {

        RegisterResponse response = userService.getMyProfile(authenticaton.getName());

        return ResponseEntity.ok(response);
    }

    @PutMapping("/change-password")
    public ResponseEntity<Map<String, String>> changePassword(
            @Valid @RequestBody ChangePasswordRequest request,
            Authentication authentication) {

        userService.changePassword(authentication.getName(),
                request.getOldPassword(), request.getNewPassword(), request.getConfirmPassword());

        Map<String, String> response = new HashMap<>();
        response.put("message", "Password changed successfully");

        return ResponseEntity.ok(response);
    }

    @PutMapping("/update-profile")
    public ResponseEntity<Map<String, String>> updateProfile(@Valid @RequestBody UpdateProfileRequest request,
            Authentication authentication) {

        String token = userService.updateProfile(authentication.getName(), request.getName(), request.getEmail());

        Map<String, String> response = new HashMap<>();
        response.put("message", "Profile updated successfully");
        response.put("token", token);

        return ResponseEntity.ok(response);
    }

}
