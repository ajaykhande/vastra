package vastra_backend.service;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import vastra_backend.modal.Address;
import vastra_backend.modal.User;
import vastra_backend.repository.AddressRepository;
import vastra_backend.repository.UserRepository;
import vastra_backend.requestDTO.AddressRequest;
import vastra_backend.responseDTO.AddressResponse;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public AddressResponse getMyAddress(Authentication auth) {

        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Address address = addressRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        AddressResponse ar = new AddressResponse();
        ar.setId(address.getId());
        ar.setFullName(address.getFullName());
        ar.setMobile(address.getMobile());
        ar.setStreet(address.getStreet());
        ar.setCity(address.getCity());
        ar.setPincode(address.getPincode());

        return ar;
    }

    public void addAddress(AddressRequest request, Authentication auth) {

        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Address address = new Address();
        address.setUser(user);
        address.setFullName(request.getFullName());
        address.setMobile(request.getMobile());
        address.setStreet(request.getStreet());
        address.setCity(request.getCity());
        address.setPincode(request.getPincode());

        addressRepository.save(address);
    }

    public void updateAddress(Long addressId, AddressRequest request, Authentication auth) {

        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        if (!address.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You cannot update this address");
        }

        address.setFullName(request.getFullName());
        address.setMobile(request.getMobile());
        address.setStreet(request.getStreet());
        address.setCity(request.getCity());
        address.setPincode(request.getPincode());

        addressRepository.save(address);

    }
}
