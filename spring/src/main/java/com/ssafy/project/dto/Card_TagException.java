package com.ssafy.project.dto;

public class Card_TagException extends RuntimeException {
	public Card_TagException() {
		super("카드 태그 처리 중 오류 발생");
	}

	public Card_TagException(String msg) {
		super(msg);
	}
}
