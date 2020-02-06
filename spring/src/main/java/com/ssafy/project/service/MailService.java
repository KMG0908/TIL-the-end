package com.ssafy.project.service;


public interface MailService {
	public void sendAuth(String mem_id, String mem_email);

	public void postAuth(String mem_id, String mem_email, String authCode);
}
