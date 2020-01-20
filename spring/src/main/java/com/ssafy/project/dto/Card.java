package com.ssafy.project.dto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class Card implements Serializable {
	/**
	 * 카드 리스트와 1:N 매칭이고
	 * auto increment 속성입니다
	 */
	private int card_id;
	/**
	 * 회원과 1:N 매칭입니다
	 */
	private int cardlist_id;
	/**
	 * 카드의 제목으로 소제목에 해당합니다
	 */
	private String card_name;
	/**
	 * 카드의 내용입니다. 
	 * db가 text로 되어있습니다
	 * 이미지는 나중에 컬럼을 추가해야 합니다
	 */
	private String card_contents;
	/**
	 * 카드의 개별 공개 여부입니다. 비공개일경우 true 입니다
	 */
	private boolean card_secret;
	/**
	 * 카드의 배치 순서입니다. 카드 리스트 내부에서 1부터 시작합니다
	 */
	private int card_order;
	
	public Card() {}
	
	public Card(int cardlist_id, String card_name, String card_contents, boolean card_secret, int card_order) {
		super();
		this.cardlist_id = cardlist_id;
		this.card_name = card_name;
		this.card_contents = card_contents;
		this.card_secret = card_secret;
		this.card_order = card_order;
	}
	
}
