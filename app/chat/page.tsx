// create a next.js page
import { chatMachine } from "@/machines/chatMachine";
import { useMachine } from "@xstate/react";
import React from "react";

function Feedback() {
  const [state, send] = useMachine(chatMachine);

  return (
    <>
      <div>
        <div className="flex justify-center items-center h-screen ">
          <div className="w-80 h-96 bg-[#04090C] rounded shadow-2xl">
            <nav className="w-full h-10 bg-[#1F2C33] rounded-tr rounded-tl flex justify-between items-center">
              <div className="flex justify-center items-center">
                {" "}
                <i className="mdi mdi-arrow-left font-normal text-gray-300 ml-1" />{" "}
                <img
                  src="https://i.imgur.com/IAgGUYF.jpg"
                  className="rounded-full ml-1"
                  width={25}
                  height={25}
                />{" "}
                <span className="text-xs font-medium text-gray-300 ml-1">
                  Alex cairo
                </span>{" "}
              </div>
              <div className="flex items-center">
                {" "}
                <i className="mdi mdi-video text-gray-300 mr-4" />{" "}
                <i className="mdi mdi-phone text-gray-300 mr-2" />{" "}
                <i className="mdi mdi-dots-vertical text-gray-300 mr-2" />{" "}
              </div>
            </nav>
            <div
              className="overflow-auto px-1 py-1"
              style={{ height: "19rem" }}
              id="journal-scroll"
            >
              <div className="flex justify-center">
                {" "}
                <span
                  className="text-gray-500 text-xs pt-4"
                  style={{ fontSize: 8 }}
                >
                  Call started at 02:33 am
                </span>{" "}
              </div>
              <div className="flex items-center pr-10">
                {" "}
                <img
                  src="https://i.imgur.com/IAgGUYF.jpg"
                  className="rounded-full shadow-xl"
                  width={15}
                  height={15}
                  style={{ boxShadow: "" }}
                />{" "}
                <span
                  className="flex ml-1 h-auto bg-[#1F2C33] text-gray-200 text-xs font-normal rounded-sm px-2 p-1.5 items-end"
                  style={{ fontSize: 10 }}
                >
                  Hi Dr.Hendrikson, I haven't been feeling well for past few
                  days.{" "}
                  <span className="text-gray-400 pl-1" style={{ fontSize: 8 }}>
                    01:25am
                  </span>
                </span>{" "}
              </div>
              <div className="flex justify-end pt-2.5 pl-10">
                {" "}
                <span
                  className="bg-[#015C4B] h-auto text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end flex justify-end "
                  style={{ fontSize: 10 }}
                >
                  Lets jump on a video call.{" "}
                  <span className="text-gray-400 pl-1" style={{ fontSize: 8 }}>
                    02.30am
                  </span>
                </span>{" "}
              </div>

              <div className=" " id="chatmsg">
                {" "}
              </div>
            </div>
            <div className="flex justify-between items-center p-1 ">
              <div className="relative">
                {" "}
                <i
                  className="mdi mdi-emoticon-excited-outline absolute top-1 left-1 text-gray-400"
                  style={{ fontSize: "17px !important", fontWeight: "bold" }}
                />{" "}
                <input
                  type="text"
                  className="rounded-full pl-6 pr-12 py-2 focus:outline-none h-auto placeholder-gray-100 bg-[#1F2C33] text-white"
                  style={{ fontSize: 11, width: 250 }}
                  placeholder="Type a message..."
                  id="typemsg"
                />{" "}
                <i className="mdi mdi-paperclip absolute right-8 top-1 transform -rotate-45 text-gray-400" />{" "}
                <i className="mdi mdi-camera absolute right-2 top-1 text-gray-400" />{" "}
              </div>
              <div className="w-7 h-7 rounded-full bg-blue-300 text-center items-center flex justify-center hover:bg-[#1F2C33] hover:text-white">
                {" "}
                <i className="mdi mdi-microphone " />{" "}
              </div>
              <div className="w-7 h-7 rounded-full bg-blue-300 text-center items-center flex justify-center">
                {" "}
                <button className="w-7 h-7 rounded-full text-center items-center flex justify-center focus:outline-none hover:bg-[#1F2C33] hover:text-white">
                  <i className="mdi mdi-send " />
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Feedback;
