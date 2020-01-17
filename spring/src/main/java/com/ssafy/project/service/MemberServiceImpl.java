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

	@Override
	public void insertMember(Member member) {
		try {
			dao.insertMember(member);
		} catch (Exception e) {
			e.printStackTrace();
			throw new MemberException("회원 정보 등록 중 오류 발생");
		}

	}

	@Override
	public List<Member> searchAll() {
		try {
			return dao.searchAll();
		} catch (Exception e) {
			throw new MemberException("회원 목록 조회 중 오류 발생");
		}
	}

	@Override
	public Member search(String mem_id) {
		try {
			Member member = dao.search(mem_id);
			if (member == null) {
				throw new MemberException("등록되지 않은 회원입니다.");
			}
			return member;
		} catch (Exception e) {
			e.printStackTrace();
			if (e instanceof MemberException) {
				throw (MemberException) e;
			} else {
				throw new MemberException("회원 정보 조회 중 오류 발생");
			}
		}
	}

	@Override
	public void updateMember(Member member) {
		try {
			dao.updateMember(member);
		} catch (Exception e) {
			e.printStackTrace();
			throw new MemberException("회원 정보 수정 중 오류 발생");
		}

	}

	@Override
	public void deleteMember(String mem_id) {
		try {
			dao.deleteMember(mem_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new MemberException("회원 정보 삭제 중 오류 발생");
		}
	}
}
