import React from "react";
import styled from 'styled-components'

const WrapperButton = styled.div`
  display: flex;
  align-item: center;
  justify-content: center;
  top: 80px;
  left: 70px;
  font-family: Outfit;
  font-weight: bold;
  border:${(props) => (props.border ? props.border : "1px solid transparent" ) };
  width: ${(props) => (props.maxWidth ? props.maxWidth : "25%")};
  text-align: center;
  background-color: ${(props) => (props.bgcolor ? props.bgcolor : "#F7FFF8")};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "5px"};
  color: ${(props) => (props.color ? props.color : "#506273")};
  height: ${(props) => (props.height ? props.height : "50px")};
  position: ${(props)=>(props.position ? props.position : "relative")}
  
`;

const StyledLink = styled.a`
  color: ${(props) => (props.color ? props.color : "#506273")};
  padding: ${(props) => (props.padding ? props.padding : "15px")};
  top: ${(props)=>(props.topElement ? props.topElement : "80px")}
  left: ${(props)=>(props.leftElt ? props.leftElt : "70px")}
  position: ${(props)=>(props.position ? props.position : "relative")}
`;

const StyleButton = styled.button`
  outline: 0;
  background: transparent;
  color: ${(props) => (props.color ? props.color : "#506273")};
  position: ${(props)=>(props.position ? props.position : "relative")}
  top: ${(props)=>(props.topElement ? props.topElement : "80px")}
  left: ${(props)=>(props.leftElt ? props.leftElt : "70px")}

`;

function Button({
  title,
  bgcolor,
  maxWidth,
  href,
  variant,
  borderRadius,
  color,
  position,
  padding,
  margin,
  height,
  hoverbgcolor,
  icon,
  border,
  topElement,
  leftElt,
  onClick
}) {
  return (
    <WrapperButton
      bgcolor={bgcolor}
      maxWidth={maxWidth}
      variant={variant}
      borderRadius={borderRadius}
      border={border}
      padding={padding}
      hoverbgcolor={hoverbgcolor}
      height={height}
      margin={margin}
      onClick={onClick}
      position={position}
      top={topElement}
      left={leftElt}
    >
      {(variant === "link" || !variant) && (
        <StyledLink color={color} href={href} position={position} top={topElement} left={leftElt} bgcolor={bgcolor}>
          {icon} {title}
        </StyledLink>
      )}
      {variant === "button" && (
        <StyleButton color={color} maxWidth={maxWidth} position={position} top={topElement} left={leftElt} bgcolor={bgcolor}>
          {icon} {title}
        </StyleButton>
      )}
    </WrapperButton>
  );
}

export default Button;
