package com.ssafy.project.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

import com.ssafy.project.dto.Member;

@Mapper
public interface MemberDao {
	public List<Member> searchAll();
}












