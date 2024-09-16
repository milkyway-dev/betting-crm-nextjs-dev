'use client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Close from "../svg/Close";
import { UpdateNotification } from "@/redux/ReduxSlice";
import { getUserNotifications, setViewedNotification } from "@/utils/action";
import Alert from "../svg/Alert";
import Message from "../svg/Message";
import Info from "../svg/Info";
import { config } from "@/utils/config";

const Notifications = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector((state: { globlestate: { openNotification: Boolean } }) => state?.globlestate.openNotification)

  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // Create an EventSource connection to the backend SSE endpoint
    const eventSource = new EventSource(`${config.server}/api/notification/agent`, {
      withCredentials: true,
    });

    // Listen for new notifications
    eventSource.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      //check if the new notification is not already here 
      if (!notifications.some((notification) => notification._id === newNotification._id)) {
        //add notification on top of the list
        setNotifications(prev => [newNotification, ...prev])
      }
    };

    // Clean up the connection when the component unmounts
    return () => {
      eventSource.close();
    };
  }, []);
  const handleViewNotification = async (Id: any) => {
    const data: any = await setViewedNotification(Id);
    if (data?.responseData) {
      getNotification();
    }
  }

  const getNotification = async () => {
    const data: any = await getUserNotifications();
    console.log(data, 'data');
    setNotifications(data);

  }
  useEffect(() => {
    getNotification();
  }, []);




  return (
    <div className={` ${isOpen ? 'right-[0%] top-0 fixed xl:static transition-all ' : '-right-[100%] top-0 fixed xl:static transition-all '}   ${isOpen ? 'flex-.2 transition-all' : 'w-[0%] hidden'} z-50 h-screen  px-5 py-5 dark:bg-white bg-bg_dashboard  border-l-[1px] dark:border-opacity-10 xl:col-span-0 border-[#282828]`}>
      <button className={`absolute top-2 cursor-pointer ${isOpen ? 'block' : 'hidden'} right-2`} onClick={() => dispatch(UpdateNotification(false))}><Close /></button>
      <div className="text-white bg-[#232525] dark:bg-onDark dark:text-black px-6 md:px-8 py-1.5  text-[.9rem] md:text-lg rounded-3xl tracking-wide inline-block">
        Notification
      </div>
      <div className="flex-1 overflow-y-scroll h-[80vh]">
        {/* //WARN: remove this */}
        {/* <p className="text-white text-[.8rem] md:text-lg"> */}
        {/*   {JSON.stringify(notifications, null, 2)} */}
        {/* </p> */}

        {notifications?.map((item, index) => (
          <div key={index} className={`p-3 shadow-sm w-[400px] cursor-pointer ${item.viewed ? 'bg-gray-600' : 'bg-black'} shadow-black `}
            onClick={() => handleViewNotification(item._id)}
          >
            <div className='flex items-center space-x-3'>
              {item.type === 'alert' ? <Alert /> : item.type === 'message' ? <Message /> : <Info />}
              <div className='text-white text-opacity-70 tracking-wide font-light text-sm'>{item?.data.message}</div>
            </div>
            <div className='text-[.6rem] text-right text-white text-opacity-70 pt-1'>{new Date(item?.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} At <span className="text-right">{new Date(item.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;