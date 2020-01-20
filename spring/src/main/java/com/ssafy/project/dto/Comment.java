package com.ssafy.project.dto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class Comment implements Serializable {
	
	/**
	 * 숫자 번호입니다. auto increment
	 */
	private int comment_id;
	/**
	 * 누구 글에 썼는지
	 */
	private String mem_id;
	/**
	 * 어떤 글에 달렸는지
	 */
	private int cardlist_id;
	/**
	 * 누가 코멘트를 달았는지
	 */
	private String comment_author;
	/**
	 * 언제 코멘트를 달았는지
	 */
	private String comment_time;
	/**
	 * 무슨 내용의 코멘트인지
	 */
	private String comment_contents;
	/**
	 * 수정이 되었다면 true
	 */
	private boolean comment_modified;
	/**
	 * 삭제 되었다면 true
	 */
	private boolean comment_deleted;
	
	public Comment() {
		super();
	}
	public Comment(int comment_id, String mem_id, int cardlist_id, String comment_author, String comment_time,
			String comment_contents, boolean comment_modified, boolean comment_deleted) {
		super();
		this.comment_id = comment_id;
		this.mem_id = mem_id;
		this.cardlist_id = cardlist_id;
		this.comment_author = comment_author;
		this.comment_time = comment_time;
		this.comment_contents = comment_contents;
		this.comment_modified = comment_modified;
		this.comment_deleted = comment_deleted;
	}
	
	
	
}
