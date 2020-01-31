package com.ssafy.project.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class Board implements Serializable {
	private int board_id;
	private String mem_id;
	
	/**
	 * datetime 형식
	 */
	private String board_date;
	/**
	 * list_id를 string으로 보유
	 */
	private String board_lists;
}
