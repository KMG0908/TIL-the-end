package com.ssafy.project.dto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class Cardlist implements Serializable {
	private String cardlist_id;
	private String mem_id;
	private String cardlist_name;
	private String cardlist_date;
	private int cardlist_order;
	private boolean cardlist_instock;
	
	public Cardlist() {}

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
