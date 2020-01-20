package com.ssafy.project.dto;

public class CardTagException extends RuntimeException {
	public CardTagException() {
		super("카드 태그 처리 중 오류 발생");
	}
	public CardTagException(String msg) {
		super(msg);
	}
}
