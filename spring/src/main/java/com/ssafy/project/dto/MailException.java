package com.ssafy.project.dto;

public class MailException extends RuntimeException {
	public MailException() {
		super("메일 처리 중 오류 발생");
	}

	public MailException(String msg) {
		super(msg);
	}
}
