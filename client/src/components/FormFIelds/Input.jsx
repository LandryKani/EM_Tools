import { useEffect, useState } from 'react';
import { form, control, button } from 'react-validation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";


const CustomInput = ({ error, isChanged, isUsed, ...props }) => {

    const [showPassword, setShowPassword] = useState(props.type == 'password' ? false : true);
    const [focus, setFocus] = useState(false);
    const [type, setType] = useState(props.type);
    const togglePassword = () => {
            setShowPassword(!showPassword);
    }

    useEffect(() => {
        setType(showPassword ? 'text' : 'password')
    }, [showPassword]);

    // console.log(`error_${props.name}: `, error)

    return <div>
        <div style={{
            display: 'flex',
            border: focus ? 'solid 2px #506273' : 'solid 1px #506273' 
        }}
        className={['input__style', isChanged && isUsed && error && 'input__style_red_border'].join(' ')}>
            <input {...props} onFocus={() => {
                setFocus(true);
            }} onBlur={() => {setFocus(false)}} className='' type={type} />
            {props.type == 'password' && <button type='button' onClick={togglePassword}>
                  {showPassword ? (
                      <FontAwesomeIcon icon={faEyeSlash} color={'#b3c6d8'} height={20} width={30}  />
                      ) : (
                    <FontAwesomeIcon icon={faEye} color={'#b3c6d8'} height={20} width={30}  />
                    )}
                </button>}
        </div>
      {/* {error} */}
      <div className="btn__password">
          </div>
      {isChanged && isUsed && error}
    </div>
    }

const Input = control(CustomInput);

  export default Input;

