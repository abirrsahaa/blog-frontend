import React, { useState } from "react";
import Posting from "../services/Posting";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Post = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [success, setSuccess] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const token = useSelector((store) => store.token.token);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };
  return (
    <div className="h-[100vh] w-[100vw] bg-green-300 flex justify-center items-center text-white shadow-[5000px]">
      <div className="w-[85%] h-[95%] p-5  bg-white text-black rounded-2xl flex justify-center items-center shadow-lg">
        <div className="w-full h-full  rounded-lg flex justify-between items-center p-3 shadow-3xl">
          <div className="w-[60%] h-full  rounded-lg bg-green-400">
            <img
              src="https://i.pinimg.com/564x/16/1c/dc/161cdcfd1e56c40461ff789405bed890.jpg"
              alt="post"
              className="w-full h-full object-cover  object-center rounded-lg"
            />
          </div>
          <div className="w-[39%] h-[95%]   rounded-lg pt-2 flex flex-col  justify-start gap-2 items-center ">
            <div className="w-[90%] h-[10%]   font-semibold tracking-widest   flex justify-center items-end py-3 text-3xl">
              LET'S CREATE !!!
            </div>
            <div className="w-[90%] h-[75%]   py-3 flex flex-col justify-start items-center gap-6 ">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-[80%] h-[50px] bg-white rounded-lg px-2 border-2 border-gray-400 border-solid shadow-lg"
              />
              <input
                type="text"
                placeholder="Tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-[80%] h-[50px] bg-white rounded-lg px-2 border-2 border-gray-400 border-solid shadow-lg"
              />
              <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-[80%] h-[150px] bg-white rounded-lg px-2 border-2 border-gray-400 border-solid shadow-lg"
              />
              <input
                type="file"
                onChange={handleFileChange}
                placeholder="Image"
                className="rounded-lg bg-white w-[80%] border-2 border-gray-400 border-solid shadow-lg"
              />
              <button
                type="submit"
                onClick={async () => {
                  const response = await Posting(
                    title,
                    content,
                    imageFile,
                    tags,
                    token
                  );
                  if (response.success) {
                    setSuccess(true);
                  }
                }}
                className="w-[80%] h-[45px] bg-green-300 rounded-lg text-white font-semibold text-2xl tracking-wider shadow-2xl hover:bg-green-500 transition-all duration-300 ease-in-out"
              >
                create
              </button>
              {success && <Navigate to="/dashboard" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
