package edu.multicampus.restfullapi.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "users", uniqueConstraints = { @UniqueConstraint(columnNames = "username"),
		@UniqueConstraint(columnNames = "email") })
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 20)
	private String username;

	@NotBlank
	@Size(max = 50)
	@Email
	private String email;

	@NotBlank
	@Size(max = 120)
	private String password;

	@Size(max = 120)
	private String name;

	@Size(max = 120)
	private String address;

	@Size(max = 120)
	private String phone;
	
	@Size(max = 500)
	private String avatar;
	
    @OneToOne(mappedBy = "user")
    private Store store;
	
	@OneToMany(mappedBy = "user", fetch = FetchType.EAGER,cascade = CascadeType.REMOVE)
	@JsonIgnore
	Set<CustomerOrder> amount;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	public User() {
	}

	public User(@NotBlank @Size(max = 20) String username, @NotBlank @Size(max = 50) @Email String email,
			@NotBlank @Size(max = 120) String password,  @Size(max = 120) String name,
			 @Size(max = 120) String address,   @Size(max = 120) String phone, @Size(max = 500) String avatar) {
		super();
		this.username = username;
		this.email = email;
		this.password = password;
		this.name = name;
		this.address = address;
		this.phone = phone;
		this.avatar = avatar;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public @NotBlank @Size(max = 120) String getPhone() {
		return phone;
	}

	public void setPhone(@NotBlank @Size(max = 120) String phone) {
		this.phone = phone;
	}

	public Set<CustomerOrder> getAmount() {
		return amount;
	}

	public void setAmount(Set<CustomerOrder> amount) {
		this.amount = amount;
	}

}
