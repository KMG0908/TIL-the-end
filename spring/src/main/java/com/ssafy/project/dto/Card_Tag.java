package com.ssafy.project.dto;

import java.io.Serializable;

public class Card_Tag implements Serializable {
	/**
	 * N:M 관계입니다 auto increment 속성입니다
	 */
	private int card_tag_id;
	/**
	 * 리스트와 1:N 매칭입니다
	 */
	private int card_id;
	/**
	 * 태그와 1:1 매칭입니다
	 */
	private int tag_id;

	public Card_Tag() {
		super();
	}

	public Card_Tag(int card_tag_id, int card_id, int tag_id) {
		super();
		this.card_tag_id = card_tag_id;
		this.card_id = card_id;
		this.tag_id = tag_id;
	}

	public int getCard_tag_id() {
		return card_tag_id;
	}

	public void setCard_tag_id(int card_tag_id) {
		this.card_tag_id = card_tag_id;
	}

	public int getCard_id() {
		return card_id;
	}

	public void setCard_id(int card_id) {
		this.card_id = card_id;
	}

	public int getTag_id() {
		return tag_id;
	}

	public void setTag_id(int tag_id) {
		this.tag_id = tag_id;
	}

	@Override
	public String toString() {
		return "Card_Tag [card_tag_id=" + card_tag_id + ", card_id=" + card_id + ", tag_id=" + tag_id + "]";
	}
	
	

}
