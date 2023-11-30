import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

import '../../styles/timeslots.css'

export const Timeslots = (props) => {
	const { store, actions } = useContext(Context);
	const typeOfScheduleStr = props.typeOfScheduleStr
	const typeOfSchedule = props.typeOfSchedule
	const [weekDayDivs, setWeekDayDivs] = useState('')
	const [newScheduleStartStr, setNewScheduleStartStr] = useState('')
	const [newScheduleEndStr, setNewScheduleEndStr] = useState('')
	const [existingEvents, setExistingEvents] = useState([])
	const [pets, setPets] = useState([])
	const dtStart = useRef('')
	const dtEnd = useRef('')
	const eventId = useRef('')
	const targetEventId = useRef('')
	const namesOfDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	const lastDate = useRef('1')
	const newMonth = useRef(false)
	const booked = useRef(false)
	const owned = useRef(false)
	const recentlyFetched = useRef(false)
	const firstTimeslotClicked = useRef(false)
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
		targetEventId.current = e.target.parentNode.getAttribute('data-id')
		if (firstTimeslotClicked.current === false) {
			if (e.target.parentNode.getAttribute('data-start')) {
				setNewScheduleStartStr(e.target.parentNode.getAttribute('data-start'))
				setNewScheduleEndStr(e.target.parentNode.getAttribute('data-end'))
			} else {
				const time = e.target.getAttribute('data-time')
				const dateStr = e.target.parentNode.getAttribute('data-date')
				let timeHr = time[1] === ':' ? parseInt(time[0]) : parseInt(time[0] + time[1])
				timeHr = timeHr < 5 ? timeHr + 12 : timeHr
				const timeHrStr = timeHr < 10 ? '0' + String(timeHr) : String(timeHr)
				const timeMins = time[1] === ':' ? time[2] + time[3] : time[3] + time[4]
				let timeStr = timeHrStr + ':' + timeMins + ':00-07:00'
				let month = e.target.parentNode.getAttribute('data-month')
				month = parseInt(month)
				if (month < 10) {
					month = '0' + String(month)
				} else {
					month = String(month)
				}

				let year = String(parseInt(e.target.parentNode.getAttribute('data-year')) + 2000)
				const scheduleStartStr = `${year}-${month}-${dateStr}T${timeStr}`
				setNewScheduleStartStr(scheduleStartStr)
				if (typeOfSchedule !== 'pet-sitting') {
					let nextTimeStr = ''
					if (timeStr[3] === '0') {
						nextTimeStr += timeStr[0] + timeStr[1] + timeStr[2] + '3' + timeStr[4] + ':00-07:00'
					} else {
						nextTimeStr += String(parseInt(timeStr[0] + timeStr[1]) + 1) + timeStr[2] + '0' + timeStr[4] + ':00-07:00'
					}
					const scheduleEndStr = `${year}-${month}-${dateStr}T${nextTimeStr}`
					setNewScheduleEndStr(scheduleEndStr)
				} else {
					firstTimeslotClicked.current = true
				}
			}
		} else {
			const time = e.target.getAttribute('data-time')
			const dateStr = e.target.parentNode.getAttribute('data-date')
			let timeHr = time[1] === ':' ? parseInt(time[0]) : parseInt(time[0] + time[1])
			timeHr = timeHr < 5 ? timeHr + 12 : timeHr
			const timeHrStr = timeHr < 10 ? '0' + String(timeHr) : String(timeHr)
			const timeMins = time[1] === ':' ? time[2] + time[3] : time[3] + time[4]
			let timeStr = timeHrStr + ':' + timeMins + ':00-07:00'
			let month = e.target.parentNode.getAttribute('data-month')
			month = parseInt(month)
			if (month < 10) {
				month = '0' + String(month)
			} else {
				month = String(month)
			}

			let year = String(parseInt(e.target.parentNode.getAttribute('data-year')) + 2000)
			const scheduleEndStr = `${year}-${month}-${dateStr}T${timeStr}`
			setNewScheduleEndStr(scheduleEndStr)
		}
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
								owned.current = false
								existingEvents.map((evnt) => {
									const dateTimeStart = evnt.start.dateTime
									const dateTimeEnd = evnt.end.dateTime
									let timeHr = timeLabel.props['data-time'][1] === ':' ? parseInt(timeLabel.props['data-time'][0]) : parseInt(timeLabel.props['data-time'][0] + timeLabel.props['data-time'][1])
									const timeMin = timeLabel.props['data-time'][1] === ':' ? parseInt(timeLabel.props['data-time'][2] + timeLabel.props['data-time'][3]) : parseInt(timeLabel.props['data-time'][3] + timeLabel.props['data-time'][4])
									if (timeHr < 9) {
										timeHr += 12
									}
									const currDateTime = new Date(String(parseInt(yearStr) + 2000), (parseInt(monthStr) - 1), date, timeHr, timeMin)
									const startDateTime = new Date(dateTimeStart)
									const endDateTime = new Date(dateTimeEnd)
									if (startDateTime <= currDateTime && currDateTime < endDateTime) {
										booked.current = true
										if (evnt.owned === true) {
											owned.current = true
											dtStart.current = dateTimeStart
											dtEnd.current = dateTimeEnd
											eventId.current = evnt.id
										}
									}
								})
								if (booked.current === false) {
									return (
										<div className={`timeslot text-center`} data-year={yearStr} data-date={newDate} data-month={monthStr} data-bs-toggle="modal" data-bs-target={typeOfSchedule === 'pet-sitting' && firstTimeslotClicked.current === true ? '#scheduleNew' : typeOfSchedule === 'pet-sitting' ? '#firstTimeslotModal' : '#scheduleNew'} onClick={(e) => handleTimeslotClick(e)} key={ind}>
											{timeLabel}
										</div>
									)
								} else if (booked.current === true && owned.current === true) {
									return (
										<div className={`timeslot text-center booked-by-user`} data-id={eventId.current} data-start={dtStart.current} data-end={dtEnd.current} data-year={yearStr} data-date={newDate} data-month={monthStr} data-bs-toggle="modal" data-bs-target="#cancelSchedule" onClick={(e) => handleTimeslotClick(e)} key={ind}>
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

	const getPets = async () => {
		if (store.token !== null) {
			try {
				const response = await fetch(process.env.BACKEND_URL + 'api/get-pet-names', {
					method: "GET",
					headers: {
						"Authorization": 'Bearer ' + store.token
					},
				}
				)
				return await response.json()
			}
			catch (error) {
				console.log("An error occurred:", error)
			}
		}
		else {
			return []
		}

	}

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
			if (store.token !== null) {
				const response = await fetch(process.env.BACKEND_URL + `api/get-${typeOfSchedule}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": 'Bearer ' + store.token
					},
					body: JSON.stringify({
						"minTime": schedStartReq,
						"maxTime": schedEndReq
					})
				}
				)

				return await response.json()
			}
			else {
				return []
			}
		} catch (error) {
			console.log("An error occurred.", error)
			navigate('/services')
		}
	}

	useEffect(() => {
		const asyncFunc1 = async () => {
			const petsResp = await getPets()
			const tempPets = await petsResp.pets
			if (tempPets !== undefined) {
				setPets(tempPets)
			} else {
				asyncFunc1()
			}
		}
		asyncFunc1()
		const asyncFunc2 = async () => {
			if (recentlyFetched.current === false)
				try {
					recentlyFetched.current = true
					const resp = await getScheduleData()
					const events = await resp.events
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
		asyncFunc2()
	}, [])

	useEffect(() => {
		const fixedDatesAndWeekdays = fixDatesAndSetDayNames([...Array(7).keys()].map(i => i + parseInt(store.timeSlotsStartingDay.date)))
		const timeSlotLabels = createTimeSlotsLabels()
		setWeekDayDivs(createWeekDayDivs(fixedDatesAndWeekdays, timeSlotLabels))
	}, [store.timeSlotsStartingDay, store.token])

	useEffect(() => {
		const fixedDatesAndWeekdays = fixDatesAndSetDayNames([...Array(7).keys()].map(i => i + parseInt(store.timeSlotsStartingDay.date)))
		const timeSlotLabels = createTimeSlotsLabels()
		setWeekDayDivs(createWeekDayDivs(fixedDatesAndWeekdays, timeSlotLabels))
	}, [existingEvents])

	const handleModalSubmit = async (e) => {
		e.preventDefault()
		try {
			const bookPets = pets.map((item, ind) => {
				if (e.target.elements[`${item}`].checked) {
					return (item)
				} else {
					return null
				}
			}).filter(item => item !== null)
			if (bookPets.length === 0) {
				throw new Error("You cannot book a service without pets.")
			}
			const apiStr = typeOfSchedule === 'pet-sitting' ? 'schedule-pet-sitting' : 'schedule-walk-or-check-in-or-meet-and-greet'
			const resp = await fetch(process.env.BACKEND_URL + `api/${apiStr}`, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
					"Authorization": 'Bearer ' + store.token
				},
				body: JSON.stringify({
					"startTime": newScheduleStartStr,
					"endTime": newScheduleEndStr,
					"type": e.target.elements.type.value,
					"details": e.target.elements.details.value,
					"recurring": e.target.elements.recurring.checked,
					"recurringUntil": e.target.elements.recurringUntil.value,
					"pets": bookPets
				})
			})
			if (resp.ok) {
				alert("Booked successfully.")
			}
			setTimeout(async () => {
				const resp = await getScheduleData()
				const events = await resp.events
				if (events !== undefined) {
					setExistingEvents(events)
				}
				const fixedDatesAndWeekdays = fixDatesAndSetDayNames([...Array(7).keys()].map(i => i + parseInt(store.timeSlotsStartingDay.date)))
				const timeSlotLabels = createTimeSlotsLabels()
				setWeekDayDivs(createWeekDayDivs(fixedDatesAndWeekdays, timeSlotLabels))
			}, 2000)
		}
		catch (error) {
			console.log(`An error occurred: ${error}`)
			alert('An error occurred. Booking failed. Make sure to select some pets!')
		}
	}

	const handleModalCancel = async (e) => {
		e.preventDefault()
		const idOfEventToCancel = targetEventId.current
		console.log(idOfEventToCancel)
		const apiStr = typeOfSchedule === 'pet-sitting' ? 'pet-sitting' : 'pet-check-in-or-meeting-or-dog-walk'
		try {
			const resp = await fetch(process.env.BACKEND_URL + `api/cancel/${apiStr}`, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
					"Authorization": 'Bearer ' + store.token
				},
				body: JSON.stringify({
					"id": idOfEventToCancel
				})
			})
			if (resp.ok) {
				alert("Cancelled successfully.")
			}
			setTimeout(async () => {
				const resp = await getScheduleData()
				const events = await resp.events
				if (events !== undefined) {
					setExistingEvents(events)
				}
				const fixedDatesAndWeekdays = fixDatesAndSetDayNames([...Array(7).keys()].map(i => i + parseInt(store.timeSlotsStartingDay.date)))
				const timeSlotLabels = createTimeSlotsLabels()
				setWeekDayDivs(createWeekDayDivs(fixedDatesAndWeekdays, timeSlotLabels))
			}, 2000)
		}
		catch (error) {
			console.log(`An error occurred: ${error}`)
			alert('An error occurred. Cancelling the booking failed.')
		}
	}

	return (
		<div className="container d-flex timeslots-container">
			{weekDayDivs}
			<div className="modal fade" id="scheduleNew" tabIndex="-1" aria-labelledby="scheduleNewModal" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="modalLabel1">Schedule a dog walk</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { firstTimeslotClicked.current = false }}></button>
						</div>
						<div className="modal-body">
							<form className="form-group" onSubmit={(e) => { handleModalSubmit(e) }}>
								<div className="form-group row">
									<label htmlFor="type" className="col-sm-2 col-form-label">Type of Booking:</label>
									<div className="col-sm-10">
										<input type="text" readOnly className="form-control-plaintext" id="type" value={typeOfScheduleStr} />
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="staticType" className="col-sm-2 col-form-label">Pet(s):</label>
									<div className="col-sm-10">
										{pets.map((petName) => {
											return (
												<div className="form-check">
													<input className="form-check-input" type="checkbox" value="" id={petName} />
													<label className="form-check-label" htmlFor={petName} name="chkboxLabel">
														{petName}
													</label>
												</div>
											)
										})
										}
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="details" className="col-sm-2 col-form-label">Details:</label>
									<div className="col-sm-10">
										<textarea className="form-control" id="details" rows="5"></textarea>
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="startTime" className="col-sm-3 col-form-label">Start Date/Time:</label>
									<div className="col-sm-9">
										<textarea readOnly id="startTime" value={newScheduleStartStr} />
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="endTime" className="col-sm-3 col-form-label">End Date/Time:</label>
									<div className="col-sm-9">
										<textarea readOnly id="endTime" value={newScheduleEndStr} />
									</div>
								</div>
								<div className="form-group row">
									<div className="form-check">
										<label className="form-check-label col-sm-2" htmlFor='recurring'>Recurring weekly?</label>
										<input className="form-check-input col-sm-10" type="checkbox" value="" id='recurring' />
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="recurringUntil" className="col-sm-2">Recurring until?</label>
									<div className="col-sm-10">
										<input type="date" id="recurringUntil" />
									</div>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { firstTimeslotClicked.current = false }}>Cancel</button>
									<button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
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
							<h5 className="modal-title" id="modalLabel2">Cancel a Booking</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form onSubmit={(e) => { handleModalCancel(e) }}>
								<p>{`Cancel booking starting on ${newScheduleStartStr.substring(0, 10)} from ${parseInt(newScheduleStartStr.substring(11, 13)) <= 12 ? newScheduleStartStr.substring(11, 16) : String(parseInt(newScheduleStartStr.substring(11, 13) - 12) + newScheduleStartStr.substring(13, 16))} to ${parseInt(newScheduleEndStr.substring(11, 13)) <= 12 ? newScheduleEndStr.substring(11, 16) : String(parseInt(newScheduleEndStr.substring(11, 13) - 12) + newScheduleEndStr.substring(13, 16))} on ${newScheduleEndStr.substring(0, 10)}?`}</p>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Wait, go back!</button>
									<button type="submit" className="btn btn-danger" data-bs-dismiss="modal">Cancel Booking</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="modal fade" id="firstTimeslotModal" tabIndex="-1" aria-labelledby="selectedFirstTimeslotModal" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="modalLabel2">Select another timeslot to book a sitting.</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<p>If you would like to schedule a booking longer than one week, please contact the business owner to negotiate.</p>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { firstTimeslotClicked.current = false }}><p>Cancel {`(reselect start time/date)`}</p></button>
							<button type="submit" className="btn btn-danger" data-bs-dismiss="modal">Continue</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
