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

import com.ssafy.project.dto.Tag;
import com.ssafy.project.service.TagService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
public class TagRESTController {

	@Autowired
	private TagService service;

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
	@PostMapping("/api/tag")
	@ApiOperation("tag 신규 생성, 이미 존재할 경우 오류발생 & 생성하지 못한다")
	public ResponseEntity<Map<String, Object>> insert(@RequestBody Tag tag) {
		service.insertTag(tag);
		return handleSuccess("생성 완료");
	}

	// READ
	@GetMapping("/api/tag")
	@ApiOperation("공개 게시글의 태그를 전부 조회하는 기능")
	public ResponseEntity<Map<String, Object>> searchAll() {
		return handleSuccess(service.searchAll());
	}

	@GetMapping("/api/tag/{tag_id}")
	@ApiOperation("태그 하나를 조회하는 기능")
	public ResponseEntity<Map<String, Object>> search(@PathVariable int tag_id) {
		return handleSuccess(service.search(tag_id));
	}

	// UPDATE
	@PutMapping("/api/tag")
	@ApiOperation("tag 정보 수정, 수정가능한 정보는 이름뿐이다")
	public ResponseEntity<Map<String, Object>> update(@RequestBody Tag tag) {
		service.updateTag(tag);
		return handleSuccess("수정 완료");
	}

	// DELETE
	@DeleteMapping("/api/tag/{tag_id}")
	@ApiOperation("tag 정보 삭제")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable int tag_id) {
		service.deleteTag(tag_id);
		return handleSuccess("삭제 완료");
	}

	@GetMapping("/api/tag/who/{mem_id}")
	@ApiOperation("(수정중) 회원의 태그를 목록으로 조회하는 기능, tag_id가 공개글에서의 태그 사용횟수입니다")
	public ResponseEntity<Map<String, Object>> tagcloud(@PathVariable String mem_id) {
		return handleSuccess(service.tagcloud(mem_id));
	}

}
