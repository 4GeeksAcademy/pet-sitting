import React, { useState, useEffect, useContext } from "react";
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
	const [render, reRender] = useState(true)
	const namesOfDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

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
		console.log(time)
		const dateStr = e.target.parentNode.getAttribute('data-date')
		console.log(dateStr)
		let timeHr = parseInt(time[0])
		const timeMinStart = parseInt(time[2])
		let timeStr = time
		if (timeHr > 1 && timeHr < 9) {
			timeHr = timeHr + 12
		}
		if (timeHr >= 10) {
				if (timeMinStart === 3) {
					timeStr = String(timeHr) + `:30-${String(timeHr + 1)}:00`
				} else {
					timeStr = String(timeHr) + `:00-${String(timeHr)}:30`
				}
			} else {
				if (timeMinStart === 3) {
					timeStr = '0' + String(timeHr) + `:30:00-${String(timeHr + 1)}:00`
				} else {
					timeStr = '0' + String(timeHr) + `:00:00-${'0' + String(timeHr)}:30`
				}
			}
		const date = startDayData.date
		let month = startDayData.month
		month = parseInt(month) + 1
		if (month < 10) {
			month = '0' + String(month)
		} else {
			month = String(month)
		}

		let year = startDayData.year
		const scheduleStr = `${year}-${month}-${date}T${timeStr}`
		console.log(scheduleStr)
		return null
	}

	const createWeekDayDivs = () => {
		const monthStr = String(parseInt(startDayData.month) + 1)
		const yearStr = String(parseInt(startDayData.year - 2000))
		const divs = weekDatesRange.map((date, ind) => {
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
							timeslotLabels.map((time) => {
								return (
									<div className={`timeslot text-center`} data-date={date} data-bs-toggle="modal" data-bs-target="#myModal" onClick={(e) => handleTimeslotClick(e)}>
										{time}
									</div>
								)
							})
						}
					</div>
				</div>
			)
		})
		return divs
	}

	useEffect(() => {
		setStartDayData(store.timeSlotsStartingDay)
	}, [store.timeSlotsStartingDay])

	useEffect(() => {
		setWeekDatesRange([...Array(7).keys()].map(i => i + parseInt(startDayData.date)))
	}, [startDayData])

	useEffect(() => {
		fixDatesAndSetDayNames()
	}, [weekDatesRange])

	useEffect(() => {
		setWeekDayDivs(createWeekDayDivs())
	}, [namesOfCurrentDaysOfWeek])

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
				if (time < 10) {
					const timeStr = '0' + String(time - 0.5) + ':30'
					timesArr.push(timeStr)
				} else {
					const timeStr = String(time - 0.5) + ':30'
					timesArr.push(timeStr)
				}

			} else {
				if (time < 10) {
					const timeStr = '0' + String(time) + ':00'
					timesArr.push(timeStr)
				} else {
					const timeStr = String(time) + ':00'
					timesArr.push(timeStr)
				}
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
			<div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">Schedule a dog walk</h5>
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
		</div>
	);
};
