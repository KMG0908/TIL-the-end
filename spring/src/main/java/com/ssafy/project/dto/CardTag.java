package com.ssafy.project.dto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class CardTag implements Serializable {
	/**
	 * N:M 관계입니다
	 * auto increment 속성입니다
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
	public CardTag() {
		super();
	}
	public CardTag(int card_tag_id, int card_id, int tag_id) {
		super();
		this.card_tag_id = card_tag_id;
		this.card_id = card_id;
		this.tag_id = tag_id;
	}
	
	
	
	
}
