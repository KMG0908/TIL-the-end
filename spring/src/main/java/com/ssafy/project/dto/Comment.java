package com.ssafy.project.dto;

import java.io.Serializable;

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

	public int getComment_id() {
		return comment_id;
	}

	public void setComment_id(int comment_id) {
		this.comment_id = comment_id;
	}

	public String getMem_id() {
		return mem_id;
	}

	public void setMem_id(String mem_id) {
		this.mem_id = mem_id;
	}

	public int getCardlist_id() {
		return cardlist_id;
	}

	public void setCardlist_id(int cardlist_id) {
		this.cardlist_id = cardlist_id;
	}

	public String getComment_author() {
		return comment_author;
	}

	public void setComment_author(String comment_author) {
		this.comment_author = comment_author;
	}

	public String getComment_time() {
		return comment_time;
	}

	public void setComment_time(String comment_time) {
		this.comment_time = comment_time;
	}

	public String getComment_contents() {
		return comment_contents;
	}

	public void setComment_contents(String comment_contents) {
		this.comment_contents = comment_contents;
	}

	public boolean isComment_modified() {
		return comment_modified;
	}

	public void setComment_modified(boolean comment_modified) {
		this.comment_modified = comment_modified;
	}

	public boolean isComment_deleted() {
		return comment_deleted;
	}

	public void setComment_deleted(boolean comment_deleted) {
		this.comment_deleted = comment_deleted;
	}

	@Override
	public String toString() {
		return "Comment [comment_id=" + comment_id + ", mem_id=" + mem_id + ", cardlist_id=" + cardlist_id
				+ ", comment_author=" + comment_author + ", comment_time=" + comment_time + ", comment_contents="
				+ comment_contents + ", comment_modified=" + comment_modified + ", comment_deleted=" + comment_deleted
				+ "]";
	}

	
	
}
