package com.role.dto;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import com.role.user.Role;
import com.role.user.User;

public class UserDTO {

	private Integer id;

	private String name;

	private String email;

	private String roleAddedBy;

	private LocalDateTime joiningTime;

	private LocalDateTime lastLogin;

	private Set<Role> roles = new HashSet<>();

	public UserDTO() {

	}

	public UserDTO(User user) {
		super();
		this.id = user.getId();
		this.name = user.getName();
		this.email = user.getEmail();
		this.roleAddedBy = user.getRoleAddedBy();
		this.joiningTime = user.getJoiningTime();
		this.lastLogin = user.getLastLogin();
		this.roles = user.getRoles();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRoleAddedBy() {
		return roleAddedBy;
	}

	public void setRoleAddedBy(String roleAddedBy) {
		this.roleAddedBy = roleAddedBy;
	}

	public LocalDateTime getJoiningTime() {
		return joiningTime;
	}

	public void setJoiningTime(LocalDateTime joiningTime) {
		this.joiningTime = joiningTime;
	}

	public LocalDateTime getLastLogin() {
		return lastLogin;
	}

	public void setLastLogin(LocalDateTime lastLogin) {
		this.lastLogin = lastLogin;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	@Override
	public String toString() {
		return "UserDTO [id=" + id + ", name=" + name + ", email=" + email + ", roleAddedBy=" + roleAddedBy
				+ ", joiningTime=" + joiningTime + ", lastLogin=" + lastLogin + ", roles=" + roles + "]";
	}

}
