package com.ssafy.project.service;

import java.util.List;

import com.ssafy.project.dto.Member;

public interface MemberService {

	public void insertMember(Member member);

	public List<Member> searchAll();

	public Member search(String user_id);

	public void updateMember(Member member);

	public void deleteMember(String user_id);

}
