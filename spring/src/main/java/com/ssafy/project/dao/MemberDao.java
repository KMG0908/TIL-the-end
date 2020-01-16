package com.ssafy.project.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

import com.ssafy.project.dto.Member;

@Mapper
public interface MemberDao {

	public void insertMember(Member member);

	public List<Member> searchAll();

	public Member search(String user_id);

	public void updateMember(Member member);

	public void deleteMember(String user_id);
}












