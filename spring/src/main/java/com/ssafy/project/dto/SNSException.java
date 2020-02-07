package com.ssafy.project.dto;

public class SNSException extends RuntimeException {
	public SNSException() {
		super("소셜 로그인 정보 처리 중 오류 발생");
	}

	public SNSException(String msg) {
		super(msg);
	}
}
