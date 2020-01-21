package com.ssafy.project.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class Card implements Serializable {
	/**
	 * 카드 리스트와 1:N 매칭이고 auto increment 속성입니다
	 */
	private int card_id;	
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
}
