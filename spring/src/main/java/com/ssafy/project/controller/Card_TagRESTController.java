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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.project.dto.Card_Tag;
import com.ssafy.project.service.Card_TagService;

import io.swagger.annotations.ApiOperation;

@RestController
public class Card_TagRESTController {

	@Autowired
	private Card_TagService service;

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
	@PostMapping("/api/card_tag")
	@ApiOperation("cardtag 신규 생성, card_id와, tag_id가 있어야 한다, 생성 성공시 card_tag_id 반환")
	public ResponseEntity<Map<String, Object>> insert(@RequestBody Card_Tag card_tag) {
		service.insertCard_Tag(card_tag);
		int card_tag_id = service.getMaxCardTagId();
		return handleSuccess(card_tag_id);
	}

	// READ
	@GetMapping("/api/card_tag/of/{card_id}")
	@ApiOperation("카드 하나의 태그들을 조회하는 기능")
	public ResponseEntity<Map<String, Object>> searchAll(@PathVariable int card_id) {
		return handleSuccess(service.searchAll(card_id));
	}

	// DELETE
	@DeleteMapping("/api/card_tag/{card_tag_id}")
	@ApiOperation("cardtag 정보 삭제")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable int card_tag_id) {
		service.deleteCard_Tag(card_tag_id);
		return handleSuccess(card_tag_id + "번 카드-태그 삭제 완료");
	}

}
