package vastra_backend.requestDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AddressRequest {

    @NotBlank(message = "Fullname is required")
    private String fullName;

    @NotBlank(message = "Mobile number is required")
    private String mobile;

    @NotBlank(message = "Street name is required")
    private String street;

    @NotBlank(message = "city name is required")
    private String city;

    @NotBlank(message = "Pincode is required")
    @Size(message = "Please enter valid pincode number", min = 6, max = 6)
    private String pincode;

}
