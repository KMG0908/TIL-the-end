package com.ssafy.project.controller;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.project.dto.Card;
import com.ssafy.project.service.CardService;

import io.swagger.annotations.ApiOperation;
import lombok.Data;
import lombok.NoArgsConstructor;

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
	@ApiOperation("card 신규 생성, cardlist_id 필수, 권한에 따라 비공개 설정이 기본일 경우 true를 주어야 함")
	public ResponseEntity<Map<String, Object>> insert(@RequestBody Card card) {
		service.insertCard(card);
		int card_id = service.getMaxCardId();
		return handleSuccess(card_id);
	}

	// READ
	@GetMapping("/api/card/{card_id}")
	@ApiOperation("카드 하나를 조회하는 기능")
	public ResponseEntity<Map<String, Object>> search(@PathVariable int card_id) {
		return handleSuccess(service.search(card_id));
	}

	// UPDATE
	@PutMapping("/api/card")
	@ApiOperation("card 정보 수정, 수정이 가능한 정보는 name, contents, secret, cardlist_id 네가지입니다")
	public ResponseEntity<Map<String, Object>> update(@RequestBody Card card) {
		service.updateCard(card);
		return handleSuccess("수정 완료");
	}
	
	@PatchMapping("/api/card/{card_id}/to/{cardlist_id}")
	@ApiOperation("card를 이동할 때 카드의 외래키를 바꾸는 api 입니다")
	public ResponseEntity<Map<String, Object>> movecard(@PathVariable int card_id, @PathVariable int cardlist_id) {
		service.movecard(card_id, cardlist_id);
		return handleSuccess("이동 완료");
	}
	
	@PostMapping("/api/file/upload/{card_id}")
	@ApiOperation("(개발중, 사용X) card에 파일 추가, 파일은 서버의 upload 폴더에 카드번호 + _ + original 파일 이름으로 들어갑니다")
	public ResponseEntity<Map<String, Object>> uploadFile(@PathVariable int card_id, @RequestParam("file") MultipartFile sourceFile) throws IOException {
		String sourceFileName = sourceFile.getOriginalFilename();
//		System.out.println(sourceFileName);
//        String sourceFileNameExtension = FilenameUtils.getExtension(sourceFileName).toLowerCase();

        File destinationFile;
        String destinationFileName;
        
        destinationFileName = card_id + "_" + sourceFileName;
        destinationFile = new File("/upload/" + destinationFileName);
        
        // 경로상에 파일이 존재하지 않을 경우 부모 폴더를 File 형태로 반환한다..
		if(!destinationFile.exists()) 
		{
			destinationFile.getParentFile().mkdirs();
			
			try
			{
				// 파일 생성
				destinationFile.createNewFile(); 
			}
			catch(IOException e)
			{
				e.printStackTrace();
			}
		}
		try
		{
			sourceFile.transferTo(destinationFile);
		}
		catch(IOException e)
		{
			e.printStackTrace();
		}
        
        service.uploadFile(card_id, destinationFileName);       
        

        UploadAttachmentResponse response = new UploadAttachmentResponse();
        response.setFileName(sourceFile.getOriginalFilename());
        response.setFileSize(sourceFile.getSize());
        response.setFileContentType(sourceFile.getContentType());
        response.setAttachmentUrl("http://localhost:8080/upload/" + destinationFileName);
		return handleSuccess(response);
	}
	
	@NoArgsConstructor
    @Data
    private static class UploadAttachmentResponse {

        private String fileName;

        private long fileSize;

        private String fileContentType;

        private String attachmentUrl;
    }
	

	// DELETE
	@DeleteMapping("/api/card/{card_id}")
	@ApiOperation("card 정보 삭제")
	public ResponseEntity<Map<String, Object>> delete(@PathVariable int card_id) {
		service.deleteCard(card_id);
		return handleSuccess("삭제 완료");
	}
	
	@DeleteMapping("/api/file/delete/{card_id}")
	@ApiOperation("card 정보 삭제")
	public ResponseEntity<Map<String, Object>> deleteFile(@PathVariable int card_id) {
		service.deleteFile(card_id);
		return handleSuccess("삭제 완료");
	}
	
	// 기타 기능
	
	@GetMapping("/api/card/daily/public/{mem_id}/from/{from}/to/{to}")
	@ApiOperation("(수정중)사용자 아이디를 통해 날짜별로 공개된 카드의 개수를 구하는 기능, 날짜가 board_date, 개수가 board_id로 출력됩니다.")
	public ResponseEntity<Map<String, Object>> countPublicDailyCard(@PathVariable String mem_id, @PathVariable String from, @PathVariable String to){
		return handleSuccess(service.countPublicDailyCard(mem_id, from, to));
	}
	
	@GetMapping("/api/card/daily/private/{mem_id}/from/{from}/to/{to}")
	@ApiOperation("(수정중)사용자 아이디를 통해 날짜별로 전체(비공개 포함) 카드의 개수를 구하는 기능, 날짜가 board_date, 개수가 board_id로 출력됩니다.")
	public ResponseEntity<Map<String, Object>> countAllDailyCard(@PathVariable String mem_id , @PathVariable String from, @PathVariable String to) {
		return handleSuccess(service.countAllDailyCard(mem_id, from, to));
	}
	
	
	@GetMapping("/api/search/public/card/{mem_id}/by/{keyword}")
	@ApiOperation("A유저가 B유저를 검색) 특정문자열을 card title, desc 에서 포함여부를 찾아서 card 배열 반환하는 쿼리문")
	public ResponseEntity<Map<String, Object>> searchPublicCard(@PathVariable String mem_id,
			@PathVariable String keyword) {
		return handleSuccess(service.searchPublicCard(mem_id, keyword));
	}
	
	@GetMapping("/api/search/private/card/{mem_id}/by/{keyword}")
	@ApiOperation("A유저가 A유저를 검색) 특정문자열을 card title, desc 에서 포함여부를 찾아서 card 배열 반환하는 쿼리문")
	public ResponseEntity<Map<String, Object>> searchPrivateCard(@PathVariable String mem_id,
			@PathVariable String keyword) {
		return handleSuccess(service.searchPrivateCard(mem_id, keyword));
	}
	
	@GetMapping("/api/search/global/card/by/{keyword}")
	@ApiOperation("키워드로 카드 전체 검색) 특정문자열을 card title, desc 에서 포함여부를 찾아서 card 배열 반환하는 쿼리문")
	public ResponseEntity<Map<String, Object>> searchGlobalCard(@PathVariable String keyword) {
		return handleSuccess(service.searchGlobalCard(keyword));
	}
	

}
