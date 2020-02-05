package com.ssafy.project.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class CardlistSearch implements Serializable {
	private String mem_id;
	private int board_id;
	private String board_date;
	private int cardlist_id;
	private String cardlist_name;
	private String tag_name;	
}
