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
import lombok.Data;
import lombok.NoArgsConstructor;

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
	@ApiOperation("member 생성, id 필수입니다, 생성 성공시 mem_id 반환")
	public ResponseEntity<Map<String, Object>> insert(@RequestBody createMemberRequest cmr) {
		service.insertMember(cmr.getMem_id(), cmr.getMem_pw(), cmr.getMem_email(), cmr.getMem_nick());
		return handleSuccess(cmr.getMem_id());
	}
	
	@NoArgsConstructor
	@Data
	private static class createMemberRequest {
		private String mem_id;
		private String mem_pw;
		private String mem_email;
		private String mem_nick;
	}

	// READ
	@GetMapping("/api/member")
	@ApiOperation("(운영자) 회원 목록 8개 컬럼 조회, 아이디, 이메일, 닉네임, 권한, 가입일, 썸네일, 컬러, 폰트")
	public ResponseEntity<Map<String, Object>> searchAll() {
		return handleSuccess(service.searchAll());
	}
	
	@GetMapping("/api/member/searchByIdLike/{mem_id}")
	@ApiOperation("회원 아이디로 조회하는 기능, like % 사용으로 검색")
	public ResponseEntity<Map<String, Object>> searchByIdLike(@PathVariable String mem_id) {
		return handleSuccess(service.searchByIdLike(mem_id));
	}
	
	@GetMapping("/api/member/searchByNickLike/{mem_nick}")
	@ApiOperation("회원 아이디로 조회하는 기능, like % 사용으로 검색")
	public ResponseEntity<Map<String, Object>> searchByNickLike(@PathVariable String mem_nick) {
		return handleSuccess(service.searchByNickLike(mem_nick));
	}

	@GetMapping("/api/member/{mem_id}")
	@ApiOperation("회원 한명을 정확히 조회 하는 기능")
	public ResponseEntity<Map<String, Object>> search(@PathVariable String mem_id) {
		return handleSuccess(service.search(mem_id));
	}
	
	
	// UPDATE
	@PutMapping("/api/member")
	@ApiOperation("member 정보 수정, 변경 가능 : email, nick, thumb, color, font 변경 성공시 member를 리턴합니다")
	public ResponseEntity<Map<String, Object>> update(@RequestBody updateMemberRequest umr) {	
		service.updateMember(umr.getMem_id(), umr.getMem_email(), umr.getMem_nick(),
							umr.getMem_thumb(), umr.getMem_color(), umr.getMem_font());
		return handleSuccess(umr);
	}
	
	@NoArgsConstructor
	@Data
	private static class updateMemberRequest {
		private String mem_id;
		private String mem_email;
		private String mem_nick;
		private String mem_thumb;
		private String mem_color;
		private int mem_font;
	}
	
	
	// DELETE
	@DeleteMapping("/api/member/{mem_id}")
	@ApiOperation("member 정보 삭제, (1) 권한 3(탈퇴)으로 수정 (2) 전체 글 비공개 전환 ")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable String mem_id) {
		service.deleteMember(mem_id);
		service.hidecardlists(mem_id);
		return handleSuccess(mem_id + "의 탈퇴 처리 완료");
	}
	
	/**
	 * 로그인 설정 
	 * state 가 fail 이면 로그인 실패
	 * state 가 ok 이고 data가 true면 admin, data가 false면 일반회원
	 * 아니면 data로 id를 돌려줘야 하나?
	 */
	@PostMapping("/api/member/login")
	@ApiOperation("아이디와 비밀번호를 사용해 로그인, 성공시 member 리턴")
	public ResponseEntity<Map<String,Object>> login(@RequestBody loginRequest payload){
		return handleSuccess(service.login(payload.getMem_id(), payload.getMem_pw()));
	}
	
	@NoArgsConstructor
	@Data
	private static class loginRequest {
		private String mem_id;
		private String mem_pw;
	}
	
			
	@PatchMapping("/api/member/password/{mem_id}")
	@ApiOperation("member의 비밀번호 수정, 전달 인자 data : {\"old_pw\" : \"test\", \"new_pw\" : \"test\"} ")
	public ResponseEntity<Map<String, Object>> patchpassword(@PathVariable String mem_id, @RequestBody passwordRequest payload) {	
		service.patchpassword(mem_id, payload.getOld_pw(), payload.getNew_pw());
		return handleSuccess(service.search(mem_id));
	}
	
	@NoArgsConstructor
	@Data
	private static class passwordRequest {
		private String old_pw;
		private String new_pw;
	}
	
	@PatchMapping("/api/member/{mem_id}/color/{mem_color}")
	@ApiOperation("member의 선호하는 색상 수정, 아이디와 색상만 전달")
	public ResponseEntity<Map<String, Object>> patchcolor(@PathVariable String mem_id, @PathVariable String mem_color) {	
		service.patchcolor(mem_id, mem_color);
		return handleSuccess(mem_color);
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
	@ApiOperation("(운영자) 글쓰기 권한 설정, 회원 목록 또는 회원 관리창에서 설정할 수 있습니다."
			+ "누를때마다 일반<->정지 회원으로 변경되도록 설정되어있습니다. 수정이 필요하면 말해주세요")
	public ResponseEntity<Map<String, Object>> patchAuth(@PathVariable String mem_id) {
		service.patchAuth(mem_id);
		return handleSuccess(mem_id + "의 글쓰기 권한이 " + (service.getAuth(mem_id)==1?"일반":"정지") +"회원으로 변경되었습니다.");
	}	
	
	@GetMapping("/api/member/postdef/{mem_id}")
	@ApiOperation("회원아이디를 넣으면 앞으로 쓸 카드의 기본 비밀글 설정을 확인할 수 있는 api, isSecret? 기본적으로 공개 설정이면 false")
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
	
	
	
	
}
