package com.role.dto;

import java.util.Set;

import com.role.user.Role;

public class AuthResponse {
	private String email;
	private String accessToken;
	private Set<Role> roles;

	public AuthResponse() { }

	public AuthResponse(String email, String accessToken, Set<Role> roles) {
		super();
		this.email = email;
		this.accessToken = accessToken;
		this.roles = roles;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
	
	

}
