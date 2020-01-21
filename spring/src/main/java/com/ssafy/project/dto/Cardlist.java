package com.ssafy.project.dto;

import java.io.Serializable;

public class Cardlist implements Serializable {
	/**
	 * 회원과 1:N 매칭이고 auto_increment 입니다. 생성자에서 사용하지 않습니다
	 */
	private String cardlist_id;
	/**
	 * 회원 아이디입니다. 외래키입니다
	 */
	private String mem_id;
	/**
	 * 카드 리스트 전체의 주제가 될 이름입니다
	 */
	private String cardlist_name;
	/**
	 * 미발행 글의 경우 날짜의 의미가 없습니다. 발행시 그 전날의 날짜를 다시 부여 받습니다.
	 */
	private String cardlist_date;
	/**
	 * 카드 리스트 간의 순서입니다. 날짜별로 1부터 시작하고 미발행도 1부터 시작합니다.
	 */
	private int cardlist_order;
	/**
	 * 발행여부를 나타냅니다. 발행되지 않은 글인 경우 true 입니다
	 */
	private boolean cardlist_instock;

	public Cardlist() {
	}

	public Cardlist(String mem_id, String cardlist_name, int cardlist_order) {
		super();
		this.mem_id = mem_id;
		this.cardlist_name = cardlist_name;
		this.cardlist_order = cardlist_order;
		this.cardlist_instock = false;
	}

	public Cardlist(String cardlist_id, String mem_id, String cardlist_name, String cardlist_date, int cardlist_order,
			boolean cardlist_instock) {
		super();
		this.cardlist_id = cardlist_id;
		this.mem_id = mem_id;
		this.cardlist_name = cardlist_name;
		this.cardlist_date = cardlist_date;
		this.cardlist_order = cardlist_order;
		this.cardlist_instock = cardlist_instock;
	}

	public String getCardlist_id() {
		return cardlist_id;
	}

	public void setCardlist_id(String cardlist_id) {
		this.cardlist_id = cardlist_id;
	}

	public String getMem_id() {
		return mem_id;
	}

	public void setMem_id(String mem_id) {
		this.mem_id = mem_id;
	}

	public String getCardlist_name() {
		return cardlist_name;
	}

	public void setCardlist_name(String cardlist_name) {
		this.cardlist_name = cardlist_name;
	}

	public String getCardlist_date() {
		return cardlist_date;
	}

	public void setCardlist_date(String cardlist_date) {
		this.cardlist_date = cardlist_date;
	}

	public int getCardlist_order() {
		return cardlist_order;
	}

	public void setCardlist_order(int cardlist_order) {
		this.cardlist_order = cardlist_order;
	}

	public boolean isCardlist_instock() {
		return cardlist_instock;
	}

	public void setCardlist_instock(boolean cardlist_instock) {
		this.cardlist_instock = cardlist_instock;
	}

	@Override
	public String toString() {
		return "Cardlist [cardlist_id=" + cardlist_id + ", mem_id=" + mem_id + ", cardlist_name=" + cardlist_name
				+ ", cardlist_date=" + cardlist_date + ", cardlist_order=" + cardlist_order + ", cardlist_instock="
				+ cardlist_instock + "]";
	}

	
	
}
