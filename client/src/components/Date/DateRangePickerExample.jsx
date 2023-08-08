import React, { useState } from "react";
import { enGB } from "date-fns/locale";
import { DateRangePicker, START_DATE, END_DATE } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import style from "./DateRangePickerExample.module.css";
import './style.css'

function DateRangePickerExample() {
  const [dateDebut, setDateDebut] = useState();
  const [dateFin, setDateFin] = useState();

  const handleDateSelect = (date) => {
    if (!dateDebut || (dateDebut && dateFin)) {
      setDateDebut(date);
      setDateFin(null);
    } else {
      setDateFin(date);
    }
  };
  return (
    <>
      <DateRangePicker
        startDate={dateDebut}
        endDate={dateFin}
        onStartDateChange={setDateDebut}
        onEndDateChange={setDateFin}
        minimumDate={new Date()}
        minimumLength={1}
        format="dd MMM yyyy"
        locale={enGB}
        calendarClass={style.custom_calendar}
        onFocus={handleDateSelect}
      >
        {({ startDateInputProps, endDateInputProps, focus }) => (
          <div className={style.date_container}>
            <input
              className={[
                style.input,
                +(focus === START_DATE ? "-foused" : ""),
              ].join(" ")}
              {...startDateInputProps}
              value={dateDebut && dateDebut.toDateString()}
              placeholder="Date de début"
            />
            <input
              className={[
                style.input,
                +(focus === END_DATE ? "-foused" : ""),
              ].join(" ")}
              {...endDateInputProps}
              value={dateFin && dateFin.toDateString()}
              placeholder="Date de fin"
            />
          </div>
        )}
      </DateRangePicker>
    </>
  );
}

export default DateRangePickerExample;
