package com.ssafy.project.dto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class Cardlist implements Serializable {
	/**
	 * 회원과 1:N 매칭이고 auto_increment 입니다. 
	 * 생성자에서 사용하지 않습니다
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
	 * 미발행 글의 경우 날짜의 의미가 없습니다.
	 * 발행시 그 전날의 날짜를 다시 부여 받습니다.
	 */
	private String cardlist_date;
	/** 
	 * 카드 리스트 간의 순서입니다. 
	 * 날짜별로 1부터 시작하고
	 * 미발행도 1부터 시작합니다.
	 */
	private int cardlist_order;
	/**
	 * 발행여부를 나타냅니다. 발행되지 않은 글인 경우 true 입니다
	 */
	private boolean cardlist_instock;
	
	public Cardlist() {}

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
	
}
