package com.ssafy.project.dto;

import java.io.Serializable;

public class Member implements Serializable {
	private String user_id;
	private String email;
	private String password;
	private String nickname;
	private String reg_date;
	
	public Member() {}
	
	public Member(String user_id, String email, String password, String nickname, String reg_date) {
		super();
		this.user_id = user_id;
		this.email = email;
		this.password = password;
		this.nickname = nickname;
		this.reg_date = reg_date;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
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

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getReg_date() {
		return reg_date;
	}

	public void setReg_date(String reg_date) {
		this.reg_date = reg_date;
	}

	@Override
	public String toString() {
		return "Member [user_id=" + user_id + ", email=" + email + ", password=" + password + ", nickname=" + nickname
				+ ", reg_date=" + reg_date + "]";
	}
}
