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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	@ApiOperation("member 정보 등록")
	public ResponseEntity<Map<String, Object>> insert(@RequestBody Member member) {
		service.insertMember(member);
		return handleSuccess("생성 완료");
	}

	// READ
	@GetMapping("/api/member")
	@ApiOperation("회원 목록을 조회하는 기능")
	public ResponseEntity<Map<String, Object>> searchAll() {
		return handleSuccess(service.searchAll());
	}

	@GetMapping("/api/member/{mem_id}")
	@ApiOperation("회원 한명을 조회 하는 기능")
	public ResponseEntity<Map<String, Object>> search(@PathVariable String mem_id) {
		return handleSuccess(service.search(mem_id));
	}

	// UPDATE
	@PutMapping("/api/member")
	@ApiOperation("member 정보 수정")
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

	
}
