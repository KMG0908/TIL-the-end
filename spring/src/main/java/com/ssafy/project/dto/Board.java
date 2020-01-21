package com.ssafy.project.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class Board implements Serializable {
	private int board_id;
	private String mem_id;
	/**
	 * type : todo or daily
	 */
	private String board_type;
	/**
	 * datetime 형식
	 */
	private String board_date;
	/**
	 * list_id를 json으로 보유
	 */
	private String board_lists;
}
