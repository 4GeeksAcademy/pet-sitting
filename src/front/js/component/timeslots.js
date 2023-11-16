import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Timeslots = () => {
	const { store, actions } = useContext(Context);

	const [namesOfCurrentDaysOfWeek, setNamesOfCurrentDaysOfWeek] = useState([])
	const [weekDatesRange, setWeekDatesRange] = useState([])
	const [weekDayDivs, setWeekDayDivs] = useState('')

	const startDayData = store.timeSlotsStartingDay
	const namesOfDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

	const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
    }

    const getFebDays = (year) => {
        return isLeapYear(year) ? 29 : 28
    }
    const numDaysOfMonth = [31, getFebDays(startDayData.year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

	const fixDatesAndSetDayNames = () => {
		const pushDay = (day) => {
			console.log(day)
			if(namesOfCurrentDaysOfWeek.length < 7) {
				setNamesOfCurrentDaysOfWeek([...namesOfCurrentDaysOfWeek,day])
			} else {
				setNamesOfCurrentDaysOfWeek([])
				setNamesOfCurrentDaysOfWeek([...namesOfCurrentDaysOfWeek,day])
			}
		}

		weekDatesRange.map((date, ind) => {
			if(date > numDaysOfMonth[startDayData.month]) {
				setWeekDatesRange([...weekDatesRange.slice(0,ind),date - numDaysOfMonth[startDayData.month],...weekDatesRange.slice(ind + 1,weekDatesRange.length)])
				const dayInd = new Date(startDayData.year, startDayData.month + 1, date).getDay()
				const dayOfWeek = namesOfDays[dayInd]
				console.log(dayOfWeek)
				pushDay(dayOfWeek)
			} else {
				const dayInd = new Date(startDayData.year, startDayData.month + 1, date).getDay()
				const dayOfWeek = namesOfDays[dayInd]
				console.log(dayOfWeek)
				pushDay(dayOfWeek)
			}
		}) 
	}

	const createDaysOfWeekDivs = () => {
		console.log('creating weekday divs')
		const monthStr = String(startDayData.month + 1)
		const divs = weekDatesRange.map((date, ind) =>  {
			const fullDateStr = `${monthStr}/${date}`
			const weekDayName = namesOfCurrentDaysOfWeek[ind]
			return (
				<div className="timeslots-day col-1">
					<div className="timeslots-day-date">
						{fullDateStr}
					</div>
					<div className="timeslots-day-name">
						{weekDayName}
					</div>
				</div>
			)
		})
		return divs
	}

	useEffect(() => {
			setWeekDatesRange([...Array(7).keys()].map(i => i + startDayData.date))
			fixDatesAndSetDayNames()
	},[])

	useEffect(() => {
		setWeekDayDivs(createDaysOfWeekDivs())
	},[weekDatesRange,namesOfCurrentDaysOfWeek])

	return (
		<div className="container-fluid">
			<div className="row">
				{weekDayDivs}
			</div>
        </div>
	);
};
