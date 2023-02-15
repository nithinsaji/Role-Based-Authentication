package com.role.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.role.dto.UserCount;
import com.role.user.Role;
import com.role.user.User;
import com.role.user.UserRepository;

@Service
public class AdminService {

	@Autowired
	private UserRepository userRepository;

	public Page<User> userList(String search, boolean sort, int entry, int page) {
		
		Sort sorted = Sort.by("name").ascending();
		
		if(!sort) sorted = Sort.by("name").descending();
		
		PageRequest pageRequest = PageRequest.of(page, entry, sorted);

		Page<User> userList = userRepository.findAll(search,pageRequest);

//		List<UserDTO> list = new ArrayList<>();
//
//		for (User user : userList) {
//			list.add(
//					new UserDTO(user));
//		}
		System.out.println(userList);
		return userList;

	}
	
	public Page<User> newUserList() {
		
		PageRequest page = PageRequest.of(0, 10);
		
		LocalDateTime days = LocalDateTime.now().minusDays(1);

		Page<User> userList = userRepository.findAllWithDateAfter(days, page);

//		List<UserDTO> list = new ArrayList<>();
//
//		for (User user : userList) {
//			list.add(
//					new UserDTO(user));
//		}
		return userList;

	}
	
	public List<UserCount> userCount() {
		
		List<User> user = userRepository.findAll();
		long count = userRepository.count();
		
		Map<Set<Role>, Long> map = user.stream().collect(Collectors.groupingBy(User::getRoles,Collectors.counting()));
		Set<Entry<Set<Role>,Long>> set = map.entrySet();
		
		List<UserCount> list = new ArrayList<>();
		int i=1;
		list.add(new UserCount(i, "Total Members", count));
		
		for (Entry<Set<Role>, Long> entry : set) {
			i++;
			String key = entry.getKey().toString();
			list.add(new UserCount(i, key.substring(1, key.length()-1), entry.getValue()));

		}
		return list;
	}
	
	public Optional<User> profile(String email) {
		return userRepository.findByEmail(email);
	}
}
