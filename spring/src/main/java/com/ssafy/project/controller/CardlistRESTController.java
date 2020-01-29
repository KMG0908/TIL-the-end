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
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.project.dto.Cardlist;
import com.ssafy.project.service.CardlistService;

import io.swagger.annotations.ApiOperation;

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
	@ApiOperation("cardlist 신규 생성, board_id는 필수, cards는 ,로 구분합니다, 생성 성공시 cardlist_id 반환")
	public ResponseEntity<Map<String, Object>> insert(@RequestBody Cardlist cardlist) {
		service.insertCardlist(cardlist);
		int cardlist_id = service.getMaxCardlistId();
		return handleSuccess(cardlist_id);
	}

	// READ
	@GetMapping("/api/cardlist/{cardlist_id}")
	@ApiOperation("카드리스트 하나를 조회하는 기능, 아이디(숫자)를 넘기면 이름과 카드들(string)이 반환됩니다")
	public ResponseEntity<Map<String, Object>> search(@PathVariable int cardlist_id) {
		return handleSuccess(service.search(cardlist_id));
	}

	// UPDATE
	@PutMapping("/api/cardlist")
	@ApiOperation("cardlist 정보 수정, board_id는 입력하지 않아도 됩니다. 수정이 가능한 정보는 name, cards 두가지입니다.")
	public ResponseEntity<Map<String, Object>> update(@RequestBody Cardlist cardlist) {
		service.updateCardlist(cardlist);
		return handleSuccess(cardlist.getCardlist_id() + "번 카드리스트 수정 완료");
	}

	// DELETE
	@DeleteMapping("/api/cardlist/{cardlist_id}")
	@ApiOperation("cardlist 정보 삭제")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable int cardlist_id) {
		service.deleteCardlist(cardlist_id);
		return handleSuccess(cardlist_id + "번 카드리스트 삭제 완료");
	}
	
	// PATCH
	@PatchMapping("/api/cardlist/{cardlist_id}")
	@ApiOperation("cardlist의 cards만 수정하는 patch rest api 입니다")
	public ResponseEntity<Map<String, Object>> patch(@RequestBody Cardlist cardlist) {
		service.patch(cardlist);
		return handleSuccess(cardlist.getCardlist_id() + "번 카드리스트의 패치 완료");
	}
	

}
