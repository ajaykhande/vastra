package vastra_backend.responseDTO;

import lombok.Data;

@Data
public class AddressResponse {
   
    private Long id;
    private String fullName;
    private String mobile;
    private String street;
    private String city;
    private String pincode;

}
