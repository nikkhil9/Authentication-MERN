import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContest } from "../context/AppContest";

const Header = () => {
    const {userData} =useContext(AppContest)
  return (
    <div style={styles.container}>
      <img src={assets.header_img} alt="" style={styles.profileImage} />
      <h1 style={styles.heading}>
        Hey {userData ? userData.name : 'MANNN' }! <img src={assets.hand_wave} alt="" style={styles.waveIcon} />
      </h1>
      <h2 style={styles.welcomeText}>Welcome to our APP</h2>
      <p style={styles.description}>
        Quickly Login or Register to start our journey
      </p>
      <button style={styles.button}>Get Started</button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "5rem", // Equivalent to mt-20 (20 * 0.25rem = 5rem)
    padding: "1rem",
    textAlign: "center",
    color: "gray",
  },
  profileImage: {
    width: "9rem", // w-36 (36 * 0.25rem = 9rem)
    height: "9rem", // h-36 (same as width)
    borderRadius: "50%", // rounded-full
    marginBottom: "1.5rem", // mb-6
  },
  heading: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "1.25rem", // text-xl
  },
  waveIcon: {
    width: "2rem", // w-8
    aspectRatio: "1/1", // aspect-square
  },
  welcomeText: {
    fontSize: "2rem", // text-3xl
    fontWeight: "600", // font-semibold
    marginBottom: "1rem", // mb-4
  },
  description: {
    marginBottom: "2rem", // mb-8
    maxWidth: "24rem", // msx-w-md (max-width: medium)
  },
  button: {
    border: "1px solid gray",
    borderRadius: "999px",
    padding: "0.625rem 2rem", // px-8 py-2.5
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

// Media Query for `sm` (min-width: 640px)
const applyMediaStyles = () => {
  if (window.innerWidth >= 640) {
    styles.heading.fontSize = "1.875rem"; // sm:text-3xl
    styles.welcomeText.fontSize = "3rem"; // sm:text-5xl
  } else {
    styles.heading.fontSize = "1.25rem"; // Default text-xl
    styles.welcomeText.fontSize = "2rem"; // Default text-3xl
  }
};

applyMediaStyles();
window.addEventListener("resize", applyMediaStyles);

export default Header;
