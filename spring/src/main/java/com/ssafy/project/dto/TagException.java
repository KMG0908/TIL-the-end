package com.ssafy.project.dto;

public class TagException extends RuntimeException {
	public TagException() {
		super("태그 처리 중 오류 발생");
	}
	public TagException(String msg) {
		super(msg);
	}
}
