package com.ssafy.project.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.project.dto.Heart;
import com.ssafy.project.service.HeartService;

import io.swagger.annotations.ApiOperation;

@RestController
public class HeartRESTController {

	@Autowired
	private HeartService service;

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

	
	@PostMapping("/api/heart")
	@ApiOperation("좋아요 추가")
	public ResponseEntity<Map<String, Object>> insertHeart(@RequestBody Heart heart) {
		service.insertHeart(heart);
		return handleSuccess(heart.getCardlist_id() + "번 글에 좋아요 표시하였습니다.");
	}

	@DeleteMapping("/api/heart")
	@ApiOperation("좋아요 취소")
	public ResponseEntity<Map<String, Object>> deleteHeart(@RequestBody Heart heart) {
		service.deleteHeart(heart);
		return handleSuccess(heart.getCardlist_id() + "번 글의 좋아요를 취소하였습니다.");
	}

	@GetMapping("/api/heart/cids/{mem_id}")
	@ApiOperation("mem_id가 좋아요 하고 있는 cardlist의 번호 목록을 반환합니다.")
	public ResponseEntity<Map<String, Object>> cidWhatILike(@PathVariable String mem_id) {
		return handleSuccess(service.cidWhatILike(mem_id));
	}
	
	@GetMapping("/api/heart/whatilike/{mem_id}")
	@ApiOperation("mem_id가 좋아요 하고 있는 cardlist 배열을 반환합니다. querystring으로 limit와 page 변수를 받아서 limit * (page-1) 부터 limit 개의 cardlist 배열을 반환")
	public ResponseEntity<Map<String, Object>> searchWhatILike(@PathVariable String mem_id,  @RequestParam int limit, @RequestParam int page) {
		return handleSuccess(service.searchWhatILike(mem_id, limit, page));
	}
	
	@GetMapping("/api/heart/wholikeit/{cardlist_id}")
	@ApiOperation("cardlist_id번 글을 좋아요 하고 있는 mem_id의 목록을 반환합니다")
	public ResponseEntity<Map<String, Object>> searchWhoHeartMe(@PathVariable int cardlist_id) {
		return handleSuccess(service.searchWhoLikeIt(cardlist_id));
	}

}
