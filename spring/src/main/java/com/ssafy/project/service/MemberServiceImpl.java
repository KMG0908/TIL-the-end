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
			if(dao.searchId(member.getMem_id())) {
				throw new MemberException("동일한 아이디가 존재합니다");
			} else if(dao.searchEmail(member.getMem_email())) {
				throw new MemberException("동일한 이메일이 존재합니다");
			} else if(dao.searchNick(member.getMem_nick())) {
				throw new MemberException("동일한 닉네임이 존재합니다");
			} else {
				dao.insertMember(member);	
				dao.grantMember(member.getMem_id());
			}
		} catch (Exception e) {
			e.printStackTrace();
			if (e instanceof MemberException) {
				throw (MemberException) e;
			} else {
				throw new MemberException("회원 가입 중 오류 발생");
			}
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
	public List<Member> searchIdLike(String mem_id) {
		try {
			return dao.searchIdLike(mem_id);
		} catch (Exception e) {
			throw new MemberException("회원 아이디 검색 중 오류 발생");
		}
	}

	@Override
	public List<Member> searchNickLike(String mem_nick) {
		try {
			return dao.searchNickLike(mem_nick);
		} catch (Exception e) {
			throw new MemberException("회원 닉네임 검색 중 오류 발생");
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

	@Override
	public Member login(String mem_id, String mem_pw) {
		try {
			Member member = dao.search(mem_id);
			if (member == null) {
				throw new MemberException("등록되지 않은 회원입니다.");
			}
			if (!member.getMem_pw().equals(mem_pw)) {
				throw new MemberException("비밀번호 오류");
			} else {
				member.setMem_pw(null);
				return member;
			}
		} catch (Exception e) {
			e.printStackTrace();
			if (e instanceof MemberException) {
				throw (MemberException) e;
			} else {
				throw new MemberException("회원 로그인 중 오류 발생");
			}
		}
	}

	@Override
	public int getAuth(String mem_id) {
		try {
			return dao.getAuth(mem_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new MemberException(mem_id + "의 회원 권한 조회 중 오류 발생");
		}
	}

	@Override
	public void patchAuth(String mem_id) {
		try {
			dao.patchAuth(mem_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new MemberException(mem_id + "의 회원 권한 변경 중 오류 발생");
		}

	}

	@Override
	public boolean getpostdef(String mem_id) {
		try {
			return dao.getpostdef(mem_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new MemberException(mem_id + "의 글쓰기 기본 설정 조회 중 오류 발생");
		}
	}

	@Override
	public void patchpostdef(String mem_id) {
		try {
			dao.patchpostdef(mem_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new MemberException(mem_id + "의 글쓰기 기본 설정 변경 중 오류 발생");
		}
	}

}
