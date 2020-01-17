package com.ssafy.project.dto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class Member implements Serializable {
	private String mem_id;
	private String mem_email;
	private String mem_pw;
	private String mem_nick;
	private String mem_reg_date;
	
	public Member() {}
	
	public Member(String mem_id, String mem_email, String mem_pw, String mem_nick, String mem_reg_date) {
		super();
		this.mem_id = mem_id;
		this.mem_email = mem_email;
		this.mem_pw = mem_pw;
		this.mem_nick = mem_nick;
		this.mem_reg_date = mem_reg_date;
	}

}
