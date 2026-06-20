package vastra_backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import vastra_backend.requestDTO.AddressRequest;
import vastra_backend.responseDTO.AddressResponse;
import vastra_backend.service.AddressService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/address")
public class AddressController {

    private final AddressService addressService;

    @GetMapping
    public ResponseEntity<AddressResponse> getMyAddress(Authentication auth) {

        AddressResponse ar = addressService.getMyAddress(auth);

        return ResponseEntity.ok(ar);
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> addAddress(@Valid @RequestBody AddressRequest request,
            Authentication auth) {

        addressService.addAddress(request, auth);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Address added Successfully");

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{addressId}")
    public ResponseEntity<Map<String, String>> updateAddress(@PathVariable Long addressId,
            @Valid @RequestBody AddressRequest request, Authentication auth) {

        addressService.updateAddress(addressId, request, auth);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Address updated successfully");

        return ResponseEntity.ok(response);
    }
}
