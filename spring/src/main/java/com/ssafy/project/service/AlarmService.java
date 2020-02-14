package com.ssafy.project.service;

import java.util.List;

import com.ssafy.project.dto.Alarm;

public interface AlarmService {

	public void insertAlarm(Alarm alarm);

	public void deleteAlarm(int alarm_id);

	public List<Alarm> searchAll(String mem_id);

}
