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

import com.ssafy.project.dto.Card;
import com.ssafy.project.service.CardService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
public class CardRESTController {

	@Autowired
	private CardService service;

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
	@PostMapping("/api/card")
	@ApiOperation("card 신규 생성, 권한에 따라 비공개 설정이 기본일 경우 true를 주어야 함, name과 contents가 비어있지 않도록 해주세요")
	public ResponseEntity<Map<String, Object>> insert(@RequestBody Card card) {
		service.insertCard(card);
		return handleSuccess("생성 완료");
	}

	// READ
	@GetMapping("/api/card/{card_id}")
	@ApiOperation("카드 하나를 조회하는 기능")
	public ResponseEntity<Map<String, Object>> search(@PathVariable int card_id) {
		return handleSuccess(service.search(card_id));
	}

	// UPDATE
	@PutMapping("/api/card")
	@ApiOperation("card 정보 수정, 수정이 가능한 정보는 name, contents, secret 세가지입니다")
	public ResponseEntity<Map<String, Object>> update(@RequestBody Card card) {
		service.updateCard(card);
		return handleSuccess("수정 완료");
	}

	// DELETE
	@DeleteMapping("/api/card/{card_id}")
	@ApiOperation("card 정보 삭제")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable int card_id) {
		service.deleteCard(card_id);
		return handleSuccess("삭제 완료");
	}

}
