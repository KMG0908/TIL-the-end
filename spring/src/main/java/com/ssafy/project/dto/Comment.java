package com.ssafy.project.dto;

import java.io.Serializable;

import lombok.Data;


@Data
public class Comment implements Serializable {

	/**
	 * 숫자 번호입니다. auto increment
	 */
	private int comment_id;
	/**
	 * 누가 썼는지
	 */
	private String mem_id;
	/**
	 * 어떤 글에 달렸는지
	 */
	private int cardlist_id;
	
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
	
	
	private boolean comment_secret;

	
}
