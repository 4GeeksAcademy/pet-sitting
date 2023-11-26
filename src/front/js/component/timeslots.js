import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

import '../../styles/timeslots.css'

export const Timeslots = () => {
	const { store, actions } = useContext(Context);

	const [weekDayDivs, setWeekDayDivs] = useState('')
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
		return [weekDates, daysOfWeek]
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

	const createWeekDayDivs = (weekDatesAndDaysOfWeek, timeSlotLabels) => {
		const weekDates = weekDatesAndDaysOfWeek[0]
		const daysOfWeek = weekDatesAndDaysOfWeek[1]
		newMonth.current = false
		const divs = weekDates.map((date, ind) => {
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
			const weekDayName = daysOfWeek[ind]
			return (
				<div className={`timeslots-day bg-light-2 align-center p-2 d-block ${ind === 0 ? 'rounded-start' : ind === 6 ? 'rounded-end' : ''}`} key={ind}>
					<div className="timeslots-day-date text-center">
						{fullDateStr}
					</div>
					<div className="timeslots-day-name text-center">
						{weekDayName}
					</div>
					<div className="timeslots">
						{
							timeSlotLabels.map((timeLabel, ind) => {
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
										<div className={`timeslot text-center`} data-year={yearStr} data-date={newDate} data-month={monthStr} data-bs-toggle="modal" data-bs-target="#scheduleNew" onClick={(e) => handleTimeslotClick(e)} key={ind}>
											{timeLabel}
										</div>
									)
								} else if (booked.current === true && owned.current === true) {
									return (
										<div className={`timeslot text-center booked-by-user`} data-year={yearStr} data-date={newDate} data-month={monthStr} data-bs-toggle="modal" data-bs-target="#cancelSchedule" onClick={(e) => handleTimeslotClick(e)} key={ind}>
											{timeLabel}
										</div>
									)
								} else {
									return (
										<div className={`timeslot text-center booked`} data-year={yearStr} data-date={newDate} data-month={monthStr} key={ind}>
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

	const createTimeSlotsLabels = () => {

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

		const timeSlotLabelsArr = timesArr.map((time, ind) => {
			return (
				<div className="timeslot-label p-1" data-time={time} key={ind}>
					{time}
				</div>
			)

		})

		return timeSlotLabelsArr
	}

	useEffect(() => {
	}, [])

	useEffect(() => {
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
				console.log(JSON.stringify({
					"minTime": schedStartReq,
					"maxTime": schedEndReq
				}))
				if (store.token !== null) {
					const response = await fetch(process.env.BACKEND_URL + `api/get-${store.typeOfSchedule}`, {
						method: "POST",
						headers: {
							"Authorization": 'Bearer ' + store.token
						},
						body: JSON.stringify({
							"minTime": schedStartReq,
							"maxTime": schedEndReq
						})
					}
					)
				}
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
					const events = await JSON.stringify(resp.events)
					console.log(events)
					if (events !== undefined) {

						setExistingEvents(events)
					}
				}
				catch (error) {
					console.log(error)
				}
			setTimeout(() => {
				recentlyFetched.current = false
			}, 2000)
		}
		asyncFunc()
		const fixedDatesAndWeekdays = fixDatesAndSetDayNames([...Array(7).keys()].map(i => i + parseInt(store.timeSlotsStartingDay.date)))
		const timeSlotLabels = createTimeSlotsLabels()
		setWeekDayDivs(createWeekDayDivs(fixedDatesAndWeekdays, timeSlotLabels))
	}, [store.timeSlotsStartingDay, store.token])

	useEffect(() => {
		const fixedDatesAndWeekdays = fixDatesAndSetDayNames([...Array(7).keys()].map(i => i + parseInt(store.timeSlotsStartingDay.date)))
		const timeSlotLabels = createTimeSlotsLabels()
		setWeekDayDivs(createWeekDayDivs(fixedDatesAndWeekdays, timeSlotLabels))
	}, [existingEvents])

	return (
		<div className="container-fluid d-flex p-0 ms-md-5">
			{weekDayDivs}
			<div className="modal fade" id="scheduleNew" tabIndex="-1" aria-labelledby="scheduleNewModal" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="modalLabel1">Schedule a dog walk</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form className="form-group" onSubmit={(e) => { handleModalSubmit(e) }}>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
									<button type="submit" className="btn btn-primary">Submit</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="modal fade" id="cancelSchedule" tabIndex="-1" aria-labelledby="cancelScheduleModal" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="modalLabel2">Schedule a dog walk</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form onSubmit={(e) => { handleModalCancel(e) }}>
								<p>{`Cancel booking on ${newScheduleStartStr.substring(0, 10)} from ${parseInt(newScheduleStartStr.substring(11, 13)) < 12 ? newScheduleStartStr.substring(11, 16) : String(parseInt(newScheduleStartStr.substring(11, 13) - 12) + newScheduleStartStr.substring(13, 16))}-${parseInt(newScheduleEndStr.substring(11, 13)) < 12 ? newScheduleEndStr.substring(11, 16) : String(parseInt(newScheduleEndStr.substring(11, 13) - 12) + newScheduleEndStr.substring(13, 16))}?`}</p>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Wait, go back!</button>
									<button type="submit" className="btn btn-danger">Cancel Booking</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
