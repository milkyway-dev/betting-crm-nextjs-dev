import { EditFormData, ModalProps } from "@/utils/Types";
import React, { useState } from "react";
import ChevronDown from "../svg/ChevronDown";
import { deleteAgent, deletePlayer, transactions, updateAgent, updatePlayer } from "@/utils/action";
import toast from "react-hot-toast";
import ReactDOM from 'react-dom'; // Import createPortal
import Loader from "./Loader";
// Other imports remain unchanged

const Modal: React.FC<ModalProps> = ({ isOpen, onClose = () => { }, Type, data, Tabs = [], Page }) => {
  const [load, setLoad] = useState(false)
  const caseType = Type === "Recharge" ? "Recharge" : "Redeem";
  //Edit
  const [formData, setFormData] = useState<EditFormData>({
    id: data?._id,
    password: "",
    status: data?.status,
  });
  const handelSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (data?.role === "agent") {
      try {
        setLoad(true)
        const response = await updateAgent(formData);
        if (response?.error) {
          return toast.error(response?.error || "Can't Update Agent");
        }
        onClose();
        setLoad(false)
      } catch (error) {
        setLoad(false)

      }
    } else {
      try {
        setLoad(true)
        const response = await updatePlayer(formData);
        if (response?.error) {
          return toast.error(response?.error || "Can't Update Player");
        }
        onClose();
        setLoad(false)
      } catch (error) {
        setLoad(false)
      }
    }
  };

  const onConfirm = async () => {
    const id = data?._id
    if (data.role === "agent") {
      try {
        setLoad(true)
        const response = await deleteAgent(id)
        if (response?.error) {
          return toast.error(response?.error || "Can't Delete Agent");
        }
        onClose();
        setLoad(false)
      } catch (error) {
        setLoad(false)
      }
    } else {
      try {
        setLoad(true)
        const response = await deletePlayer(id);
        if (response?.error) {
          return toast.error(response?.error || "Can't Delete Player");
        }
        onClose();
        setLoad(false)
      } catch (error) {
        setLoad(false)
      }
    }
  }
  //Edit
  //Recharge
  const [transaction, setTransaction] = useState("0");
  const handleRecharge = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // reciever: receiverId, amount, type
    const type = Type?.toLowerCase();
    const dataObject = {
      reciever: data._id,
      amount: transaction,
      type: type
    };
    try {
      setLoad(true)
      const response = await transactions(dataObject);
      if (response?.error) {
        return toast.error(response?.error || "Can't Recharge");
      }
      onClose();
      toast.success(`${caseType} Successful!`)
      setLoad(false)
    } catch (error) {
      setLoad(false)
    }
  }


  if (!isOpen) return null;
  const modalElement = document.getElementById("modal");

  if (!modalElement) {
    toast.error('Element with id "modal" not found');
    return null;
  }

  switch (Type) {
    case "Delete":
      return ReactDOM.createPortal(
        <>
          <div
            className="fixed inset-0 flex items-center justify-center z-[100]"
            onClick={onClose}
          >
            <div
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
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
          <Loader show={load} />
        </>
        ,
        modalElement
      );
    case "Edit":
      return ReactDOM.createPortal(
        <>
          <div
            className="fixed inset-0 flex items-center justify-center z-[100]"
            onClick={onClose}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div
                onClick={(e) => e.stopPropagation()}
                className="px-12 py-14 border-[1px] border-[#464646] w-[90%] md:w-[70%] lg:w-[50%]  xl:w-[30%] rounded-[2.5rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] dark:bg-white bg-[#0E0E0E]"
              >
                <form onSubmit={handelSubmit}>
                  <div>
                    <div className="text-white text-opacity-40 dark:text-black text-base pl-2 pb-2">
                      Update Password
                    </div>
                    <div className="bg-[#1A1A1A] flex pl-4 items-center dark:bg-onDark dark:border-opacity-30 mb-5 border-opacity-60 border-dark_black rounded-lg border-[2px] ">
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter new password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="outline-none w-full bg-[#1A1A1A] placeholder:text-xs dark:bg-onDark dark:placeholder:text-black  rounded-lg px-3 text-base text-white md:placeholder:text-xl placeholder:font-extralight placeholder:text-white placeholder:text-opacity-50 py-2.5"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-white text-opacity-40 dark:text-black text-base pl-2 pb-2">
                      Update Status
                    </div>
                    <div className="bg-[#1A1A1A] flex pl-4 items-center  dark:bg-onDark dark:border-opacity-30 mb-5 border-opacity-60 border-dark_black rounded-lg border-[2px] relative">
                      <select
                        name="status"
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        className="outline-none w-full bg-[#1A1A1A] rounded-lg px-3 text-base dark:bg-onDark dark:text-black text-white text-opacity-40 py-2.5 appearance-none"
                        style={{ paddingRight: "30px" }}
                      >
                        <option value="">Select</option>
                        <option value="active">Active</option>
                        <option value="inactive">InActive</option>
                      </select>
                      <span className="pr-4 text-white dark:text-black text-opacity-40">
                        <ChevronDown />
                      </span>
                    </div>
                  </div>



                  <div className="flex space-x-4 justify-center pt-4">

                    <button
                      type="submit"
                      className="text-white w-[90%] bg-[#69696933] uppercase border-[1px] dark:text-black border-[#AAAAAA] text-sm text-center py-3 rounded-xl shadow-xl"
                    >
                      SAVE
                    </button>
                    <button
                      onClick={onClose}
                      className="text-white w-[90%] bg-[#69696933] uppercase border-[1px] dark:text-black border-[#AAAAAA] text-sm text-center py-3 rounded-xl shadow-xl"
                    >
                      CANCLE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Loader show={load} />
        </>
        ,
        modalElement
      );

    case caseType:
      return ReactDOM.createPortal(
        <>
          <div
            className="fixed z-[100] inset-0 flex items-center justify-center"
            onClick={onClose}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div
                onClick={(e) => e.stopPropagation()}
                className="px-12 py-14 border-[1px] dark:bg-white dark:border-opacity-70 border-[#464646] w-[90%] md:w-[70%] lg:w-[50%]  xl:w-[30%] rounded-[2.5rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#0E0E0E]"
              >
                <form onSubmit={handleRecharge}>
                  <div>
                    <div className="text-white dark:text-black text-opacity-40 text-base pl-2 pb-2">
                      {caseType}
                    </div>
                    <div className="bg-[#1A1A1A] flex pl-4 items-center dark:bg-onDark dark:border-opacity-40 mb-5 border-opacity-60 border-dark_black rounded-lg border-[2px] ">
                      <input
                        type="text"
                        placeholder="Enter amount"
                        value={transaction}
                        onChange={(e) => setTransaction(e.target.value)}
                        className="outline-none w-full bg-[#1A1A1A] placeholder:text-xs rounded-lg px-3 text-base dark:text-black dark:bg-onDark dark:placeholder:text-black text-white md:placeholder:text-xl placeholder:font-extralight placeholder:text-white placeholder:text-opacity-50 py-2.5"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4 justify-center pt-4">
                    <button
                      onClick={onClose}
                      className="text-white w-[90%] bg-[#69696933] uppercase border-[1px] dark:text-black border-[#AAAAAA] text-sm text-center py-3 rounded-xl shadow-xl"
                    >
                      CANCLE
                    </button>
                    <button
                      type="submit"
                      className="text-white w-[90%] bg-[#69696933] dark:text-black uppercase border-[1px] border-[#AAAAAA] text-sm text-center py-3 rounded-xl shadow-xl"
                    >
                      SAVE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Loader show={load} />
        </>,
        modalElement
      );
    default:
      return null;
  }
};

export default Modal;
