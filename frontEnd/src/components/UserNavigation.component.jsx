import { Link} from "react-router-dom";
import { RiFileEditLine } from "react-icons/ri";
import AnimationWrapper from "../common/AnimationWrapper";
import { useContext } from "react";
import { UserContext } from "../App";
import { logOutUser, removeFromSession } from "../common/session";
import { useState } from "react";
import {toast} from "react-hot-toast"

const UserNavigationPanel = () => {

  const [loading, setLoading] = useState(false);

  const {
    userAuth,
    setUserAuth,
  } = useContext(UserContext);
  const {username} = userAuth || {}

 
  const signOutUser = async () => {
     await setUserAuth({ access_token: null });
    console.log('logut')
    setLoading(true);
    removeFromSession("user");
    logOutUser();
    toast.success("logged out");
   
    return;
  };

  const linkClasses =
    "flex gap-2 md:hidden pl-8 py-4 items-center hover:bg-gray-100 hover:text-black text-gray-500";
  
  return (
    <AnimationWrapper
      className={"absolute right-0 z-50"}
      transition={{ duration: 0.2 }}>
      <div className="bg-white absolute right-0 border border-gray-400 w-60 duration-200 overflow-hidden rounded">
        <Link to="/editor" className={linkClasses}>
          <RiFileEditLine />
          <p>Write</p>
        </Link>

        <Link to={`/user/${username}`} className={linkClasses}>
          <p>Profile</p>
        </Link>

        <Link to="/dashboard/blogs" className={linkClasses}>
          <p>Dashboard</p>
        </Link>

        <Link to="/settings/edit-profile" className={linkClasses}>
          <p>Settings</p>
        </Link>

        <div className="mt-1 border-gray w-full">
          <button
            className="text-left p-4 hover:text-black w-full hover:bg-gray-200 pl-8 py-4"
            onClick={signOutUser}>
            <h1 className="font-bold text-xl mb-1 text-red-500" >Sign Out</h1>
            <p className="text-gray-500">@{username}</p>
          </button>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default UserNavigationPanel;
