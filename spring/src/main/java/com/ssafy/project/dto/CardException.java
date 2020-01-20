package com.ssafy.project.dto;

public class CardException extends RuntimeException {
	public CardException() {
		super("카드 처리 중 오류 발생");
	}
	public CardException(String msg) {
		super(msg);
	}
}
