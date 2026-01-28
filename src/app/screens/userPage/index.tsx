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

export default function UserPage() {
  const history = useHistory();
  const { authMember } = useGlobals();

  if (!authMember) history.push("/");

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Modify Member Details
            </h2>
            <Settings />
          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            {/* Avatar */}
            <div className="relative mb-4">
              <img
                src={
                  authMember?.memberImage
                    ? `${serverApi}/${authMember.memberImage}`
                    : "/icons/default-user.svg"
                }
                className="w-28 h-28 rounded-full object-cover border"
              />
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow">
                <img
                  src={
                    authMember?.memberType === MemberType.ADMIN
                      ? "/icons/restaurant-badge.svg"
                      : "/icons/user-badge.svg"
                  }
                  className="w-6 h-6"
                />
              </div>
            </div>

            {/* Info */}
            <h3 className="text-lg font-semibold text-gray-800">
              {authMember?.memberNick}
            </h3>
            <p className="text-sm text-gray-500">{authMember?.memberType}</p>
            <p className="text-sm text-gray-500 mt-1">
              {authMember?.memberAddress || "no address"}
            </p>

            {/* Social */}
            <div className="flex gap-4 text-gray-600 mt-4">
              <FacebookIcon className="cursor-pointer hover:text-blue-600" />
              <InstagramIcon className="cursor-pointer hover:text-pink-500" />
              <TelegramIcon className="cursor-pointer hover:text-sky-500" />
              <YouTubeIcon className="cursor-pointer hover:text-red-500" />
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 text-center mt-4">
              {authMember?.memberDesc || "no description"}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
