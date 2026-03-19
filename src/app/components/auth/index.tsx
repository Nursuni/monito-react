import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import LoginIcon from "@mui/icons-material/Login";
import CloseIcon from "@mui/icons-material/Close";
import { T } from "../../../lib/types/common";
import { Messages } from "../../../lib/config";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    paddingTop: "80px",
  },
}));

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
  setSignupOpen: (v: boolean) => void;
  setLoginOpen: (v: boolean) => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const {
    signupOpen,
    loginOpen,
    handleSignupClose,
    handleLoginClose,
    setSignupOpen,
    setLoginOpen,
  } = props;

  const classes = useStyles();
  const { setAuthMember } = useGlobals();

  const [memberNick, setMemberNick] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberPassword, setMemberPassword] = useState("");

  const handleKeyDown = (e: T) => {
    if (e.key === "Enter")
      signupOpen ? handleSignupRequest() : handleLoginRequest();
  };

  const handleSignupRequest = async () => {
    try {
      if (!memberNick || !memberPhone || !memberPassword)
        throw new Error(Messages.error3);
      const result = await new MemberService().signup({
        memberNick,
        memberPhone,
        memberPassword,
      } as MemberInput);
      setAuthMember(result);
      handleSignupClose();
    } catch (err) {
      handleSignupClose();
      sweetErrorHandling(err).then();
    }
  };

  const handleLoginRequest = async () => {
    try {
      if (!memberNick || !memberPassword) throw new Error(Messages.error3);
      const result = await new MemberService().login({
        memberNick,
        memberPassword,
      } as LoginInput);
      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      handleLoginClose();
      sweetErrorHandling(err).then();
    }
  };

  const switchToSignup = () => {
    handleLoginClose();
    setTimeout(() => setSignupOpen(true), 200);
  };
  const switchToLogin = () => {
    handleSignupClose();
    setTimeout(() => setLoginOpen(true), 200);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .am-wrap, .am-wrap * {
          font-family: 'Plus Jakarta Sans', sans-serif !important;
          box-sizing: border-box;
        }
        .am-wrap {
          --blue-50:  #EFF6FF;
          --blue-500: #3B82F6;
          --blue-600: #2563EB;
          --blue-700: #1D4ED8;
          --ink:   #0F172A;
          --muted: #64748B;
          --border:#E2E8F0;

          display: flex;
          width: 760px;
          height: 520px;
          max-width: calc(100vw - 32px);
          max-height: calc(100vh - 80px);
          background: #fff;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(15,23,42,0.2);
          position: relative;
        }

        /* close button */
        .am-close {
          position: absolute; top: 14px; right: 14px; z-index: 10;
          width: 32px; height: 32px; border-radius: 50%;
          border: none; background: rgba(0,0,0,0.06); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s;
        }
        .am-close:hover { background: rgba(0,0,0,0.12); }

        /* left image */
        .am-img {
          width: 42%;
          height: 100%;
          flex-shrink: 0;
          object-fit: cover;
          object-position: center 20%;
          display: block;
        }

        /* right form */
        .am-form {
          flex: 1;
          padding: 36px 32px 28px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow-y: auto;
        }

        .am-eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--blue-600); margin-bottom: 8px;
        }
        .am-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--blue-600); }

        .am-title { font-size: 22px; font-weight: 800; color: var(--ink); margin: 0 0 4px; letter-spacing: -0.03em; }
        .am-sub   { font-size: 13px; color: var(--muted); margin: 0 0 20px; font-weight: 500; }

        .am-label {
          display: block; font-size: 10px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--muted); margin-bottom: 5px;
        }

        .am-input {
          width: 100%;
          border: 2px solid var(--border);
          border-radius: 11px;
          padding: 10px 13px;
          font-size: 13px; font-weight: 500;
          color: var(--ink); background: #F8FAFF;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
          margin-bottom: 12px;
        }
        .am-input:focus {
          border-color: var(--blue-500);
          box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
          background: #fff;
        }
        .am-input::placeholder { color: #CBD5E1; }

        .am-btn {
          width: 100%; padding: 12px;
          border-radius: 11px; border: none;
          background: var(--blue-600); color: #fff;
          font-size: 14px; font-weight: 800; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          box-shadow: 0 4px 16px rgba(37,99,235,0.3);
          transition: background 0.18s, transform 0.18s, box-shadow 0.18s;
          margin-top: 4px; letter-spacing: 0.02em;
        }
        .am-btn:hover  { background: var(--blue-700); transform: translateY(-1px); box-shadow: 0 8px 22px rgba(37,99,235,0.38); }
        .am-btn:active { transform: translateY(0); }

        .am-divider {
          display: flex; align-items: center; gap: 10px;
          margin: 18px 0;
        }
        .am-line { flex: 1; height: 1px; background: var(--border); }
        .am-or   { font-size: 11px; font-weight: 600; color: var(--muted); }

        .am-switch { text-align: center; font-size: 13px; font-weight: 500; color: var(--muted); margin: 0; }
        .am-link {
          color: var(--blue-600); font-weight: 700; cursor: pointer;
          border: none; background: none; font-size: 13px;
          transition: color 0.15s; padding: 0;
        }
        .am-link:hover { color: var(--blue-700); text-decoration: underline; }
      `}</style>

      {/* ── SIGNUP ── */}
      <Modal
        className={classes.modal}
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 350 }}
      >
        <Fade in={signupOpen}>
          <div className="am-wrap">
            <button className="am-close" onClick={handleSignupClose}>
              <CloseIcon style={{ fontSize: 16, color: "#64748B" }} />
            </button>

            <img className="am-img" src="/img/login.webp" alt="" />

            <div className="am-form">
              <div className="am-eyebrow">
                <span className="am-dot" /> New here
              </div>
              <h2 className="am-title">Create an account</h2>
              <p className="am-sub">
                Join thousands of happy pet owners today.
              </p>

              <label className="am-label">Username</label>
              <input
                className="am-input"
                placeholder="Choose a username"
                onChange={(e) => setMemberNick(e.target.value)}
              />

              <label className="am-label">Phone Number</label>
              <input
                className="am-input"
                placeholder="+1 000 000 0000"
                onChange={(e) => setMemberPhone(e.target.value)}
              />

              <label className="am-label">Password</label>
              <input
                className="am-input"
                type="password"
                placeholder="Create a password"
                onChange={(e) => setMemberPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <button className="am-btn" onClick={handleSignupRequest}>
                <LoginIcon style={{ fontSize: 17 }} />
                Sign Up
              </button>

              <div className="am-divider">
                <span className="am-line" />
                <span className="am-or">or</span>
                <span className="am-line" />
              </div>

              <p className="am-switch">
                Already have an account?&nbsp;
                <button className="am-link" onClick={switchToLogin}>
                  Log in here →
                </button>
              </p>
            </div>
          </div>
        </Fade>
      </Modal>

      {/* ── LOGIN ── */}
      <Modal
        className={classes.modal}
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 350 }}
      >
        <Fade in={loginOpen}>
          <div className="am-wrap">
            <button className="am-close" onClick={handleLoginClose}>
              <CloseIcon style={{ fontSize: 16, color: "#64748B" }} />
            </button>

            <img className="am-img" src="/img/login.webp" alt="" />

            <div className="am-form">
              <div className="am-eyebrow">
                <span className="am-dot" /> Welcome back
              </div>
              <h2 className="am-title">Log in to your account</h2>
              <p className="am-sub">
                Good to see you again — your pets missed you.
              </p>

              <label className="am-label">Username</label>
              <input
                className="am-input"
                placeholder="Your username"
                onChange={(e) => setMemberNick(e.target.value)}
              />

              <label className="am-label">Password</label>
              <input
                className="am-input"
                type="password"
                placeholder="Your password"
                onChange={(e) => setMemberPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <button className="am-btn" onClick={handleLoginRequest}>
                <LoginIcon style={{ fontSize: 17 }} />
                Log In
              </button>

              <div className="am-divider">
                <span className="am-line" />
                <span className="am-or">or</span>
                <span className="am-line" />
              </div>

              <p className="am-switch">
                Don't have an account yet?&nbsp;
                <button className="am-link" onClick={switchToSignup}>
                  Sign up for free →
                </button>
              </p>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
