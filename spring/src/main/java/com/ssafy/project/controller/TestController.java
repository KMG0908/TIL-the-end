	package com.ssafy.project.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

@RestController
public class TestController {
	
	@PostMapping("/api/ip")
	@ApiOperation("요청을 보낸 클라이언트의 IP주소를 반환합니다.")
	public ResponseEntity<String> ip (HttpServletRequest request) {
		return ResponseEntity.ok(request.getRemoteAddr());
	}
}