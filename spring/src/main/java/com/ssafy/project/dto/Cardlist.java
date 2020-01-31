package com.ssafy.project.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class Cardlist implements Serializable {
	/**
	 * 보드와 1:N 매칭이고 auto_increment 입니다. 생성자에서 사용하지 않습니다
	 */
	private int cardlist_id;
	
	/**
	 *  외래키 연결 용
	 */
	private int board_id;
	
	/**
	 * 카드 리스트 전체의 주제가 될 이름입니다
	 */
	private String cardlist_name;
	/**
	 * 카드리스트 내부 카드들을 json 형식으로 보관한 것입니다
	 */
	private String cardlist_cards;
	
	private boolean cardlist_secret;
	
	private int cardlist_heart;
	
}
