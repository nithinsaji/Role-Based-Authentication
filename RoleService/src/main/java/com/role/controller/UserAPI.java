package com.role.controller;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.role.dto.MessageDTO;
import com.role.dto.UpdateRole;
import com.role.dto.UserDTO;
import com.role.service.UserService;
import com.role.user.Role;
import com.role.user.RoleRepository;
import com.role.user.User;
import com.role.user.UserRepository;

@RestController
public class UserAPI {

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository repo;

	@Autowired
	private RoleRepository roleRepo;


	@PostMapping("/register")
	public ResponseEntity<?> createUser(@RequestBody @Valid User user) {

		// Checking user is already exist or not
		Optional<User> findByEmail = repo.findByEmail(user.getEmail());
		if (!findByEmail.isEmpty()) {
			MessageDTO messageDTO = new MessageDTO();
			messageDTO.setMessage("User is already there!");
			return ResponseEntity.internalServerError().body(messageDTO);
		}

//		date
		user.setJoiningTime(LocalDateTime.now());
		user.setLastLogin(LocalDateTime.now());

		// Adding default role to the user
		Role roles = new Role();
		roles.setId(3);
		roles.setName("ROLE_USER");
		Set<Role> role = new HashSet<>();
		role.add(roles);
		user.setRoleAddedBy("Default");
		user.setRoles(role);

		// Saving user
		User createdUser = userService.save(user);

		UserDTO userDTO = new UserDTO(createdUser);

		return ResponseEntity.ok(userDTO);

	}

	@PostMapping("/updateUser")
	public ResponseEntity<?> updateUser(@RequestBody @Valid UserDTO user) {

		System.out.println(user);
		// Checking user is already exist or not
		Optional<User> byId = repo.findById(user.getId());
		if (byId.isEmpty()) {
			MessageDTO messageDTO = new MessageDTO();
			messageDTO.setMessage("User isn't there!");
			return ResponseEntity.internalServerError().body(messageDTO);
		}

		// fetching old user details
		User oldData = byId.get();
		if (!user.getName().equals(oldData.getName()))
			oldData.setName(user.getName());
		if (!user.getEmail().equals(oldData.getEmail()))
			oldData.setEmail(user.getEmail());

		user.setLastLogin(LocalDateTime.now());

		// Updating user
		User createdUser = userService.save(oldData);

		UserDTO userDTO = new UserDTO(createdUser);

		return ResponseEntity.ok(userDTO);

	}

	@PutMapping("/userRoles/{id}")
	@RolesAllowed("ROLE_ADMIN")
	public ResponseEntity<?> updateUserRoles(@PathVariable Integer id, @RequestBody UpdateRole updateRole) {

		// checking updating own role or not
		Optional<User> email = repo.findByEmail(updateRole.getEmail());

		if (id == email.get().getId()) {
			MessageDTO messageDTO = new MessageDTO();
			messageDTO.setMessage("User cannot modify there own role!");
			return ResponseEntity.internalServerError().body(messageDTO);
		}

		// Checking user is already exist or not
		Optional<User> findById = repo.findById(id);
		if (findById.isEmpty()) {
			MessageDTO messageDTO = new MessageDTO();
			messageDTO.setMessage("User isn't there!");
			return ResponseEntity.internalServerError().body(messageDTO);
		}

		// Store user
		User updateUser = findById.get();
		
		updateUser.setRoleAddedBy(updateRole.getEmail());

		// find id based on role
		Optional<Role> findByName = roleRepo.findByName(updateRole.getRole());
		Set<Role> set = new HashSet<>();
		set.add(findByName.get());
		// Adding User role
		updateUser.setRoles(set);

		// Update User
		User updatedUser = userService.save(updateUser);

		UserDTO userDTO = new UserDTO(updatedUser);

		return ResponseEntity.ok(userDTO);

	}

	@PutMapping("/deleteUser/{id}")
	@RolesAllowed("ROLE_ADMIN")
	public ResponseEntity<?> deleteUser(@PathVariable Integer id) {

		// checking user is exist or not
		Optional<User> findById = repo.findById(id);
		MessageDTO messageDTO = new MessageDTO();
		if (findById.isEmpty()) {
			messageDTO.setMessage("User isn't there!");
			return ResponseEntity.internalServerError().body(messageDTO);
		}

		// delete user with id
		userService.delete(id);

		// check user is deleted or not
		Optional<User> byId = repo.findById(id);
		if (!byId.isEmpty()) {
			messageDTO.setMessage("User isn't deleted!");
			return ResponseEntity.internalServerError().body(messageDTO);
		}

		messageDTO.setMessage("User deleted successfully");

		return ResponseEntity.ok(messageDTO);
	}

}
