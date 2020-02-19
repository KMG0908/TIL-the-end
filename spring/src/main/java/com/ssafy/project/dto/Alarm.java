package com.ssafy.project.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class Alarm implements Serializable {

	private static final long serialVersionUID = -4135376879442942644L;
	private int alarm_id;
	private String mem_id;
	private String alarm_text;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") //, timezone = "Asia/Seoul"
	private LocalDateTime alarm_date;
	private String alarm_url;

}
