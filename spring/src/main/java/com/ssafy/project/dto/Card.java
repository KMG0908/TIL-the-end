package com.ssafy.project.dto;

import java.io.Serializable;

public class Card implements Serializable {
	/**
	 * 카드 리스트와 1:N 매칭이고 auto increment 속성입니다
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
	 * 카드의 내용입니다. db가 text로 되어있습니다 이미지는 나중에 컬럼을 추가해야 합니다
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

	public Card() {
	}

	public Card(int cardlist_id, String card_name, String card_contents, boolean card_secret, int card_order) {
		super();
		this.cardlist_id = cardlist_id;
		this.card_name = card_name;
		this.card_contents = card_contents;
		this.card_secret = card_secret;
		this.card_order = card_order;
	}

	public int getCard_id() {
		return card_id;
	}

	public void setCard_id(int card_id) {
		this.card_id = card_id;
	}

	public int getCardlist_id() {
		return cardlist_id;
	}

	public void setCardlist_id(int cardlist_id) {
		this.cardlist_id = cardlist_id;
	}

	public String getCard_name() {
		return card_name;
	}

	public void setCard_name(String card_name) {
		this.card_name = card_name;
	}

	public String getCard_contents() {
		return card_contents;
	}

	public void setCard_contents(String card_contents) {
		this.card_contents = card_contents;
	}

	public boolean isCard_secret() {
		return card_secret;
	}

	public void setCard_secret(boolean card_secret) {
		this.card_secret = card_secret;
	}

	public int getCard_order() {
		return card_order;
	}

	public void setCard_order(int card_order) {
		this.card_order = card_order;
	}

	@Override
	public String toString() {
		return "Card [card_id=" + card_id + ", cardlist_id=" + cardlist_id + ", card_name=" + card_name
				+ ", card_contents=" + card_contents + ", card_secret=" + card_secret + ", card_order=" + card_order
				+ "]";
	}
	
	

}
