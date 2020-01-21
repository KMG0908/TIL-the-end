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

import com.ssafy.project.dto.Board;
import com.ssafy.project.service.BoardService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
public class BoardRESTController {

	@Autowired
	private BoardService service;

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
	@PostMapping("/api/board")
	@ApiOperation("board 신규 생성, board_id 빼고 전부 필요")
	public ResponseEntity<Map<String, Object>> insert(@RequestBody Board board) {
		service.insertBoard(board);
		return handleSuccess("생성 완료");
	}

	// READ
	@GetMapping("/api/board/member/{mem_id}/data/{board_date}")
	@ApiOperation("보드 유저 - 날짜 조회")
	public ResponseEntity<Map<String, Object>> searchAllUserDate(@PathVariable String mem_id, @PathVariable String board_date) {
		return handleSuccess(service.searchAllUserDate(mem_id, board_date));
	}
	
	@GetMapping("/api/board/member/{mem_id}")
	@ApiOperation("보드 유저 - todo 조회")
	public ResponseEntity<Map<String, Object>> searchAllUserToDo(@PathVariable String mem_id) {
		return handleSuccess(service.searchAllUserToDo(mem_id));
	}
	
	@GetMapping("/api/board/{board_id}")
	@ApiOperation("보드 유저 - 카드 리스트 조회")
	public ResponseEntity<Map<String, Object>> searchAllCardLists(@PathVariable int board_id) {
		return handleSuccess(service.searchAllCardLists(board_id));
	}

	// UPDATE
	@PutMapping("/api/board")
	@ApiOperation("board 정보 수정, board_type, board_date, board_lists, board_id 4개 필요")
	public ResponseEntity<Map<String, Object>> update(@RequestBody Board board) {
		service.updateBoard(board);
		return handleSuccess("수정 완료");
	}

	// DELETE
	@DeleteMapping("/api/board/{board_id}")
	@ApiOperation("board 정보 삭제")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable int board_id) {
		service.deleteBoard(board_id);
		return handleSuccess("삭제 완료");
	}

}
