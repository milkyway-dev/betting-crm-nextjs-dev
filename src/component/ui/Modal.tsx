import { EditFormData, ModalProps, ReportsData } from "@/utils/Types";
import React, { useState } from "react";
import ChevronDown from "../svg/ChevronDown";
import { deleteAgent, deletePlayer, transactions, updateAgent, updatePlayer } from "@/utils/action";
import toast from "react-hot-toast";
import ReactDOM from 'react-dom'; // Import createPortal
import Tabs from "./Tabs";
import Table from "./Table";
import Card from "./Card";
import { useSelector } from "react-redux";
// Other imports remain unchanged

const Modal: React.FC<ModalProps> = ({ isOpen, onClose = () => { }, Type, data,Tabs }) => {
  const [activeTab, setActiveTab] = useState('Players')
  const Isreport = useSelector((state: ReportsData) => state.globlestate.Agent)
  const caseType = Type === "Recharge" ? "Recharge" : "Redeem";
  //Edit
  const [formData, setFormData] = useState<EditFormData>({
    id: data._id,
    password: "",
    status: data.status,

  });

  const handelSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dataObject: EditFormData = {
      ...formData,
      password: formData.password.trim(),
      status: formData.status
    };

    if (data.role === "agent") {

      const response = await updateAgent(formData);
      if (response?.error) {
        return alert(response?.error || "Can't Update Agent");
      }
      onClose();

    } else {
      const response = await updatePlayer(formData);
      if (response?.error) {
        return alert(response?.error || "Can't Update Player");
      }
      onClose();

    }

    // Reset form data after logging
    setFormData({
      id: "",
      password: "",
      status: "",
    });
  };

  const onConfirm = async () => {
    const id = data?._id
    if (data.role === "agent") {
      const response = await deleteAgent(id)
      if (response?.error) {
        return alert(response?.error || "Can't Delete Agent");
      }
      onClose();

    } else {
      const response = await deletePlayer(id);
      if (response?.error) {
        return alert(response?.error || "Can't Delete Player");
      }
      onClose();

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
    const response = await transactions(dataObject);
    if (response?.error) {
      return alert(response?.error || "Can't Recharge");
    }
    onClose();
    toast.success(`${caseType} Successful!`)

  }


  if (!isOpen) return null;
  const modalElement = document.getElementById("modal");

  if (!modalElement) {
    console.warn('Element with id "modal" not found');
    return null;
  }

  //Report 
  const fieldsHeadings = [
    "Username",
    "Status",
    "Credits",
    "Created At",
    "Actions",
  ];

  const fieldsData = [
    "username",
    "status",
    "credits",
    "createdAt",
    "actions"
  ]

  const TopCards = [
    {
      Text: "Credits",
      counts: "678",
    },
    {
      Text: "Players",
      counts: "679",
    },
    {
      Text: "Bets",
      counts: "896",
    },
    {
      Text: "Recharge",
      counts: "785",
    },
    {
      Text: "Redeem",
      counts: "785",
    }
  ];


  switch (Type) {
    case "Delete":
      return ReactDOM.createPortal(
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
        </div>,
        modalElement
      );
    case "Edit":
      return ReactDOM.createPortal(
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
        </div>,
        modalElement
      );

    case caseType:
      return ReactDOM.createPortal(
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
        </div>,
        modalElement
      );

    case "Report":
      return ReactDOM.createPortal(
        <div
          className="fixed z-[100] inset-0 flex items-center justify-center"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div onClick={(e) => e.stopPropagation()} className="w-[90%] lg:w-[80%] h-screen overflow-y-scroll py-[2%]">
              <div className={`md:translate-y-[2px] space-x-2 pb-2 md:pb-0 md:space-x-4 flex items-center`}>
                {Tabs?.map((tab, ind) => (
                  <div key={ind} className="relative">
                    {ind !== 0 && tab == activeTab && (
                      <span className="p-5 bg-[#0E0F0F] rounded-bl-[200rem] dark:bg-white dark:border-opacity-30 md:inline-block hidden border-t-[1px] border-[#313131] absolute -bottom-4 -rotate-[52deg] -left-[.6rem]"></span>
                    )}
                    <div
                      onClick={() => setActiveTab(tab)}
                      className={`${tab === activeTab
                        ? "bg-[#0E0F0F] dark:bg-white dark:text-black rounded-[1rem] md:rounded-none md:rounded-t-[2rem] text-white "
                        : "bg-[#E3F5FF] rounded-[1rem] border-none text-black"
                        }   uppercase text-xs cursor-pointer md:text-lg py-2 inline-block border-[1px] dark:border-opacity-30 md:border-b-0 md:border-l-[1px] border-[#313131]   md:border-t-[1px] px-4 md:px-8 border-r-[1px]`}>
                      {tab}
                    </div>

                    {tab == activeTab && (
                      <span className=" p-5 md:inline-block hidden bg-[#0E0F0F] dark:bg-white dark:border-opacity-30 border-t-[1px] border-[#313131] absolute -bottom-4 rotate-[52deg] rounded-br-[200rem]  -right-[.6rem]"></span>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <div className='w-full bg-[#0E0F0F] border-white border-opacity-10 border-t-[1px] border-l-[1px] border-r-[1px] dark:bg-white px-5 rounded-2xl md:rounded-none lg:rounded-r-2xl pt-5 pb-8  grid grid-cols-12 items-center gap-4'>
                  <Card TopCards={TopCards} />
                </div>
                <Table fieldsHeadings={fieldsHeadings} fieldData={fieldsData} data={[]} />
              </div>
            </div>
          </div>
        </div>,
        modalElement
      );

    default:
      return null;
  }
};

export default Modal;
