import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContest } from "../context/AppContest";
import axios from "axios";
import { toast } from "react-toastify";

const Navba = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setIsUserData, setIsLoggedin } = useContext(AppContest);
  const sendVerificationOtp = async ()=>{
    try {
        axios.defaults.withCredentials=true;

        const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp')
        if(data.success){
            navigate('/email-verify')
            toast.success(data.message)
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
        
    }
  }

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLoggedin(false);
      data.success && setIsUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="navbar">
      <img src={assets.logo} alt="" className="logo" />
      {userData ? (
        <div className="user-profile">
          {userData.name[0].toUpperCase()}
          <div className="dropdown">
            <ul>
              {!userData.isAccountVerified && <li onClick={sendVerificationOtp} className="dropdown-item">Verify Email</li>}
              <li onClick={logout} className="dropdown-item">Log Out</li>
            </ul>
          </div>
        </div>
      ) : (
        <button onClick={() => navigate("/login")} className="login-button">
          Login <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
};

export default Navba;

/* CSS Inside the Same File */
const styles = document.createElement("style");
styles.innerHTML = `
  .navbar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    position: absolute;
    top: 0;
  }

  .logo {
    width: 7rem;
  }

  .login-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid gray;
    border-radius: 999px;
    padding: 0.5rem 1.5rem;
    color: gray;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .login-button:hover {
    background-color: #f3f3f3;
  }

  .user-profile {
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: black;
    color: white;
    position: relative;
    cursor: pointer;
  }

  .dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #f3f3f3;
    border-radius: 5px;
    display: none;
    z-index: 10;
  }

  .user-profile:hover .dropdown {
    display: block;
  }

  .dropdown ul {
    list-style: none;
    margin: 0;
    padding: 10px;
  }

  .dropdown-item {
    padding: 5px 10px;
    cursor: pointer;
  }

  .dropdown-item:hover {
    background-color: #e0e0e0;
  }

  @media (min-width: 640px) {
    .navbar {
      padding: 1.5rem 6rem;
    }
    .logo {
      width: 8rem;
    }
  }
`;
document.head.appendChild(styles);
