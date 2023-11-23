import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

import '../../styles/timeslots.css'

export const Timeslots = () => {
	const { store, actions } = useContext(Context);

	const [namesOfCurrentDaysOfWeek, setNamesOfCurrentDaysOfWeek] = useState([])
	const [weekDatesRange, setWeekDatesRange] = useState([])
	const [weekDayDivs, setWeekDayDivs] = useState('')
	const [timeslotLabels, setTimeslotLabels] = useState('')
	const [newScheduleStartStr, setNewScheduleStartStr] = useState('')
	const [newScheduleEndStr, setNewScheduleEndStr] = useState('')
	const [existingEvents, setExistingEvents] = useState([])
	const namesOfDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	const lastDate = useRef('1')
	const newMonth = useRef(false)
	const booked = useRef(false)
	const owned = useRef(false)
	const recentlyFetched = useRef(false)
	const navigate = useNavigate()

	const isLeapYear = (year) => {
		return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
	}

	const getFebDays = (year) => {
		return isLeapYear(year) ? 29 : 28
	}
	const numDaysOfMonth = [31, getFebDays(store.timeSlotsStartingDay.year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

	const fixDatesAndSetDayNames = (weekDates) => {

		const daysOfWeek = []

		weekDates.map((date, ind) => {
			if (date > numDaysOfMonth[store.timeSlotsStartingDay.month]) {
				weekDates = [...weekDates.slice(0, ind), date - numDaysOfMonth[store.timeSlotsStartingDay.month], ...weekDates.slice(ind + 1, weekDates.length)]
				const dayInd = new Date(store.timeSlotsStartingDay.year, store.timeSlotsStartingDay.month + 1, date).getDay()
				const dayOfWeek = namesOfDays[dayInd]
				daysOfWeek.push(dayOfWeek)
			} else {
				const dayInd = new Date(store.timeSlotsStartingDay.year, store.timeSlotsStartingDay.month, date).getDay()
				const dayOfWeek = namesOfDays[dayInd]
				daysOfWeek.push(dayOfWeek)
			}
		})
		setWeekDatesRange(weekDates)
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
		setNewScheduleStartStr(scheduleStartStr)
		setNewScheduleEndStr(scheduleEndStr)
	}

	const createWeekDayDivs = () => {
		newMonth.current = false
		const divs = weekDatesRange.map((date, ind) => {
			let newDate = date
			let monthStr = String(parseInt(store.timeSlotsStartingDay.month) + 1)
			let yearStr = String(parseInt(store.timeSlotsStartingDay.year - 2000))
			if (newMonth.current === true) {
				monthStr = String(parseInt(monthStr) + 1)
				if (parseInt(monthStr) > 12) {
					yearStr = String(parseInt(store.timeSlotsStartingDay.year - 2000 + 1))
					monthStr = '1'
				}
			} else if (parseInt(newDate) < parseInt(lastDate.current)) {
				monthStr = String(parseInt(monthStr) + 1)
				if (parseInt(monthStr) > 12) {
					yearStr = String(parseInt(store.timeSlotsStartingDay.year - 2000 + 1))
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
				<div className={`timeslots-day bg-light-2 align-center p-2 d-block ${ind === 0 ? 'rounded-start' : ind === 6 ? 'rounded-end' : ''}`}>
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

	useEffect(() => {
		createTimeslotsLabels()
	}, [])

	useEffect(() => {
		setWeekDatesRange([...Array(7).keys()].map(i => i + parseInt(store.timeSlotsStartingDay.date)))
		fixDatesAndSetDayNames([...Array(7).keys()].map(i => i + parseInt(store.timeSlotsStartingDay.date)))
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
			let nextDate = String(parseInt(store.timeSlotsStartingDay.date) + 6)
			let nextMonth = store.timeSlotsStartingDay.month
			let nextYear = store.timeSlotsStartingDay.year
			if (parseInt(nextDate) > numDaysOfMonth[parseInt(nextMonth)]) {
				nextDate = String(parseInt(nextDate) - numDaysOfMonth[parseInt(nextMonth)])
				nextMonth = String(parseInt(nextMonth) + 1)
				if (parseInt(nextMonth) > 11) {
					nextYear = String(parseInt(nextYear) + 1)
					nextMonth = '0'
				}
			}
			const schedStartReq = formatAPIReqStr("09:00:00-07:00", store.timeSlotsStartingDay.date, String(parseInt(store.timeSlotsStartingDay.month) + 1), store.timeSlotsStartingDay.year)
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
				navigate('/services')
			}
		}
		const asyncFunc = async () => {
			if (recentlyFetched.current === false)
				try {
					recentlyFetched.current = true
					const resp = await getScheduleData()
					const events = resp.events
					setExistingEvents(events)
				}
				catch (error) {
					console.log(error)
				}
			setTimeout(() => {
				recentlyFetched.current = false
			}, 1000)
		}
		asyncFunc()
	}, [store.timeSlotsStartingDay])

	useEffect(() => {
		if (JSON.stringify(existingEvents) !== '[]')
			setWeekDayDivs(createWeekDayDivs())
	}, [namesOfCurrentDaysOfWeek, existingEvents])

	return (
		<div className="container-fluid d-flex p-0">
			{weekDayDivs}
			<div class="modal fade" id="scheduleNew" tabindex="-1" aria-labelledby="scheduleNewModal" aria-hidden="true">
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
			<div class="modal fade" id="cancelSchedule" tabindex="-1" aria-labelledby="cancelScheduleModal" aria-hidden="true">
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
