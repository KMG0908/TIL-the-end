package com.ssafy.project.dto;

public class CommentException extends RuntimeException {
	public CommentException() {
		super("댓글 처리 중 오류 발생");
	}
	public CommentException(String msg) {
		super(msg);
	}
}
