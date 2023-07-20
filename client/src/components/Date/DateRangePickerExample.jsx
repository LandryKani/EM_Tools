import React, { useState } from "react";
import { enGB } from "date-fns/locale";
import { DateRangePicker, START_DATE, END_DATE } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import style from "./DateRangePickerExample.module.css";
import './style.css'

function DateRangePickerExample() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  return (
    <>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        minimumDate={new Date()}
        minimumLength={1}
        format="dd MMM yyyy"
        locale={enGB}
        calendarClass={style.custom_calendar}
      >
        {({ startDateInputProps, endDateInputProps, focus }) => (
          <div className={style.date_container}>
            <input
              className={[
                style.input,
                +(focus === START_DATE ? "-foused" : ""),
              ].join(" ")}
              {...startDateInputProps}
              placeholder="Date de début"
            />
            <input
              className={[
                style.input,
                +(focus === END_DATE ? "-foused" : ""),
              ].join(" ")}
              {...endDateInputProps}
              placeholder="Date de fin"
            />
          </div>
        )}
      </DateRangePicker>
    </>
  );
}

export default DateRangePickerExample;
