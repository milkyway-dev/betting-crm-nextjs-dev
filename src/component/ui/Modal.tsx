import { EditFormData, ModalProps } from "@/utils/Types";
import React, { useState } from "react";
import ChevronDown from "../svg/ChevronDown";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, Type }) => {

  //Edit
  const [formData, setFormData] = useState<EditFormData>({
    UpdatePassword: "",
    UpdateStatus: "",
    Recharge: "",
    Redeem: "",
  });

  const handelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Constructing an object from the form data
    const dataObject: EditFormData = {
      ...formData,
      UpdatePassword: formData.UpdatePassword.trim(), // Trim whitespace
      Recharge: formData.Recharge.trim(), // Trim whitespace
      Redeem: formData.Redeem.trim(), // Trim whitespace
    };

    console.log(dataObject);

    // Reset form data after logging
    setFormData({
      UpdatePassword: "",
      UpdateStatus: "",
      Recharge: "",
      Redeem: "",
    });
  };
  //Edit
  if (!isOpen) return null;

  switch (Type) {
    case "Delete":
      return (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <div
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            // Prevents the click from propagating to the outer div
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white transition-all p-6 rounded-lg w-96 mx-auto my-8 space-y-4"
            >
              <p className="text-lg text-black text-center font-semibold">
                Are you sure you want to delete?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  className="px-6 py-1.5 bg-red-500 text-white rounded-3xl hover:bg-red-600 transition duration-200 ease-in-out"
                  onClick={onConfirm}
                >
                  Yes
                </button>
                <button
                  className="px-6 py-1.5 rounded-3xl bg-gray-300 text-black hover:bg-gray-400 transition duration-200 ease-in-out"
                  onClick={onClose}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    case "Edit":
      return (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              onClick={(e) => e.stopPropagation()}
              className="px-12 py-14 border-[1px] border-[#464646] w-[90%] md:w-[70%] lg:w-[50%]  xl:w-[30%] rounded-[2.5rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#0E0E0E]"
            >
              <form onSubmit={handelSubmit}>
                <div>
                  <div className="text-white text-opacity-40 text-base pl-2 pb-2">
                    Update Password
                  </div>
                  <div className="bg-[#1A1A1A] flex pl-4 items-center mb-5 border-opacity-60 border-dark_black rounded-lg border-[2px] ">
                    <input
                      type="password"
                      name="UpdatePassword"
                      placeholder="Enter new password"
                      value={formData.UpdatePassword}
                      onChange={(e) =>
                        setFormData({ ...formData, UpdatePassword: e.target.value })
                      }
                      className="outline-none w-full bg-[#1A1A1A] placeholder:text-xs rounded-lg px-3 text-base text-white md:placeholder:text-xl placeholder:font-extralight placeholder:text-white placeholder:text-opacity-50 py-2.5"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-white text-opacity-40 text-base pl-2 pb-2">
                    Update Status
                  </div>
                  <div className="bg-[#1A1A1A] flex pl-4 items-center mb-5 border-opacity-60 border-dark_black rounded-lg border-[2px] relative">
                    <select
                      name="UpdateStatus"
                      value={formData.UpdateStatus}
                      onChange={(e) =>
                        setFormData({ ...formData, UpdateStatus: e.target.value })
                      }
                      className="outline-none w-full bg-[#1A1A1A] rounded-lg px-3 text-base text-white text-opacity-40 py-2.5 appearance-none"
                      style={{ paddingRight: "30px" }}
                    >
                      <option value="">Select</option>
                      <option value="active">Active</option>
                      <option value="Inactive">InActive</option>
                    </select>
                    <span className="pr-4 text-white text-opacity-40">
                      <ChevronDown />
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-white text-opacity-40 text-base pl-2 pb-2">
                    Recharge
                  </div>
                  <div className="bg-[#1A1A1A] flex pl-4 items-center mb-5 border-opacity-60 border-dark_black rounded-lg border-[2px] ">
                    <input
                      type="text"
                      name="Recharge"
                      placeholder="Enter amount"
                      value={formData.Recharge}
                      onChange={(e) =>
                        setFormData({ ...formData, Recharge: e.target.value })
                      }
                      className="outline-none w-full bg-[#1A1A1A] placeholder:text-xs rounded-lg px-3 text-base text-white md:placeholder:text-xl placeholder:font-extralight placeholder:text-white placeholder:text-opacity-50 py-2.5"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-white text-opacity-40 text-base pl-2 pb-2">
                    Redeem
                  </div>
                  <div className="bg-[#1A1A1A] flex pl-4 items-center mb-5 border-opacity-60 border-dark_black rounded-lg border-[2px] ">
                    <input
                      type="text"
                      name="Redeem"
                      placeholder="Enter redeemed amount"
                      value={formData.Redeem}
                      onChange={(e) =>
                        setFormData({ ...formData, Redeem: e.target.value })
                      }
                      className="outline-none w-full bg-[#1A1A1A] placeholder:text-xs rounded-lg px-3 text-base text-white md:placeholder:text-xl placeholder:font-extralight placeholder:text-white placeholder:text-opacity-50 py-2.5"
                    />
                  </div>
                </div>

                <div className="flex space-x-4 justify-center pt-4">
                  <button
                    onClick={onClose}
                    className="text-white w-[90%] bg-[#69696933] uppercase border-[1px] border-[#AAAAAA] text-xl text-center py-3 rounded-xl shadow-xl"
                  >
                    CANCLE
                  </button>
                  <button
                    type="submit"
                    className="text-white w-[90%] bg-[#69696933] uppercase border-[1px] border-[#AAAAAA] text-xl text-center py-3 rounded-xl shadow-xl"
                  >
                    SAVE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default Modal;
