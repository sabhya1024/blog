import { useState } from "react";

// all icons
import { FaUser, FaRegEyeSlash } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb"; // 1. 



const InputBox = ({ name, type, id, value, placeholder }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);


  let leftIcon = null;
  if (name === "fullname") {
    leftIcon = <FaUser className="input-icon left-4" />;
  }
  else if (name === "email") {
    leftIcon = <MdOutlineMail className="input-icon left-4" />;
  } else if (name === "password") {
    leftIcon = <TbLockPassword className="input-icon left-4" />;
  }
   

  let paddingLeft = "pl-4";
  let paddingRight = "pr-4";

  if (leftIcon) {
    paddingLeft = "pl-16"; 
  }

  if (type === "password") {
    paddingRight = "pr-12"; 
  }

  return (
    <div className="relative w-full mb-4">
      <input
        name={name}
        type={
          type === "password" ? (passwordVisible ? "text" : "password") : type
        }
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        className={`
           input-box
            ${paddingLeft}
            ${paddingRight}
             `}
      />

      {leftIcon}

      {type === "password" ? (
        passwordVisible ? (
          <IoMdEye
            className="input-icon right-4 cursor-pointer"
            onClick={() => setPasswordVisible((val) => !val)}
          />
        ) : (
          <FaRegEyeSlash
            className="input-icon right-4 cursor-pointer"
            onClick={() => setPasswordVisible((val) => !val)}
          />
        )
      ) : null}
    </div>
  );
};

export default InputBox;
