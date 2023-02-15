package com.role.user;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	Optional<User> findByEmail(String email);
	
	@Query("select u from User u where joiningTime >= :dateTime")
	Page<User> findAllWithDateAfter(LocalDateTime dateTime, Pageable pageable);

	@Query("select u from User u where name LIKE %?1%")
	Page<User> findAll(String search, Pageable pageable);
}
