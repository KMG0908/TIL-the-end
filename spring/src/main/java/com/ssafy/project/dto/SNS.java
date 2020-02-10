package com.ssafy.project.dto;
import java.io.Serializable;

import lombok.Data;

@Data
public class SNS implements Serializable {
	private int id;
	private String mem_id;
	private int sns_nid;
	private String mem_email;
	private String access_token;
	private String provider;
}
