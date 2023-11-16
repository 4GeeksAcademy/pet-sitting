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
	const [render, reRender] = useState(true)
	const namesOfDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

	const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
    }

    const getFebDays = (year) => {
        return isLeapYear(year) ? 29 : 28
    }
    const numDaysOfMonth = [31, getFebDays(startDayData.year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

	const fixDatesAndSetDayNames = () => {

		const daysOfWeek = []

		weekDatesRange.map((date, ind) => {
			if(date > numDaysOfMonth[startDayData.month]) {
				setWeekDatesRange([...weekDatesRange.slice(0,ind),date - numDaysOfMonth[startDayData.month],...weekDatesRange.slice(ind + 1,weekDatesRange.length)])
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

	const createWeekDayDivs = () => {
		console.log('creating weekday divs')
		const monthStr = String(startDayData.month + 1)
		const divs = weekDatesRange.map((date, ind) =>  {
		const fullDateStr = `${monthStr}/${date}`
		const weekDayName = namesOfCurrentDaysOfWeek[ind]


			return (
				<div className="timeslots-day mt-3 bg-light-2 align-center p-2 d-block">
					<div className="timeslots-day-date text-center">
						{fullDateStr}
					</div>
					<div className="timeslots-day-name text-center">
						{weekDayName}
					</div>
				</div>
			)
		})
		return divs
	}

	useEffect(() => {
		setStartDayData(store.timeSlotsStartingDay)
	},[store.timeSlotsStartingDay])

	useEffect(() => {
			setWeekDatesRange([...Array(7).keys()].map(i => i + startDayData.date))
	},[startDayData])

	useEffect(() => {
		console.log(weekDatesRange)
		fixDatesAndSetDayNames()
	},[weekDatesRange])

	useEffect(() => {
		setWeekDayDivs(createWeekDayDivs())
	},[namesOfCurrentDaysOfWeek])

	return (
		<div className="container-fluid d-flex">
			{/* {timeslots} */}
			{weekDayDivs}
        </div>
	);
};
