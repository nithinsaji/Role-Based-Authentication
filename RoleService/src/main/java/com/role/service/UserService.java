package com.role.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.role.user.User;
import com.role.user.UserRepository;

@Service
@Transactional
public class UserService {

	@Autowired
	private UserRepository repo;
	
	@Autowired 
	private PasswordEncoder passwordEncoder;
	
	public User save(User user) {
		
		if(user.getId() == null)
		{
			String rawPassword = user.getPassword();
			String encodedPassword = passwordEncoder.encode(rawPassword);
			user.setPassword(encodedPassword);
		}
			
		return repo.save(user);
	}

	public void delete(Integer id) {
		
		repo.deleteById(id);
		
	}

}
