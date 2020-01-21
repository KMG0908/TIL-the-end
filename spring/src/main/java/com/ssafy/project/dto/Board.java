package com.ssafy.project.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class Board implements Serializable {
	private int board_id;
	private String mem_id;
	private String board_type;
	private String board_date;
	private String board_lists;
}
