import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useGlobals } from "../../hooks/useGlobals";
import { useState } from "react";
import { MemberUpdateInput } from "../../../lib/types/member";
import { T } from "../../../lib/types/common";
import { Messages, serverApi } from "../../../lib/config";
import MemberService from "../../services/MemberService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";

const f = "'Plus Jakarta Sans', sans-serif";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  border: "1.5px solid #E2E8F0",
  borderRadius: 10,
  fontSize: 13,
  fontFamily: f,
  fontWeight: 500,
  color: "#0F172A",
  outline: "none",
  background: "white",
  boxSizing: "border-box",
  transition: "border-color 0.18s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  fontWeight: 700,
  color: "#64748B",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  marginBottom: 5,
  fontFamily: f,
};

export function Settings() {
  const { authMember, setAuthMember } = useGlobals();

  const [memberImage, setMemberImage] = useState<string>(
    authMember?.memberImage
      ? `${serverApi}/${authMember.memberImage}`
      : "/icons/default-use.svg",
  );

  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>(
    {
      memberNick: authMember?.memberNick,
      memberPhone: authMember?.memberPhone,
      memberAddress: authMember?.memberAddress,
      memberDesc: authMember?.memberDesc,
      memberImage: authMember?.memberImage,
    },
  );

  const memberNickHandler = (e: T) => {
    memberUpdateInput.memberNick = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };
  const memberPhoneHandler = (e: T) => {
    memberUpdateInput.memberPhone = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };
  const memberDescHandler = (e: T) => {
    memberUpdateInput.memberDesc = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const handleSubmitButton = async (): Promise<void> => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      if (
        !memberUpdateInput.memberNick ||
        !memberUpdateInput.memberPhone ||
        !memberUpdateInput.memberAddress ||
        !memberUpdateInput.memberDesc
      ) {
        throw new Error(Messages.error3);
      }
      const result = await new MemberService().updateMember(memberUpdateInput);
      setAuthMember(result);
      await sweetTopSmallSuccessAlert("Modified successfully!", 700);
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  const handleImageViewer = (e: T) => {
    const file = e.target.files[0];
    const valid = ["image/jpg", "image/jpeg", "image/png"];
    if (!valid.includes(file.type)) {
      sweetErrorHandling(Messages.error5).then();
    } else {
      memberUpdateInput.memberImage = file;
      setMemberUpdateInput({ ...memberUpdateInput });
      setMemberImage(URL.createObjectURL(file));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 22,
        fontFamily: f,
      }}
    >
      {/* IMAGE UPLOAD */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <img
          src={memberImage}
          style={{
            width: 88,
            height: 88,
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #DBEAFE",
            flexShrink: 0,
          }}
        />
        <div>
          <p
            style={{
              fontWeight: 700,
              color: "#0F172A",
              margin: "0 0 3px",
              fontSize: 14,
              fontFamily: f,
            }}
          >
            Profile Photo
          </p>
          <p
            style={{
              fontSize: 12,
              color: "#64748B",
              margin: "0 0 10px",
              fontFamily: f,
            }}
          >
            JPG, JPEG or PNG
          </p>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 16px",
              borderRadius: 10,
              border: "1.5px solid #E2E8F0",
              background: "white",
              fontSize: 12,
              fontWeight: 700,
              color: "#64748B",
              cursor: "pointer",
              fontFamily: f,
              transition: "all 0.18s",
            }}
          >
            <CloudDownloadIcon style={{ fontSize: 16 }} />
            Upload
            <input type="file" hidden onChange={handleImageViewer} />
          </label>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "#E2E8F0" }} />

      {/* USERNAME */}
      <div>
        <label style={labelStyle}>Username</label>
        <input
          type="text"
          value={memberUpdateInput.memberNick}
          placeholder={authMember?.memberNick}
          onChange={memberNickHandler}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#2563EB")}
          onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
        />
      </div>

      {/* PHONE + ADDRESS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label style={labelStyle}>Phone</label>
          <input
            type="text"
            value={memberUpdateInput.memberPhone}
            placeholder={authMember?.memberPhone ?? "no phone"}
            onChange={memberPhoneHandler}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#2563EB")}
            onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
          />
        </div>
        <div>
          <label style={labelStyle}>Address</label>
          <input
            type="text"
            value={memberUpdateInput.memberAddress}
            placeholder={authMember?.memberAddress ?? "no address"}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#2563EB")}
            onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
          />
        </div>
      </div>

      {/* DESCRIPTION */}
      <div>
        <label style={labelStyle}>Description</label>
        <textarea
          value={memberUpdateInput.memberDesc}
          placeholder={authMember?.memberDesc ?? "no description"}
          onChange={memberDescHandler}
          style={
            {
              ...inputStyle,
              height: 100,
              resize: "none",
              lineHeight: 1.6,
            } as React.CSSProperties
          }
          onFocus={(e) => (e.target.style.borderColor = "#2563EB")}
          onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
        />
      </div>

      {/* SAVE */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleSubmitButton}
          style={{
            padding: "10px 28px",
            borderRadius: 10,
            border: "none",
            background: "#2563EB",
            color: "white",
            fontWeight: 700,
            fontSize: 13,
            fontFamily: f,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(37,99,235,0.28)",
            transition: "background 0.18s",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLButtonElement).style.background = "#1D4ED8")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLButtonElement).style.background = "#2563EB")
          }
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
