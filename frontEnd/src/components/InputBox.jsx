import { useState } from "react";

// all icons
import { FaUser, FaRegEyeSlash } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb"; // 1. 

const InputBox = ({ name, type, id, value, placeholder }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  // selecting correct icon
  let leftIcon = null;
  if (name === "fullname") {
    leftIcon = <FaUser className="input-icon left-4" />;
  } else if (name === "email") {
    leftIcon = <MdOutlineMail className="input-icon left-4" />;
  } else if (name === "password") {
    leftIcon = <TbLockPassword className="input-icon left-4" />;
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
          ${leftIcon ? "pl-16" : ""}
          ${type === "password" ? "pr-12" : ""}
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
