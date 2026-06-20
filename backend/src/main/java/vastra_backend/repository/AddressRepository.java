package vastra_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import vastra_backend.modal.Address;
import vastra_backend.modal.User;

public interface AddressRepository extends JpaRepository<Address, Long> {

    Optional<Address> findByUser(User user);
}
