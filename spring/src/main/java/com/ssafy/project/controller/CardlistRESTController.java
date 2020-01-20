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

import com.ssafy.project.dto.Cardlist;
import com.ssafy.project.service.CardlistService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
public class CardlistRESTController {

	@Autowired
	private CardlistService service;

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
	@PostMapping("/api/cardlist")
	@ApiOperation("cardlist 신규 생성")
	public ResponseEntity<Map<String, Object>> insert(@RequestBody Cardlist cardlist) {
		service.insertCardlist(cardlist);
		return handleSuccess("생성 완료");
	}

	// READ
	@GetMapping("/api/cardlist/of/{mem_id}")
	@ApiOperation("회원 한 명의 아직 발행하지 않은 카드리스트를 조회하는 기능")
	public ResponseEntity<Map<String, Object>> searchAll(@PathVariable String mem_id) {
		return handleSuccess(service.searchAll(mem_id));
	}

	@GetMapping("/api/cardlist/{cardlist_id}")
	@ApiOperation("카드리스트 하나를 조회하는 기능")
	public ResponseEntity<Map<String, Object>> search(@PathVariable int cardlist_id) {
		return handleSuccess(service.search(cardlist_id));
	}

	// UPDATE
	@PutMapping("/api/cardlist")
	@ApiOperation("cardlist 정보 수정")
	public ResponseEntity<Map<String, Object>> update(@RequestBody Cardlist cardlist) {
		service.updateCardlist(cardlist);
		return handleSuccess("수정 완료");
	}

	// DELETE
	@DeleteMapping("/api/cardlist/{cardlist_id}")
	@ApiOperation("cardlist 정보 삭제")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable int cardlist_id) {
		service.deleteCardlist(cardlist_id);
		return handleSuccess("삭제 완료");
	}

	
}
