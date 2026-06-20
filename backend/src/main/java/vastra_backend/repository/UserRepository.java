package vastra_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import vastra_backend.modal.User;

public interface  UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
   
}
