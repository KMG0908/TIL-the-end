package com.ssafy.project.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

import com.ssafy.project.dto.Member;

@Mapper
public interface MemberDao {

	public void insertMember(Member member);

	public List<Member> searchAll();

	public Member search(String mem_id);

	public void updateMember(Member member);

	public void deleteMember(String mem_id);

	public List<Member> searchIdLike(String mem_id);

	public List<Member> searchNickLike(String mem_nick);

	public int getAuth(String mem_id);

	public void patchAuth(String mem_id);

	public boolean getpostdef(String mem_id);

	public void patchpostdef(String mem_id);
}
