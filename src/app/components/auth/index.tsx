import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Box, Fab, Stack, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { T } from "../../../lib/types/common";
import { Message } from "@mui/icons-material";
import { Messages } from "../../../lib/config";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
  },
}));

const ModalImg = styled.img`
  width: 62%;
  height: 100%;
  border-radius: 10px;
  background: #000;
  margin-top: 9px;
  margin-left: 10px;
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const classes = useStyles();
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const { setAuthMember } = useGlobals();
  /** HANDLERS **/
  const handleUsername = (e: T) => {
    console.log(e.target.value);
    setMemberNick(e.target.value);
  };
  const handlePhone = (e: T) => {
    console.log(e.target.value);
    setMemberPhone(e.target.value);
  };
  const handlePassword = (e: T) => {
    console.log(e.target.value);
    setMemberPassword(e.target.value);
  };
  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter" && signupOpen) {
      handleSignupRequest().then();
    } else if (e.key === "Enter" && loginOpen) {
      //login request
    }
  };

  const handleSignupRequest = async () => {
    try {
      const isFulfill =
        memberNick !== "" && memberPhone !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      const signupInput: MemberInput = {
        memberNick: memberNick,
        memberPhone: memberPhone,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);

      //Saving Authenticated USer
      setAuthMember(result);
      handleSignupClose();
    } catch (err) {
      console.log(err);
      handleSignupClose();
      sweetErrorHandling(err).then();
    }
  };

  const handleLoginRequest = async () => {
    try {
      const isFulfill = memberNick !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      const loginInput: LoginInput = {
        memberNick: memberNick,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);
      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      console.log(err);
      handleSignupClose();
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={signupOpen}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{
              width: { xs: "90%", sm: 800 },
              maxHeight: "80vh",
              bgcolor: "background.paper",
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: 24,
              mx: "auto",
              my: 4,
            }}
          >
            {/* Left Image */}
            <Box
              component="img"
              src="/img/login.webp"
              alt="Signup"
              sx={{
                width: { xs: "100%", sm: "50%" },
                height: "100%",
                maxHeight: { xs: 200, sm: "100%" },
                objectFit: "cover",
                alignSelf: "flex-end", // <--- makes image align lower
              }}
            />

            {/* Right Form */}
            <Stack
              spacing={3}
              sx={{
                width: { xs: "100%", sm: "50%" },
                p: { xs: 3, sm: 5 },
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5" fontWeight={600} mb={1}>
                Signup Form
              </Typography>

              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                onChange={handleUsername}
              />
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                onChange={handlePhone}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />

              <Fab
                variant="extended"
                color="primary"
                onClick={handleSignupRequest}
                sx={{ mt: 2, width: "100%", justifyContent: "center" }}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Signup
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={loginOpen}>
          <Stack
            className={classes.paper}
            direction={"row"}
            sx={{ width: "700px" }}
          >
            {/* Left Image */}
            <Box
              component="img"
              src="/img/login.webp"
              alt="Signup"
              sx={{
                width: { xs: "100%", sm: "50%" },
                height: "100%",
                maxHeight: { xs: 200, sm: "100%" },
                objectFit: "cover",
                alignSelf: "flex-end", // <--- makes image align lower
              }}
            />
            <Stack
              sx={{
                marginLeft: "65px",
                marginTop: "25px",
                alignItems: "center",
              }}
            >
              <h2>Login Form</h2>
              <TextField
                id="outlined-basic"
                label="username"
                variant="outlined"
                sx={{ my: "10px" }}
                onChange={handleUsername}
              />
              <TextField
                id={"outlined-basic"}
                label={"password"}
                variant={"outlined"}
                type={"password"}
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
              <Fab
                sx={{ marginTop: "27px", width: "120px" }}
                variant={"extended"}
                color={"primary"}
                onClick={handleLoginRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Login
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}
