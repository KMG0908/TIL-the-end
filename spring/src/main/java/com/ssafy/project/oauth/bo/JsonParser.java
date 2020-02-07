package com.ssafy.project.oauth.bo;

import java.util.HashMap;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.ssafy.project.dto.Member;

public class JsonParser {

	public Member changeJson(String string) throws Exception {

		JSONParser jsonparser = new JSONParser();
		JSONObject jsonobject = (JSONObject) jsonparser.parse(string);
		JSONObject response = (JSONObject) jsonobject.get("response");
		
		//{
		//  "resultcode": "00",
		//  "message": "success",
		//  "response": {
		//    "email": "openapi@naver.com",
		//    "nickname": "OpenAPI",
		//    "profile_image": "https://ssl.pstatic.net/static/pwe/address/nodata_33x33.gif",
		//    "age": "40-49",
		//    "gender": "F",
		//    "id": "32742776",
		//    "name": "오픈 API",
		//    "birthday": "10-01"
		//  }
		//}

		Member member = new Member();
		member.setMem_id("naver_"+(String)response.get("id"));
		member.setMem_nick((String)response.get("nickname"));
		member.setMem_email((String)response.get("email"));


		return member;

	}
}
