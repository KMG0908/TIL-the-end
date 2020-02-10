package com.ssafy.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.project.dao.MemberDao;
import com.ssafy.project.dto.Member;
import com.ssafy.project.dto.MemberException;
import com.ssafy.project.dto.SNS;

@Service
public class MemberServiceImpl implements MemberService {

	@Autowired
	private MemberDao dao;

	@Override
	public void insertMember(Member member) {
		try {
			if (dao.countId(member.getMem_id()) == 1) {
				throw new MemberException("동일한 아이디가 존재합니다");
			} else if (dao.searchEmail(member.getMem_email()) == 1) {
				throw new MemberException("동일한 이메일이 존재합니다");
//			} else if(dao.searchNick(member.getMem_nick())==1) {
//				throw new MemberException("동일한 닉네임이 존재합니다");
			} else {
				dao.insertMember(member);
//				System.out.println("member 생성 통과");
				dao.grantMember(member.getMem_id());
//				System.out.println("member 권한 통과");
//				dao.createBoard(member.getMem_id());
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
			member.setMem_pw(null);
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
			Member diff = dao.search(member.getMem_id());
			if (!member.getMem_pw().equals(diff.getMem_pw())) {
				throw new MemberException("비밀번호가 틀립니다");
			}
			dao.updateMember(member);
		} catch (Exception e) {
			e.printStackTrace();
			if (e instanceof MemberException) {
				throw (MemberException) e;
			} else {
				throw new MemberException("회원 정보 수정 중 오류 발생");
			}
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
			if (dao.getAuth(mem_id) == 3) {
				throw new MemberException("탈퇴한 회원입니다.");
			}
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
	public void patchpassword(String mem_id, String old_pw, String new_pw) {
		try {
			Member diff = dao.search(mem_id);
			if (!diff.getMem_pw().equals(old_pw)) {
				throw new MemberException("비밀번호가 틀립니다");
			}
			dao.updatePassword(mem_id, new_pw);
		} catch (Exception e) {
			e.printStackTrace();
			if (e instanceof MemberException) {
				throw (MemberException) e;
			} else {
				throw new MemberException("회원 비밀번호 수정 중 오류 발생");
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
			return dao.getpostdef(mem_id) == 1;
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

	@Override
	public Member naverLogin(Member naver) {
		try {
			// 경우의 수 1 : 네이버 이메일로 가입된 아이디가 없다면 멤버 신규 생성 sns 신규 생성 연결 및 리턴
			if(dao.searchEmail(naver.getMem_email()) == 0) {
				dao.insertMember(naver);
				dao.grantMember(naver.getMem_id());
				SNS sns = new SNS();
				sns.setMem_id(naver.getMem_id());
				sns.setSns_nid(Integer.parseInt(naver.getMem_id().split("_")[1]));
				sns.setMem_email(naver.getMem_email());
				sns.setProvider("NAVER");	
				dao.insertSNS(sns);
				return naver;
				
			// 경우의 수 2 : 네이버 이메일로 가입된 아이디가 있지만 sns 테이블에 없다면 sns 생성 후 연결 리턴
			} else if(dao.countSNSByEmail(naver.getMem_email()) == 0){
				SNS sns = new SNS();
				String mem_email = naver.getMem_email();
				String mem_id = dao.searchIdByEmail(mem_email);
				sns.setMem_id(mem_id);
				sns.setSns_nid(Integer.parseInt(naver.getMem_id().split("_")[1]));
				sns.setMem_email(naver.getMem_email());
				sns.setProvider("NAVER");	
				dao.insertSNS(sns);				
				return dao.search(mem_id);
				
			// 경우의 수 3 : 네이버 이메일로 가입된 아이디가 있고 sns 테이블을 확인해 있다면 바로 리턴
			} else {
				return dao.search(dao.searchSNSIdByEmail(naver.getMem_email()));
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new MemberException("네이버 아이디 로그인 중 오류 발생");
		}
	}

}
