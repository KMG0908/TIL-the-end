package com.ssafy.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.project.dao.AlarmDao;
import com.ssafy.project.dto.Alarm;
import com.ssafy.project.dto.AlarmException;

@Service
public class AlarmServiceImpl implements AlarmService {

	@Autowired
	private AlarmDao dao;

	@Override
	public void insertAlarm(Alarm alarm) {
		try {
			dao.insertAlarm(alarm);
		} catch (Exception e) {
			e.printStackTrace();
			throw new AlarmException();
		}
	}

	@Override
	public void deleteAlarm(int alarm_id) {
		try {
			dao.deleteAlarm(alarm_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new AlarmException();
		}

	}

	@Override
	public List<Alarm> searchAll(String mem_id) {
		try {
			return dao.searchAll(mem_id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new AlarmException();
		}
	}
}
