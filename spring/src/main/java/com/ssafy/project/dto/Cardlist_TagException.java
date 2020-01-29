package com.ssafy.project.dto;

public class Cardlist_TagException extends RuntimeException {
	public Cardlist_TagException() {
		super("카드 태그 처리 중 오류 발생");
	}

	public Cardlist_TagException(String msg) {
		super(msg);
	}
}
