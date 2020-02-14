package com.ssafy.project.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class Heart implements Serializable {
	
	private static final long serialVersionUID = 8904658526231132234L;
	private String mem_id;	
	private int cardlist_id;
	
}
