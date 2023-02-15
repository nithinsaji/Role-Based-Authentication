package com.role.user;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;

import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "users")
public class User implements UserDetails {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	@Column(nullable = false, length = 50, unique = false)
	private String name;

	@Column(nullable = false, length = 50, unique = true)
	@Email
	@Length(min = 5, max = 50)
	private String email;

	@Column(nullable = false, length = 64)
	@Length(min = 5, max = 64)
	private String password;

	@Column(nullable = false, length = 50, unique = true)
	@Length(min = 5, max = 50)
	private String roleAddedBy;
	
	@Column(nullable = false)
	private LocalDateTime joiningTime;
	
	@Column(nullable = false)
	private LocalDateTime lastLogin;

	@ManyToMany
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	public User() {
	}

	public User(Integer id, String name, @Email @Length(min = 5, max = 50) String email,
			@Length(min = 5, max = 64) String password, @Length(min = 5, max = 50) String roleAddedBy,
			LocalDateTime joiningTime, LocalDateTime lastLogin, Set<Role> roles) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.roleAddedBy = roleAddedBy;
		this.joiningTime = joiningTime;
		this.lastLogin = lastLogin;
		this.roles = roles;
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

	public String getRoleAddedBy() {
		return roleAddedBy;
	}

	public void setRoleAddedBy(String roleAddedBy) {
		this.roleAddedBy = roleAddedBy;
	}
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + ", roles=" + roles
				+ "]";
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<SimpleGrantedAuthority> authorities = new ArrayList<>();
		for (Role role : roles) {
			authorities.add(new SimpleGrantedAuthority(role.getName()));
		}
		return authorities;
	}

	@Override
	public String getUsername() {
		return this.email;
	}

	@Override
	public boolean isAccountNonExpired() {

		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {

		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public void addRole(Role role) {
		this.roles.add(role);
		
	}

}
