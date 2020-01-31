package com.ssafy.project.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class Tag implements Serializable {

	/**
	 * pk, 조회 조건 fk
	 */
	private int tag_id;
	/**
	 * 카드에서 태그 입력시 태그 테이블에서 조회한 뒤 없다면 새로 생성, 생성 시 auto increment 조건
	 */
	private String tag_name;

	
}
