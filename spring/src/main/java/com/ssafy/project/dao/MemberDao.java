package com.ssafy.project.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

import com.ssafy.project.dto.Member;

@Mapper
public interface MemberDao {

	/* 아이디 생성 시 사용되는 sql 문장들 */
	public void insertMember(Member member);
	public void grantMember(String mem_id);
	public int searchId(String mem_id);
	public int searchEmail(String mem_email);
	public int searchNick(String mem_nick);	
	public void createBoard(String mem_id);
	
	/* 운영자가 사용할 수 있는 유저 찾기 */
	public List<Member> searchAll();
	
	
	public Member search(String mem_id);

	public void updateMember(Member member);

	public void deleteMember(String mem_id);

	public List<Member> searchIdLike(String mem_id);

	public List<Member> searchNickLike(String mem_nick);

	public int getAuth(String mem_id);

	public void patchAuth(String mem_id);

	public int getpostdef(String mem_id);

	public void patchpostdef(String mem_id);









	
}
