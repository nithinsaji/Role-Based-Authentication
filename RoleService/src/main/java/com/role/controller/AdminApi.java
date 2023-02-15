package com.role.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.role.dto.UserCount;
import com.role.dto.UserDTO;
import com.role.service.AdminService;
import com.role.user.User;

@RestController
public class AdminApi {

	@Autowired
	private AdminService adminService;

	@GetMapping("/userlist")
	public ResponseEntity<?> userList(@RequestParam("search") String search, @RequestParam("sort") boolean sort,
			@RequestParam("entry") int entry, @RequestParam("page") int page) {
		if (search.isBlank())
			search = "";
		Page<User> userList = adminService.userList(search, sort, entry, page-1);

		return ResponseEntity.ok(userList);

	}

	@GetMapping("/newUserList")
	public ResponseEntity<?> newUserList() {

		Page<User> userList = adminService.newUserList();

		return ResponseEntity.ok(userList);

	}

	@GetMapping("/userCount")
	public ResponseEntity<?> userCount() {

		List<UserCount> userCount = adminService.userCount();

		return ResponseEntity.ok(userCount);

	}

	@PostMapping("/profile")
	public ResponseEntity<UserDTO> profile(@RequestBody UserDTO email) {

		System.out.println("Email : " + email.getEmail());

		Optional<User> byEmail = adminService.profile(email.getEmail());
		if (byEmail.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		User user = byEmail.get();

		return ResponseEntity.ok(new UserDTO(user));
	}
}
