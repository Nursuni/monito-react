import { Box } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";
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

  /** HANDLERS (unchanged) */
  const memberNickHandler = async (e: T) => {
    memberUpdateInput.memberNick = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberPhoneHandler = async (e: T) => {
    memberUpdateInput.memberPhone = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberDescHandler = async (e: T) => {
    memberUpdateInput.memberDesc = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const handleSubmitButton = async (): Promise<void> => {
    try {
      if (!authMember) throw new Error(Messages.error2);

      if (
        memberUpdateInput.memberNick === "" ||
        memberUpdateInput.memberPhone === "" ||
        memberUpdateInput.memberAddress === "" ||
        memberUpdateInput.memberDesc === ""
      ) {
        throw new Error(Messages.error3);
      }

      const member = new MemberService();
      const result = await member.updateMember(memberUpdateInput);
      setAuthMember(result);

      await sweetTopSmallSuccessAlert("Modified successfully!", 700);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const handleImageViewer = (e: T) => {
    const file = e.target.files[0];
    const validateImageTypes = ["image/jpg", "image/jpeg", "image/png"];

    if (!validateImageTypes.includes(file.type)) {
      sweetErrorHandling(Messages.error5).then();
    } else {
      memberUpdateInput.memberImage = file;
      setMemberUpdateInput({ ...memberUpdateInput });
      setMemberImage(URL.createObjectURL(file));
    }
  };

  return (
    <Box className="space-y-8">
      {/* IMAGE */}
      <div className="flex items-center gap-6">
        <img
          src={memberImage}
          className="w-28 h-28 rounded-full object-cover border shadow"
        />

        <div className="space-y-1">
          <p className="font-medium text-gray-800">Upload image</p>
          <p className="text-sm text-gray-500">JPG, JPEG, PNG formats only</p>
          <Button component="label" onChange={handleImageViewer}>
            <CloudDownloadIcon />
            <input type="file" hidden />
          </Button>
        </div>
      </div>

      {/* USERNAME */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          type="text"
          value={memberUpdateInput.memberNick}
          placeholder={authMember?.memberNick}
          onChange={memberNickHandler}
          className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* PHONE + ADDRESS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="text"
            value={memberUpdateInput.memberPhone}
            placeholder={authMember?.memberPhone ?? "no phone"}
            onChange={memberPhoneHandler}
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            value={memberUpdateInput.memberAddress}
            placeholder={authMember?.memberAddress ?? "no address"}
            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={memberUpdateInput.memberDesc}
          placeholder={authMember?.memberDesc ?? "no description"}
          onChange={memberDescHandler}
          className="w-full rounded-lg border px-4 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* SAVE */}
      <div className="flex justify-end">
        <Button variant="contained" onClick={handleSubmitButton}>
          Save
        </Button>
      </div>
    </Box>
  );
}
