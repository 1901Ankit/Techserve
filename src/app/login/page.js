"use client";
import React, { Suspense, useEffect, useState } from "react";
// import { adminLogin } from '../../api/admin';
// import { createAdmin } from '../../api/admin';
import { useDispatch } from "react-redux";
// import { login } from '@/redux/userSlice';
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";
import "./Login.css";
import wish from "../../../public/assets/image/wish.png";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { UserContext, UserProvider } from "@/lib/context/userContext";
import { ToastContext } from "@/lib/context/ToastContext";
import bcrypt from "bcryptjs";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt from "jsonwebtoken";


const Login = () => {
  // signup
  const {
    state: { user, token, isAuthenticated, OTP },
    loginReducer,
    registerReducer,
    setGlobalOTP,
  } = useContext(UserContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl") || "/";
  const triggerDownload = searchParams.get("triggerDownload") === "true";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [id, setId] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [errors, setErrors] = useState({});
  const [showsignfield, setshowsignfield] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [showsignOtpField, setShowsignOtpField] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showSigninFields, setShowSigninFields] = useState(true);
  const [showforgetFields, setShowforgetFields] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  // useEffect(() => {
  //   const { redirectUrl, triggerDownload } = router.query;
  //   console.log(redirectUrl,triggerDownload);
  // }, [])

  const onSuccess = async (credentialResponse) => {
    try {
      const { email, given_name, family_name } = jwt.decode(
        credentialResponse.credential
      );
      const details = {
        firstName: given_name,
        email: email,
        lastName: family_name,
      };
      const res = await fetch("/api/user/quick-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });
      if (!res.ok) {
        const errorResponse = await res.json();
        const message = errorResponse.error || "Please try again.";
        throw new Error(message);
      }
      const data = await res.json();
      console.log(data);

      loginReducer({ user: data.user, token: data.token });
      router.push(
        `/${redirectUrl}${triggerDownload ? `?triggerDownload=${triggerDownload}` : ""}`
      );
      showToast("Successfully logged in!", "success");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!showsignfield) {
      const newErrors = validateFormStep1();
      if (Object.keys(newErrors).length === 0) {
        try {
          const details = { fName: firstName, email, activity: "register" };
          const res = await fetch("/api/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(details),
          });

          const data = await res.json();
          if (!res.ok) {
            const message = data.error || "Sign up failed. Please try again.";
            throw new Error(message);
          }
          setGlobalOTP(data.OTP);
          setshowsignfield(true);
        } catch (error) {
          console.log(error);
          setSignInErrors({ api: error.message });
        }
      } else {
        setErrors(newErrors);
      }
    } else if (!showOtpField) {
      const newErrors = validateFormStep2();
      if (Object.keys(newErrors).length === 0) {
      } else {
        setErrors(newErrors);
      }
    } else {
    }
  };

  const validateFormStep1 = () => {
    const newErrors = {};
    const namePattern = /^[a-zA-Z\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!firstName.match(namePattern)) {
      newErrors.firstName = "First name must contain only letters and spaces";
    }
    if (!lastName.match(namePattern)) {
      newErrors.lastName = "Last name must contain only letters and spaces";
    }
    if (!email.match(emailPattern)) {
      newErrors.email = "Email is not valid";
    }
    if (!password.match(passwordPattern)) {
      newErrors.password =
        "Password must be at least 8 characters long and contain at least one letter, one number, and one special character";
    }
    return newErrors;
  };

  const validateFormStep2 = () => {
    const newErrors = {};
    const numberPattern = /^\+?[1-9]\d{1,14}$/;

    if (!number.match(numberPattern)) {
      newErrors.number = "Please enter a valid phone number with country code.";
    }
    return newErrors;
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  // signin//
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInErrors, setSignInErrors] = useState({});
  const { showToast } = useContext(ToastContext);
  const handleSignIn = async (e) => {
    e.preventDefault();
    const newErrors = validateSignInForm();
    if (Object.keys(newErrors).length === 0) {
      try {
        const loginDetails = {
          email: signInEmail,
          password: signInPassword,
        };
        const res = await fetch("/api/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginDetails),
        });
        if (!res.ok) {
          const errorResponse = await res.json();
          const message =
            errorResponse.error || "Login failed. Please try again.";
          throw new Error(message);
        }
        const data = await res.json();
        loginReducer({ user: data.user, token: data.token });
        setSignInEmail("");
        setSignInPassword("");
        router.push(
          `/${redirectUrl}${triggerDownload ? `?triggerDownload=${triggerDownload}` : ""}`
        );
        showToast("Successfully logged in!", "success");
      } catch (error) {
        setSignInErrors({ api: error.message });
      }
    } else {
      setSignInErrors(newErrors);
    }
  };
  const validateSignInForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!signInEmail.match(emailPattern)) {
      newErrors.email = "Email is not valid";
    }
    if (!signInPassword.match(passwordPattern)) {
      newErrors.password =
        "Password must be at least 8 characters long and contain at least one letter and one number";
    }

    return newErrors;
  };

  const handleEmailChange = (e) => {
    setSignInEmail(e.target.value);
    if (signInErrors.email) {
      setSignInErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    setSignInPassword(e.target.value);
    if (signInErrors.password) {
      setSignInErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  // otp
  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    const otpCopy = [...otp];
    otpCopy[index] = value;
    setOtp(otpCopy);
    if (value && index < otp.length - 1) {
      const nextInput = document.querySelector(
        `.otp-input:nth-of-type(${index + 2})`
      );
      if (nextInput) {
        nextInput.focus();
      }
    }

    if (!value && index > 0) {
      const prevInput = document.querySelector(
        `.otp-input:nth-of-type(${index})`
      );
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const adminData = {
        firstName,
        lastName,
        email,
        password,
        phone: number,
      };
      const enteredOTP = otp.join("");
      const isOTPVerified = await bcrypt.compare(enteredOTP.toString(), OTP);

      if (!isOTPVerified) {
        // show Invalid Otp entered and give resend OTP option
      } else {
        const res = await fetch("/api/user/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(adminData),
        });
        const data = await res.json();

        if (!res.ok) {
          const message = data.error || "Sign up failed. Please try again.";
          throw new Error(message);
        }
        registerReducer({ user: data.user, token: data.token });

        router.push(
          `/${redirectUrl}${triggerDownload ? `?triggerDownload=${triggerDownload}` : ""}`
        );
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setNumber("");
      }
    } catch (error) {}
  };
  
  const handleForgetPasswordClick = async () => {
    setShowsignOtpField(true);
    setShowforgetFields(false);
    try {
      const res = await fetch("/api/user/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signInEmail }),
      });
      if (!res.ok) {
        const errorResponse = await res.json();
        const message =
          errorResponse.error || "Login failed. Please try again.";
        throw new Error(message);
      }
      const data = await res.json();

      setGlobalOTP(data.OTP);
      setId(data.id);
    
    } catch (error) {
      setGlobalOTP("");
      setId("");
    }
  };
  const handleVerifysignOtp = async (e) => {
    e.preventDefault();

    try {
      
      const enteredOTP = otp.join("");
      
      const isOTPVerified = await bcrypt.compare(enteredOTP, OTP);

      if (!isOTPVerified) {
      } else {
        setShowsignOtpField(false);
        setShowforgetFields(true);
      }
    } catch (error) {
      // show error that password isn't matched enter correct one or resend to get new otp
// show error that password isn't matched enter correct one or resend to get new otp

    }
  };

  const handleSavePassword = async (e) => {
        e.preventDefault();
    // apply validation
    try {
      const details={ newPassword: forgotPassword.newPassword,
        id: id,};
      const res = await fetch("/api/user/reset-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });
      if (!res.ok) {
        const errorResponse = await res.json();
        const message =
          errorResponse.error || "failed to update password. Please try again.";
        throw new Error(message);
      }
      const data = await res.json();
      // since password changed successfully disable password filed and show log in filed
    } catch (error) {
      console.log(error);
      
    }
  };
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="container-fluid head">
          <video autoPlay={true} muted loop id="background-video">
            <source src="https://qawsedrftgyhujikl.s3.ap-south-1.amazonaws.com/15439974-uhd_3840_2160_30fps.mp4" />
          </video>

          <div
            className={`container sizeform ${
              isSignUp ? "right-panel-active" : ""
            }`}
            id="container"
          >
            {/* signup */}
            <div className="form-container sign-up-container">
              <form onSubmit={handleSubmit}>
                <Link href="/">
                  <Image
                    src={wish}
                    alt="Description of image"
                    className=""
                    style={{ width: "100%" }}
                  />
                </Link>

                {!showsignfield && (
                  <>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="First Name"
                        className="inputfiled first-name-input"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      {errors.firstName && (
                        <p className="error">{errors.firstName}</p>
                      )}
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="inputfiled"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    {errors.lastName && (
                      <p className="error">{errors.lastName}</p>
                    )}

                    <input
                      type="email"
                      placeholder="Email"
                      className="inputfiled"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}

                    <input
                      placeholder="Password"
                      className="inputfiled"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && (
                      <p className="error">{errors.password}</p>
                    )}

                    <button type="submit" className="buttonsign mt-3">
                      Next Step
                    </button>
                  </>
                )}

                {showsignfield && !showOtpField && (
                  <>
                    <div className="otp-verification-container">
                      <h1 className="otp-instruction">
                        {" "}
                        An OTP has been sent to your email.
                      </h1>
                      <p className="otpverif">
                        Please enter the OTP to verify.
                      </p>

                      <div className="otp-input-wrapper mt-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                          <input
                            key={index}
                            maxLength="1"
                            pattern="[0-9]*"
                            autoComplete="off"
                            className="otp-input"
                            type="text"
                            value={otp[index] || ""}
                            onChange={(e) => handleOtpChange(e, index)}
                            onFocus={(e) => e.target.select()}
                          />
                        ))}
                        <svg
                          viewBox="0 0 240 1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line
                            x1="0"
                            y1="0"
                            x2="240"
                            y2="0"
                            stroke="#3e3e3e"
                            strokeWidth="5"
                            strokeDasharray="44,22"
                          />
                        </svg>
                      </div>
                    </div>
                    {errors.otp && <span className="error">{errors.otp}</span>}
                    <button
                      className="bg-[#000]  text-[14px] text-white px-4 py-2 rounded-2xl	 transition-colors duration-300 mt-3"
                      type="submit"
                      onClick={handleVerifyOtp}
                    >
                      Verify OTP
                    </button>
                  </>
                )}
              </form>
            </div>

            {/* signin */}

            <div className="form-container sign-in-container">
              <form onSubmit={handleSignIn}>
                <Link href="/">
                  <Image
                    src={wish}
                    alt="Description of image"
                    className=""
                    style={{ width: "100%" }}
                  />
                </Link>
                {!showsignOtpField && !showforgetFields && (
                  <>
                    <input
                      type="email"
                      placeholder="Email"
                      className="block w-full border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 pr-10 focus:outline-none focus:ring-0"
                      value={signInEmail}
                      onChange={handleEmailChange}
                    />
                    {signInErrors.email && (
                      <div className="error">{signInErrors.email}</div>
                    )}
                    <input
                      type="password"
                      placeholder="Password"
                      className="block w-full border-[1px] border-[#93C3FD] rounded-md py-2 mt-5 pl-2 pr-10 focus:outline-none focus:ring-0"
                      value={signInPassword}
                      onChange={handlePasswordChange}
                    />
                    {signInErrors.password && (
                      <div className="error">{signInErrors.password}</div>
                    )}
                    {signInErrors.api && (
                      <div className="error">{signInErrors.api}</div>
                    )}
                    <button
                      type="button"
                      onClick={handleForgetPasswordClick}
                      className="bg-[#fff] text-[14px] text-start text-black px-4 py-3 transition-colors duration-300"
                    >
                      Forget Password
                    </button>
                    <button className="buttonsign">Sign In</button>
                  </>
                )}
                {showsignOtpField && !showforgetFields && (
                  <>
                    <div className="otp-verification-container">
                      <h1 className="otp-instruction">
                        {" "}
                        An OTP has been sent to your email.
                      </h1>
                      <p className="otpverif">
                        Please enter the OTP to verify.
                      </p>

                      <div className="otp-input-wrapper mt-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                          <input
                            key={index}
                            maxLength="1"
                            pattern="[0-9]*"
                            autoComplete="off"
                            className="otp-input"
                            type="text"
                            value={otp[index] || ""}
                            onChange={(e) => handleOtpChange(e, index)}
                            onFocus={(e) => e.target.select()}
                          />
                        ))}
                        <svg
                          viewBox="0 0 240 1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line
                            x1="0"
                            y1="0"
                            x2="240"
                            y2="0"
                            stroke="#3e3e3e"
                            strokeWidth="5"
                            strokeDasharray="44,22"
                          />
                        </svg>
                      </div>
                    </div>
                    {errors.otp && <span className="error">{errors.otp}</span>}
                    <button
                      className="bg-[#000]  text-[14px] text-white px-4 py-2 rounded-2xl	 transition-colors duration-300 mt-3"
                      type="submit"
                      onClick={handleVerifysignOtp}
                    >
                      Verify OTP
                    </button>
                  </>
                )}

                {showforgetFields && (
                  <div>
                    <div className="mt-3">
                      <input
                        value={forgotPassword.newPassword}
                        onChange={(e) =>  
                          setForgotPassword({
                            ...forgotPassword,
                            newPassword: e.target.value,
                          })
                        }
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        className="block w-full border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 pr-10 focus:outline-none focus:ring-0"
                      />
                    </div>

                    <div className=" mt-5">
                      <input
                        value={forgotPassword.confirmPassword}
                        onChange={(e) =>
                          setForgotPassword({
                            ...forgotPassword,
                            confirmPassword: e.target.value,
                          })
                        }
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        className="block w-full border-[1px] border-[#93C3FD] rounded-md py-2 pl-2 pr-10 focus:outline-none focus:ring-0"
                      />
                    </div>

                    <div className="flex justify-between mt-3">
                      <button
                        onClick={handleSavePassword}
                        className="bg-[#000] text-[14px] text-white px-4 py-2 rounded-2xl transition-colors duration-300"
                      >
                        {" "}
                        Save Password
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1 className="createaccount">Welcome Back!</h1>
                  <p className="keepcon">
                    To keep connected with us please login with your personal
                    info
                  </p>
                  <div className="social-container ">
                    {/* <Link href="#" className="facebook">
                      <FaFacebookF className="" />
                    </Link> */}
                    <Link href="#" className="googleplus">
                      <GoogleOAuthProvider
                       
                        clientId={process.env.GOOGLE_CLIENT_ID}
                     
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#FFC107"
                            d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
                          />
                          <path
                            fill="#FF3D00"
                            d="m6.306 14.691l6.571 4.819C14.65s5 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
                          />
                          <path
                            fill="#4CAF50"
                            d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
                          />
                          <path
                            fill="#1976D2"
                            d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
                          />
                        </svg>
                        <GoogleLogin
                          onSuccess={onSuccess}
                          onError={(e) => console.log(e)}
                          // useOneTap
                        />
                      </GoogleOAuthProvider>
                    </Link>
                    {/* <Link href="#" className="linkdin">
                      <FaLinkedinIn />
                    </Link> */}
                  </div>
                  <button className="ghost" onClick={handleSignInClick}>
                    Sign In
                  </button>
                  <Link href="/">
                    <button className="ghost mt-5">Home</button>
                  </Link>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1 className="createaccount">Hello, Explorer!</h1>
                  <p className="keepcon">
                    Enter your personal details and start your journey with us
                  </p>
                  <div className="social-container">
                    {/* <Link href="#" className="facebook">
                      <FaFacebookF className="" />
                    </Link> */}
                    <Link href="#" className="googleplus">
                      <GoogleOAuthProvider
                       
                        clientId={process.env.GOOGLE_CLIENT_ID}
                    
                      >
                        <GoogleLogin
                          onSuccess={onSuccess}
                          onError={(e) => console.log(e)}
                        />
                      </GoogleOAuthProvider>
                    </Link>
                    {/* <Link href="#" className="linkdin">
                      <FaLinkedinIn />
                    </Link> */}
                  </div>
                  <button className="ghost" onClick={handleSignUpClick}>
                    Sign Up
                  </button>
                  <Link href="/">
                    <button className="ghost mt-5">Home</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default Login;
