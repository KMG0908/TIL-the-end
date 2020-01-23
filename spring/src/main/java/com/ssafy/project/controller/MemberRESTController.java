package com.ssafy.project.controller;

import java.util.HashMap;
import java.util.Map;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.project.dto.Member;
import com.ssafy.project.service.MemberService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
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
	@ApiOperation("member 생성, id 필수입니다")
	public ResponseEntity<Map<String, Object>> insert(@RequestBody Member member) {
		service.insertMember(member);
		return handleSuccess(member.getMem_id());
	}

	// READ
	@GetMapping("/api/member")
	@ApiOperation("회원 목록을 조회하는 기능")
	public ResponseEntity<Map<String, Object>> searchAll() {
		return handleSuccess(service.searchAll());
	}
	
	@GetMapping("/api/member/search/{mem_id}")
	@ApiOperation("회원 아이디로 조회하는 기능, like % 사용으로 검색")
	public ResponseEntity<Map<String, Object>> searchIdLike(@PathVariable String mem_id) {
		return handleSuccess(service.searchIdLike(mem_id));
	}

	@GetMapping("/api/member/{mem_id}")
	@ApiOperation("회원 한명을 정확히 조회 하는 기능")
	public ResponseEntity<Map<String, Object>> search(@PathVariable String mem_id) {
		return handleSuccess(service.search(mem_id));
	}

	// UPDATE
	@PutMapping("/api/member")
	@ApiOperation("member 정보 수정, 가입일 수정 불가, 비번 변경 가능합니다. 나중에 수정")
	public ResponseEntity<Map<String, Object>> update(@RequestBody Member member) {
		service.updateMember(member);
		return handleSuccess("수정 완료");
	}

	// DELETE
	@DeleteMapping("/api/member/{mem_id}")
	@ApiOperation("member 정보 삭제")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable String mem_id) {
		service.deleteMember(mem_id);
		return handleSuccess("삭제 완료");
	}
	
	/*
	 * 권한 설정 
	 */
	@GetMapping("/api/member/auth/{mem_id}")
	@ApiOperation("회원아이디를 넣으면 글쓰기 권한이 있는지 알려주는 api입니다.")
	public ResponseEntity<Map<String, Object>> hasAuth(@PathVariable String mem_id) {
		return handleSuccess(service.hasAuth(mem_id));
	}
	
	@PatchMapping("/api/member/auth/{mem_id}")
	@ApiOperation("글쓰기 권한 설정, 운영자가 회원 목록 또는 회원 관리창에서 설정할 수 있습니다. "
			+ "누를때마다 true<->false 가 변경되도록 설정되어있습니다. 수정이 필요하면 말해주세요")
	public ResponseEntity<Map<String, Object>> patchAuth(@PathVariable String mem_id) {
		service.patchAuth(mem_id);
		return handleSuccess(mem_id + "의 글쓰기 권한이 변경되었습니다.");
	}
	
	/**
	 * 로그인 설정 
	 * state 가 fail 이면 로그인 실패
	 * state 가 ok 이고 data가 true면 admin, data가 false면 일반회원
	 * 아니면 data로 id를 돌려줘야 하나?
	 */
	@PostMapping("/api/member/login/")
	@ApiOperation("전달 인자 data : {\"id\" : \"test\", \"pw\" : \"test\" }, 참고 : https://zzznara2.tistory.com/761,  패스워드가 null로 처리되어 리턴됩니다")
	public ResponseEntity<Map<String,Object>> login(@RequestBody Map<String, Object> payload){
		return handleSuccess(service.login((String)payload.get("id"), (String)payload.get("pw")));
	}
	
	@PostMapping("/api/member/login/{mem_id}")
	@ApiOperation("id와 pw로 로그인")
	public ResponseEntity<Map<String, Object>> login(@PathVariable String mem_id, @RequestBody Object mem_pw){
		return handleSuccess(service.login(mem_id, (String)mem_pw));
	}
}
