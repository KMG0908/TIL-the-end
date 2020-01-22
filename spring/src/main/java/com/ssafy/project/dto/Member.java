package com.ssafy.project.dto;

import java.io.Serializable;

import lombok.Data;


@Data
public class Member implements Serializable {
	/**
	 * 운영자를 admin으로, pk
	 */
	private String mem_id;
	/**
	 * 이메일정보 null
	 */
	private String mem_email;
	/**
	 * 아직 암호화하지 않았습니다 NN
	 */
	private String mem_pw;
	/**
	 * 닉네임은 ... 굳이 필요한지 모르겠는데 좀 더 생각해보겠습니다
	 */
	private String mem_nick;
	/**
	 * 가입일(date)
	 */
	private String mem_reg_date;
	/*
	 * 아래는 회원 권한 테이블로 별도 관리하고 있습니다.
	 */
	/**
	 * 글쓰기 권한이 있으면 true(tinyint 1)
	 * 운영자만 이 권한을 수정할 수 있습니다.
	 */
	private boolean mem_auth;
	/**
	 * 카드 생성시 기본적으로 공개 설정이면 true
	 */
	private boolean mem_post_def;
	/**
	 * 회원이 전체 비공개 설정일 경우 true
	 * 즉, 전체 비공개일 때는 mem_post_def 수정이 불가능해야하고 
	 * false 값이어야 합니다.
	 */
	private boolean mem_secret;
	
}
