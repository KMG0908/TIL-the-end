package com.ssafy.project.dto;

import java.io.Serializable;

public class Member implements Serializable {
	private String mem_id;
	private String mem_email;
	private String mem_pw;
	private String mem_nick;
	private String mem_reg_date;

	public Member() {
	}

	public Member(String mem_id, String mem_email, String mem_pw, String mem_nick, String mem_reg_date) {
		super();
		this.mem_id = mem_id;
		this.mem_email = mem_email;
		this.mem_pw = mem_pw;
		this.mem_nick = mem_nick;
		this.mem_reg_date = mem_reg_date;
	}

	public String getMem_id() {
		return mem_id;
	}

	public void setMem_id(String mem_id) {
		this.mem_id = mem_id;
	}

	public String getMem_email() {
		return mem_email;
	}

	public void setMem_email(String mem_email) {
		this.mem_email = mem_email;
	}

	public String getMem_pw() {
		return mem_pw;
	}

	public void setMem_pw(String mem_pw) {
		this.mem_pw = mem_pw;
	}

	public String getMem_nick() {
		return mem_nick;
	}

	public void setMem_nick(String mem_nick) {
		this.mem_nick = mem_nick;
	}

	public String getMem_reg_date() {
		return mem_reg_date;
	}

	public void setMem_reg_date(String mem_reg_date) {
		this.mem_reg_date = mem_reg_date;
	}

	@Override
	public String toString() {
		return "Member [mem_id=" + mem_id + ", mem_email=" + mem_email + ", mem_pw=" + mem_pw + ", mem_nick=" + mem_nick
				+ ", mem_reg_date=" + mem_reg_date + "]";
	}

	
	
}
