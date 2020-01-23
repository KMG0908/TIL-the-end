package com.ssafy.project.service;

import java.util.List;

import com.ssafy.project.dto.Member;

public interface MemberService {

	public void insertMember(Member member);

	public List<Member> searchAll();

	public Member search(String mem_id);

	public void updateMember(Member member);

	public void deleteMember(String mem_id);

	public boolean hasAuth(String mem_id);

	public void patchAuth(String mem_id);

	public Member login(String mem_id, String mem_pw);

	public List<Member> searchIdLike(String mem_id);

	public List<Member> searchNickLike(String mem_nick);

}
