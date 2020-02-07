package com.ssafy.project.controller;

import java.util.HashMap;
import java.util.Map;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.project.dto.Member;
import com.ssafy.project.service.MemberService;

import io.swagger.annotations.ApiOperation;

@RestController
public class MemberRESTController {

	@Autowired
	private MemberService service;

	public ResponseEntity<Map<String, Object>> handleSuccess(Object data) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("state", "ok");
		resultMap.put("data", data);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	public ResponseEntity<Map<String, Object>> handleFail(Object data, HttpStatus status) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("state", "fail");
		resultMap.put("data", data);
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@ExceptionHandler
	public ResponseEntity<Map<String, Object>> handler(Exception e) {
		return handleFail(e.getMessage(), HttpStatus.OK);
	}

	// CREATE
	@PostMapping("/api/member")
	@ApiOperation("member 생성, id 필수입니다, 생성 성공시 mem_id(String) 반환")
	public ResponseEntity<Map<String, Object>> insert(@RequestBody Member member) {
		service.insertMember(member);
		return handleSuccess(member.getMem_id());
	}

	// READ
	@GetMapping("/api/member")
	@ApiOperation("회원 목록을 조회하는 기능, 운영자 사용 용도")
	public ResponseEntity<Map<String, Object>> searchAll() {
		return handleSuccess(service.searchAll());
	}
	
	
	
	@GetMapping("/api/member/searchById/{mem_id}")
	@ApiOperation("회원 아이디로 조회하는 기능, like % 사용으로 검색")
	public ResponseEntity<Map<String, Object>> searchIdLike(@PathVariable String mem_id) {
		return handleSuccess(service.searchIdLike(mem_id));
	}
	
	@GetMapping("/api/member/searchByNick/{mem_nick}")
	@ApiOperation("회원 아이디로 조회하는 기능, like % 사용으로 검색")
	public ResponseEntity<Map<String, Object>> searchNickLike(@PathVariable String mem_nick) {
		return handleSuccess(service.searchNickLike(mem_nick));
	}

	@GetMapping("/api/member/{mem_id}")
	@ApiOperation("회원 한명을 정확히 조회 하는 기능")
	public ResponseEntity<Map<String, Object>> search(@PathVariable String mem_id) {
		return handleSuccess(service.search(mem_id));
	}

	// UPDATE
	@PutMapping("/api/member")
	@ApiOperation("member 정보 수정, 가입일 수정 불가, 비밀번호는 서버의 비밀번호와 비교해서 같으면 변경하는 용도입니다, 변경 성공시 member를 리턴합니다")
	public ResponseEntity<Map<String, Object>> update(@RequestBody Member member) {	
		service.updateMember(member);
		return handleSuccess(service.search(member.getMem_id()));
	}
	
	@PatchMapping("/api/member/password/{mem_id}")
	@ApiOperation("member의 비밀번호 수정, 전달 인자 data : {\"old_pw\" : \"test\", \"new_pw\" : \"test\"} ")
	public ResponseEntity<Map<String, Object>> patchpassword(@PathVariable String mem_id, @RequestBody Map<String, Object> payload) {	
		service.patchpassword(mem_id, (String)payload.get("old_pw"), (String)payload.get("new_pw"));
		return handleSuccess(service.search(mem_id));
	}

	// DELETE
	@DeleteMapping("/api/member/{mem_id}")
	@ApiOperation("member 정보 삭제, (1)권한 3(탈퇴)으로 수정, (2)등록된 이메일로 탈퇴 안내 발송, 일주일 후 전체 게시글 삭제, (3) 기타 ")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable String mem_id) {
		service.deleteMember(mem_id);
		return handleSuccess(mem_id + "의 탈퇴 처리 완료");
	}
	
	/*
	 * 권한 설정 
	 */
	@GetMapping("/api/member/auth/{mem_id}")
	@ApiOperation("회원아이디를 넣으면 권한을 확인할 수 있는 api, 0이면 운영자, 1이면 일반유저, 2면 정지, 3이면 탈퇴한 유저.")
	public ResponseEntity<Map<String, Object>> getAuth(@PathVariable String mem_id) {
		return handleSuccess(service.getAuth(mem_id));
	}
	
	@PatchMapping("/api/member/auth/{mem_id}")
	@ApiOperation("글쓰기 권한 설정, 운영자가 회원 목록 또는 회원 관리창에서 설정할 수 있습니다."
			+ "누를때마다 일반<->정지 회원으로 변경되도록 설정되어있습니다. 수정이 필요하면 말해주세요")
	public ResponseEntity<Map<String, Object>> patchAuth(@PathVariable String mem_id) {
		service.patchAuth(mem_id);
		return handleSuccess(mem_id + "의 글쓰기 권한이 변경되었습니다.");
	}
	
	
	@GetMapping("/api/member/postdef/{mem_id}")
	@ApiOperation("회원아이디를 넣으면 앞으로 쓸 카드의 기본 설정을 확인할 수 있는 api, 기본적으로 공개 설정이면 true")
	public ResponseEntity<Map<String, Object>> getpostdef(@PathVariable String mem_id) {
		return handleSuccess(service.getpostdef(mem_id));
	}
	
	@PatchMapping("/api/member/postdef/{mem_id}")
	@ApiOperation("카드 공개 설정 변경 권한은 사용자가 가집니다. 권한이 1인 일반 유저만 변경 가능"
			+ "누를때마다 기본 공개<->기본 비공개로 변경되도록 설정되어있습니다. 수정이 필요하면 말해주세요")
	public ResponseEntity<Map<String, Object>> patchpostdef(@PathVariable String mem_id) {
		service.patchpostdef(mem_id);
		return handleSuccess(mem_id + "의 공개 설정이 변경되었습니다.");
	}
	
	
	
	
	
	/**
	 * 로그인 설정 
	 * state 가 fail 이면 로그인 실패
	 * state 가 ok 이고 data가 true면 admin, data가 false면 일반회원
	 * 아니면 data로 id를 돌려줘야 하나?
	 */
	@PostMapping("/api/member/login")
	@ApiOperation("전달 인자 data : {\"mem_id\" : \"test\", \"mem_pw\" : \"test\" }, 참고 : https://zzznara2.tistory.com/761,  패스워드가 null로 처리되어 리턴됩니다")
	public ResponseEntity<Map<String,Object>> login(@RequestBody Map<String, Object> payload){
		return handleSuccess(service.login((String)payload.get("mem_id"), (String)payload.get("mem_pw")));
	}
	
//	@PostMapping("/api/member/login/")
//	@ApiOperation("id와 pw로 로그인")
//	public ResponseEntity<Map<String, Object>> login(@RequestBody Member member){
//		
//		/* 디버그 코드 */
//		System.out.println("member : " + member);
//		
//		
//		return handleSuccess(service.login(member.getMem_id(), member.getMem_pw()));
//	}
	
	
	
}
