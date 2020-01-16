package com.ssafy.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.project.dao.MemberDao;
import com.ssafy.project.dto.Member;
import com.ssafy.project.dto.MemberException;

@Service
public class MemberServiceImpl implements MemberService {
	@Autowired
	private MemberDao dao;

	public List<Member> searchAll() {
		try {
			return dao.searchAll();
		}catch (Exception e) {
			throw new MemberException("사원 정보 목록 검색 중 오류 발생");
		}
	}
}
