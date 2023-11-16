import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Timeslots = () => {
	const { store, actions } = useContext(Context);

	const [namesOfCurrentDaysOfWeek, setNamesOfCurrentDaysOfWeek] = useState([])

	const startDayData = store.timeSlotsStartingDay
	const namesOfDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

	const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
    }

    const getFebDays = (year) => {
        return isLeapYear(year) ? 29 : 28
    }
    const numDaysOfMonth = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

	const weekDatesRange = [...Array(7).keys()].map(i => i + startDayData.date)

	namesOfCurrentDaysOfWeek = []

	const fixDatesAndSetDayNames = () => {
		const pushDay = (day) => {
			if(namesOfDaysOfWeek.length < 7) {
				setNamesOfCurrentDaysOfWeek([...namesOfCurrentDaysOfWeek,day])
			} else {
				setNamesOfCurrentDaysOfWeek([])
				setNamesOfCurrentDaysOfWeek([...namesOfCurrentDaysOfWeek,day])
			}
		}

		for(date of weekDatesRange) {
			if(date > numDaysOfMonth[startDayData.month]) {
				date = date - numDaysOfMonth[startDayData.month]
				const dayInd = new Date(startDayData.year, startDayData.month + 1, date).getDay()
				const dayOfWeek = namesOfDays[dayInd]
				pushDay(dayOfWeek)
			} else {
				const dayInd = new Date(startDayData.year, startDayData.month + 1, date).getDay()
				const dayOfWeek = namesOfDays[dayInd]
				pushDay(dayOfWeek)
			}
		}

		
	}

	useEffect(() => {
		fixDatesAndSetDayNames()
	},[])

	// const createDaysOfWeekDivs = () => {
		
	// }
	

	return (
		<div className="container-fluid">
			<div className="row">
			</div>
        </div>
	);
};
