import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import '../../styles/timeslots.css'

export const Timeslots = () => {
	const { store, actions } = useContext(Context);

	const [startDayData, setStartDayData] = useState({
		"date": null,
		"month": null,
		"year": null
	})
	const [namesOfCurrentDaysOfWeek, setNamesOfCurrentDaysOfWeek] = useState([])
	const [weekDatesRange, setWeekDatesRange] = useState([])
	const [weekDayDivs, setWeekDayDivs] = useState('')
	const [timeslotLabels, setTimeslotLabels] = useState('')
	const [newScheduleStartStr, setNewScheduleStartStr] = useState('')
	const [newScheduleEndStr, setNewScheduleEndStr] = useState('')
	const [render, reRender] = useState(true)
	const [existingEvents, setExistingEvents] = useState([])
	const namesOfDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	const lastDate = useRef('1')
	const newMonth = useRef(false)
	const booked = useRef(false)
	const owned = useRef(false)

	const isLeapYear = (year) => {
		return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
	}

	const getFebDays = (year) => {
		return isLeapYear(year) ? 29 : 28
	}
	const numDaysOfMonth = [31, getFebDays(startDayData.year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

	const fixDatesAndSetDayNames = () => {

		const daysOfWeek = []

		weekDatesRange.map((date, ind) => {
			if (date > numDaysOfMonth[startDayData.month]) {
				setWeekDatesRange([...weekDatesRange.slice(0, ind), date - numDaysOfMonth[startDayData.month], ...weekDatesRange.slice(ind + 1, weekDatesRange.length)])
				const dayInd = new Date(startDayData.year, startDayData.month + 1, date).getDay()
				const dayOfWeek = namesOfDays[dayInd]
				daysOfWeek.push(dayOfWeek)
			} else {
				const dayInd = new Date(startDayData.year, startDayData.month, date).getDay()
				const dayOfWeek = namesOfDays[dayInd]
				daysOfWeek.push(dayOfWeek)
			}
		})

		setNamesOfCurrentDaysOfWeek(daysOfWeek)
	}

	const handleTimeslotClick = (e) => {
		const time = e.target.getAttribute('data-time')
		const dateStr = e.target.parentNode.getAttribute('data-date')
		let timeHr = time[1] === ':' ? parseInt(time[0]) : parseInt(time[0] + time[1])
		timeHr = timeHr < 5 ? timeHr + 12 : timeHr
		const timeHrStr = timeHr < 10 ? '0' + String(timeHr) : String(timeHr)
		const timeMins = time[1] === ':' ? time[2] + time[3] : time[3] + time[4]
		let timeStr = timeHrStr + ':' + timeMins + ':00-07:00'
		let nextTimeStr = ''
		if (timeStr[3] === '0') {
			nextTimeStr += timeStr[0] + timeStr[1] + timeStr[2] + '3' + timeStr[4] + ':00-07:00'
		} else {
			nextTimeStr += String(parseInt(timeStr[0] + timeStr[1]) + 1) + timeStr[2] + '0' + timeStr[4] + ':00-07:00'
		}
		let month = e.target.parentNode.getAttribute('data-month')
		month = parseInt(month)
		if (month < 10) {
			month = '0' + String(month)
		} else {
			month = String(month)
		}

		let year = String(parseInt(e.target.parentNode.getAttribute('data-year')) + 2000)
		const scheduleStartStr = `${year}-${month}-${dateStr}T${timeStr}`
		const scheduleEndStr = `${year}-${month}-${dateStr}T${nextTimeStr}`
		console.log(scheduleStartStr)
		console.log(scheduleEndStr)
		setNewScheduleStartStr(scheduleStartStr)
		setNewScheduleEndStr(scheduleEndStr)
		return null
	}

	const createWeekDayDivs = () => {
		const divs = weekDatesRange.map((date, ind) => {
			let newDate = date
			let monthStr = String(parseInt(startDayData.month) + 1)
			let yearStr = String(parseInt(startDayData.year - 2000))
			if (newMonth.current === true) {
				monthStr = String(parseInt(monthStr) + 1)
				if (parseInt(monthStr) > 12) {
					yearStr = String(parseInt(startDayData.year - 2000 + 1))
					monthStr = '1'
				}
			} else if (parseInt(newDate) < parseInt(lastDate.current)) {
				monthStr = String(parseInt(monthStr) + 1)
				if (parseInt(monthStr) > 12) {
					yearStr = String(parseInt(startDayData.year - 2000 + 1))
					monthStr = '1'
				}
				newMonth.current = true
			}
			lastDate.current = date
			if (parseInt(date) < 10) {
				newDate = '0' + String(date)
			} else {
				newDate = String(date)
			}
			const fullDateStr = `${monthStr}/${date}/${yearStr}`
			const weekDayName = namesOfCurrentDaysOfWeek[ind]
			return (
				<div className="timeslots-day mt-3 bg-light-2 align-center p-2 d-block">
					<div className="timeslots-day-date text-center">
						{fullDateStr}
					</div>
					<div className="timeslots-day-name text-center">
						{weekDayName}
					</div>
					<div className="timeslots">
						{
							timeslotLabels.map((timeLabel) => {
								booked.current = false
								existingEvents.map((event) => {
									owned.current = false
									const dateTimeStart = event.start.dateTime
									const startYear = dateTimeStart.substring(0, 4)
									const startMonth = dateTimeStart.substring(5, 7)
									const startDate = dateTimeStart.substring(8, 10)
									let startTime = dateTimeStart.substring(11, 16)
									if (parseInt(startTime[0] + startTime[1]) > 12) {
										const pmHr = String(parseInt(startTime[0] + startTime[1]) - 12)
										startTime = startTime.slice(2)
										startTime = pmHr + startTime
									}
									if ((startTime == timeLabel.props['data-time']) && (startDate == date) && (startMonth == monthStr) && (startYear == String(parseInt(yearStr) + 2000))) {
										booked.current = true
										if (event.owned === true) {
											owned.current = true
										}
									}
								})
								if (booked.current === false) {
									return (
										<div className={`timeslot text-center`} data-year={yearStr} data-date={newDate} data-month={monthStr} data-bs-toggle="modal" data-bs-target="#scheduleNew" onClick={(e) => handleTimeslotClick(e)}>
											{timeLabel}
										</div>
									)
								} else if (booked.current === true && owned.current === true) {
									return (
										<div className={`timeslot text-center booked-by-user`} data-year={yearStr} data-date={newDate} data-month={monthStr} data-bs-toggle="modal" data-bs-target="#cancelSchedule" onClick={(e) => handleTimeslotClick(e)}>
											{timeLabel}
										</div>
									)
								} else {
									return (
										<div className={`timeslot text-center booked`} data-year={yearStr} data-date={newDate} data-month={monthStr}>
											{timeLabel}
										</div>
									)
								}
							})
						}
					</div>
				</div>
			)
		})
		lastDate.current = 1
		newMonth.current = false
		return divs
	}

	useEffect(() => {
		setStartDayData(store.timeSlotsStartingDay)
	}, [store.timeSlotsStartingDay])

	useEffect(() => {
		setWeekDatesRange([...Array(7).keys()].map(i => i + parseInt(startDayData.date)))
		const getScheduleData = async () => {
			const formatAPIReqStr = (time, date, month, year) => {
				const dateStr = date
				let timeHr = time[1] === ':' ? parseInt(time[0]) : parseInt(time[0] + time[1])
				const timeMins = time[1] === ':' ? time[2] + time[3] : time[3] + time[4]
				timeHr = timeHr < 5 ? timeHr + 12 : timeHr
				const timeHrStr = timeHr < 10 ? '0' + String(timeHr) : String(timeHr)
				let timeStr = timeHrStr + ':' + timeMins + ':00-07:00'
				let nextTimeStr = ''
				if (timeStr[3] === '0') {
					nextTimeStr += '-' + timeStr[0] + timeStr[1] + timeStr[2] + '3' + timeStr[4] + ':00-07:00'
				} else {
					nextTimeStr += '-' + String(parseInt(timeStr[0] + timeStr[1]) + 1) + timeStr[2] + '0' + timeStr[4] + ':00-07:00'
				}
				month = parseInt(month)
				if (month < 10) {
					month = '0' + String(month)
				} else {
					month = String(month)
				}
				return `${year}-${month}-${dateStr}T${timeStr}`
			}
			let nextDate = String(parseInt(startDayData.date) + 6)
			let nextMonth = startDayData.month
			let nextYear = startDayData.year
			if (parseInt(nextDate) > numDaysOfMonth[parseInt(nextMonth)]) {
				nextDate = String(parseInt(nextDate) - numDaysOfMonth[parseInt(nextMonth)])
				nextMonth = String(parseInt(nextMonth) + 1)
				if (parseInt(nextMonth) > 11) {
					nextYear = String(parseInt(nextYear) + 1)
					nextMonth = '0'
				}
			}
			const schedStartReq = formatAPIReqStr("09:00:00-07:00", startDayData.date, String(parseInt(startDayData.month) + 1), startDayData.year)
			const schedEndReq = formatAPIReqStr("17:00:00-07:00", nextDate, String(parseInt(nextMonth) + 1), nextYear)
			try {
				const response = await fetch(process.env.BACKEND_URL + `api/get-${store.typeOfSchedule}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						"minTime": schedStartReq,
						"maxTime": schedEndReq
					})
				}
				)
				return await response.json()
			} catch (error) {
				console.log("An error occurred.", error)
			}
		}
		const asyncFunc = async () => {
			if (store.timeSlotsStartingDay.date !== null && store.timeSlotsStartingDay.month !== null && store.timeSlotsStartingDay.year !== null) {
				try {
					const resp = await getScheduleData()
					const events = resp.events
					setExistingEvents(events)
				}
				catch (error) {
					console.log(error)
				}
			}

		}
		asyncFunc()
	}, [startDayData])

	useEffect(() => {
		fixDatesAndSetDayNames()
		newMonth.current = false
	}, [weekDatesRange])

	useEffect(() => {
		if (existingEvents !== undefined)
			setWeekDayDivs(createWeekDayDivs())
	}, [namesOfCurrentDaysOfWeek, existingEvents])

	useEffect(() => {
		createTimeslotsLabels()
	}, [])

	const createTimeslotsLabels = () => {

		const timesArr = []
		for (let i = 0; i < 16; i++) {
			let time = 9
			time += 0.5 * i
			if (time >= 13) {
				time -= 12
			}
			if (time % 1 !== 0) {
				const timeStr = String(time - 0.5) + ':30'
				timesArr.push(timeStr)

			} else {
				const timeStr = String(time) + ':00'
				timesArr.push(timeStr)
			}

		}

		const timeslotLabelsArr = timesArr.map((time) => {
			return (
				<div className="timeslot-label p-1" data-time={time}>
					{time}
				</div>
			)

		})

		setTimeslotLabels(timeslotLabelsArr)
	}

	return (
		<div className="container-fluid d-flex">
			{weekDayDivs}
			<div class="modal fade" id="scheduleNew" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="modalLabel1">Schedule a dog walk</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<form onSubmit={(e) => { handleModalSubmit(e) }}>
								<div class="modal-footer">
									<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
									<button type="submit" class="btn btn-primary">Submit</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div class="modal fade" id="cancelSchedule" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="modalLabel2">Schedule a dog walk</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<form onSubmit={(e) => { handleModalCancel(e) }}>
								<text>{`Cancel booking on ${newScheduleStartStr.substring(0, 10)} from ${parseInt(newScheduleStartStr.substring(11, 13)) < 12 ? newScheduleStartStr.substring(11, 16) : String(parseInt(newScheduleStartStr.substring(11, 13) - 12) + newScheduleStartStr.substring(13, 16))}-${parseInt(newScheduleEndStr.substring(11, 13)) < 12 ? newScheduleEndStr.substring(11, 16) : String(parseInt(newScheduleEndStr.substring(11, 13) - 12) + newScheduleEndStr.substring(13, 16))}?`}</text>
								<div class="modal-footer">
									<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Wait, go back!</button>
									<button type="submit" class="btn btn-danger">Cancel Booking</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
