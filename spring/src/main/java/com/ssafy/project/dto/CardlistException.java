package com.ssafy.project.dto;

public class CardlistException extends RuntimeException {
	public CardlistException() {
		super("카드 리스트 처리 중 오류 발생");
	}

	public CardlistException(String msg) {
		super(msg);
	}
}
