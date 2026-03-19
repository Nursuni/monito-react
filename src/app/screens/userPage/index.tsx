import { Container } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Settings } from "./Settings";
import { useHistory } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    .up-root, .up-root * {
      font-family: 'Plus Jakarta Sans', sans-serif !important;
      box-sizing: border-box;
    }
    .up-root {
      --blue-50:  #EFF6FF;
      --blue-100: #DBEAFE;
      --blue-500: #3B82F6;
      --blue-600: #2563EB;
      --blue-700: #1D4ED8;
      --ink:      #0F172A;
      --muted:    #64748B;
      --border:   #E2E8F0;
    }
  `}</style>
);

export default function UserPage() {
  const history = useHistory();
  const { authMember } = useGlobals();

  if (!authMember) history.push("/");

  return (
    <div
      className="up-root"
      style={{ minHeight: "100vh", background: "#F8FAFC", padding: "40px 0" }}
    >
      <FontStyle />
      <Container>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 28,
            alignItems: "start",
          }}
        >
          {/* LEFT — Settings form */}
          <div
            style={{
              background: "white",
              borderRadius: 20,
              border: "1.5px solid var(--border)",
              padding: 32,
            }}
          >
            <div style={{ marginBottom: 24 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--blue-600)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  margin: "0 0 6px",
                }}
              >
                Account
              </p>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "var(--ink)",
                  margin: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                Modify Member Details
              </h2>
            </div>
            <Settings />
          </div>

          {/* RIGHT — Profile card */}
          <div
            style={{
              background: "white",
              borderRadius: 20,
              border: "1.5px solid var(--border)",
              padding: 28,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Avatar */}
            <div style={{ position: "relative", marginBottom: 16 }}>
              <img
                src={
                  authMember?.memberImage
                    ? `${serverApi}/${authMember.memberImage}`
                    : "/icons/default-user.svg"
                }
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid var(--blue-100)",
                  display: "block",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -2,
                  right: -2,
                  background: "white",
                  borderRadius: "50%",
                  padding: 3,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                }}
              >
                <img
                  src={
                    authMember?.memberType === MemberType.ADMIN
                      ? "/icons/restaurant-badge.svg"
                      : "/icons/user-badge.svg"
                  }
                  style={{ width: 22, height: 22, display: "block" }}
                />
              </div>
            </div>

            {/* Name & type */}
            <p
              style={{
                fontSize: 17,
                fontWeight: 800,
                color: "var(--ink)",
                margin: "0 0 4px",
                textAlign: "center",
              }}
            >
              {authMember?.memberNick}
            </p>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "var(--blue-600)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                margin: "0 0 6px",
              }}
            >
              {authMember?.memberType}
            </p>
            <p
              style={{
                fontSize: 13,
                color: "var(--muted)",
                margin: "0 0 20px",
                textAlign: "center",
              }}
            >
              {authMember?.memberAddress || "no address"}
            </p>

            {/* Divider */}
            <div
              style={{
                width: "100%",
                height: 1,
                background: "var(--border)",
                marginBottom: 20,
              }}
            />

            {/* Social icons */}
            <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
              {[
                { Icon: FacebookIcon, hover: "#2563EB" },
                { Icon: InstagramIcon, hover: "#EC4899" },
                { Icon: TelegramIcon, hover: "#0EA5E9" },
                { Icon: YouTubeIcon, hover: "#EF4444" },
              ].map(({ Icon, hover }, i) => (
                <div
                  key={i}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    border: "1.5px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "var(--muted)",
                    transition: "all 0.18s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.color = hover;
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      hover;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.color =
                      "var(--muted)";
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "var(--border)";
                  }}
                >
                  <Icon style={{ fontSize: 18 }} />
                </div>
              ))}
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: 13,
                color: "var(--muted)",
                textAlign: "center",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {authMember?.memberDesc || "no description"}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
