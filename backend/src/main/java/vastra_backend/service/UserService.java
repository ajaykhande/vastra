package vastra_backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import vastra_backend.enums.Role;
import vastra_backend.modal.User;
import vastra_backend.repository.UserRepository;
import vastra_backend.requestDTO.RegisterRequest;
import vastra_backend.responseDTO.RegisterResponse;
import vastra_backend.security.JwtUtil;

@RequiredArgsConstructor
@Service
public class UserService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtUtil jwtUtil;

  public RegisterResponse register(RegisterRequest request) {

    if (userRepository.findByEmail(request.getEmail()).isPresent()) {
      throw new RuntimeException("Email already exist");
    }

    User user = new User();
    user.setName(request.getName());
    user.setEmail(request.getEmail());

    String encodedPassword = passwordEncoder.encode(request.getPassword());
    user.setPassword(encodedPassword);

    user.setRole(Role.USER);
    userRepository.save(user);

    return new RegisterResponse(
        user.getId(),
        user.getName(),
        user.getEmail(),
        user.getRole());

  }

  public String login(String email, String password) {

    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));

    if (!passwordEncoder.matches(password, user.getPassword())) {
      throw new RuntimeException("Invalid password");
    }

    return jwtUtil.generateToken(email, user.getRole());

  }

  public RegisterResponse getMyProfile(String email) {

    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));

    return new RegisterResponse(user.getId(),
        user.getName(),
        user.getEmail(),
        user.getRole());
  }

  public void changePassword(String email, String oldPassword, String newPassword, String confirmPassword) {

    if (!newPassword.equals(confirmPassword)) {
      throw new RuntimeException("New password and confirm password do not match");
    }

    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));

    if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
      throw new RuntimeException("Old password is incorrect");
    }

    user.setPassword(passwordEncoder.encode(newPassword));
    userRepository.save(user);
  }

  public String updateProfile(String currentEmail, String name, String email) {

    User user = userRepository.findByEmail(currentEmail)
        .orElseThrow(() -> new RuntimeException("User not found"));

    user.setName(name);
    user.setEmail(email);
    userRepository.save(user);
    return jwtUtil.generateToken(email, user.getRole());

  }

}