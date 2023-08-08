import { useRef, useState } from "react";
import { control } from "react-validation";
import PhoneInput from "react-phone-number-input";
import "../dashboard/profile/phone.css";
import React from "react";

const CustomPhoneInput = ({ error, isChanged, isUsed, name, ...props }) => {
  const phoneInputRef = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <PhoneInput
      international
      countryCallingCodeEditable={false}
      name={name}
      // defaultCountry="CM"
      // style={{
      //   display: "flex",
      //   alignItems: "center",
      // }}
      value={phoneNumber}
      onChange={(value) => {
        setPhoneNumber(value);
      }}
      ref={phoneInputRef}
      inputComponent={CustomInput}
      isChanged={isChanged}
      error={error}
      isUsed={isUsed}
      className="phone"
    />
  );
};

const PhoneInputCustom = control(CustomPhoneInput);

export default PhoneInputCustom;

const CustomInput = React.forwardRef(
  ({ value, onChange, isChanged, isUsed, error, name, ...props }, ref) => {
    const [focus, setFocus] = useState(false);

    return (
      <input
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        name={name}
        ref={ref}
        value={value}
        // style={{
        //   display: "flex",
        //   padding: "10px",
        //   border: 'none',
        //   outline: 'none',
        //   border: focus ? "solid 2px #506273" : "solid 1px #506273",
        // }}
        onChange={(event) => {
          //   console.log("value: ", event.target.value);
          onChange(value);
        }}
        className={[
          "input__style",
          isChanged && isUsed && !value && "input__style_red_border",
        ].join(" ")}
        placeholder="(+xxx) xxxxxxxxx"
      />
    );
  }
);
