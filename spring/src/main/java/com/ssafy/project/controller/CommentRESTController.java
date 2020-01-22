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

import com.ssafy.project.dto.Comment;
import com.ssafy.project.service.CommentService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
public class CommentRESTController {

	@Autowired
	private CommentService service;

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
	@PostMapping("/api/comment")
	@ApiOperation("comment 신규 생성")
	public ResponseEntity<Map<String, Object>> insert(@RequestBody Comment comment) {
		service.insertComment(comment);
		int comment_id = service.getMaxCommentId();
		return handleSuccess(comment_id + "번 코멘트 생성 완료");
	}

	// READ
	@GetMapping("/api/comment/{cardlist_id}")
	@ApiOperation("카드 리스트의 코멘트들을 조회하는 기능")
	public ResponseEntity<Map<String, Object>> searchAll(@PathVariable int cardlist_id) {
		return handleSuccess(service.searchAll(cardlist_id));
	}

	// UPDATE
	@PutMapping("/api/comment")
	@ApiOperation("comment 수정")
	public ResponseEntity<Map<String, Object>> update(@RequestBody Comment comment) {
		service.updateComment(comment);
		return handleSuccess("수정 완료");
	}

	// DELETE
	@DeleteMapping("/api/comment/{comment_id}")
	@ApiOperation("comment 삭제")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable int comment_id) {
		service.deleteComment(comment_id);
		return handleSuccess("삭제 완료");
	}

}
