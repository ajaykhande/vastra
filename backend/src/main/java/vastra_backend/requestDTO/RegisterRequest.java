package vastra_backend.requestDTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

   @NotBlank(message = "Name is required")
   @Pattern(regexp = "^[A-Za-z ]+$",
            message = "Name must contain only letters"
   )
   private String name;

   @NotBlank(message = "Email is required")
   @Email(message = "Invailid email format")
   private String email;

   @NotBlank
   @Size(min = 6, message = "Password must be at least 6 characters")
   private String password;
}