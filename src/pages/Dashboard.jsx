import { useEffect, useState } from "react";
import { MdPostAdd } from "react-icons/md";
import { HiMiniViewfinderCircle } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Header from "./Header";
import { PieChart } from "@mui/x-charts";
// import { DateCalendar } from "@mui/x-date-pickers";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { FaUser } from "react-icons/fa";

const Dashboard = () => {
  const token = useSelector((store) => store.token.token);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [views, setViews] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "http://abirr.me:4000/api/v1/upload/getallDetails",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setUsers(data.allUser);
      setPosts(data.allPost);
      setViews(Math.floor(Math.random() * 10));
    }
    fetchData();
  }, [token]);
  useEffect(() => {
    async function abir() {
      const response = await fetch(
        "http://abirr.me:4000/api/v1/upload/getuser",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setName(data.name);
      console.log(data);
    }
    abir();
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },

    {
      field: "Name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",

      width: 200,
      editable: true,
    },
    {
      field: "objectId",
      headerName: "Object Id",

      width: 200,
      editable: true,
    },
  ];

  const rows = users.map((user, index) => {
    return {
      id: index + 1,
      Name: user.name,
      email: user.email,
      objectId: user._id,
    };
  });

  return (
    <div className="w-[100vw] h-[100vh] p-2 ">
      <Header name={name} />
      <div className="w-full h-[95vh]  flex  items-center justify-center gap-4 p-3 ">
        <div className="w-[55%] h-full bg-blue-200 rounded-lg p-2 flex flex-col items-center justify-between">
          <div className=" w-full h-[35%] p-2  rounded-lg flex justify-center items-center gap-3">
            <div className="w-[33%] shadow-2xl h-full rounded-xl bg-yellow-100 p-2 flex flex-col items-center justify-center gap-2">
              <div className="w-full h-[55%] bg-cyan-200 rounded-lg flex justify-center items-start gap-2 p-2">
                <div className="w-[65%] h-[60%] bg-red-100 rounded-xl shadow-xl text-xl font-bold flex justify-center items-center text-gray-600">
                  BLOGS
                </div>
                <div className="w-[33%] h-[70%] bg-orange-100 rounded-xl shadow-2xl">
                  <MdPostAdd className="w-full h-full text-5xl text-gray-600" />
                </div>
              </div>
              <div className="w-full h-[40%] bg-green-100 rounded-lg flex justify-center items-center text-3xl font-semibold px-5">
                {posts.length}
              </div>
            </div>
            <div className="w-[33%] shadow-2xl h-full rounded-xl bg-gray-100 p-2 flex flex-col items-center justify-center gap-2">
              <div className="w-full h-[55%] bg-cyan-200 rounded-lg flex justify-center items-start gap-2 p-2">
                <div className="w-[65%] h-[60%] bg-red-100 rounded-xl shadow-xl text-xl font-bold flex justify-center items-center text-gray-600">
                  USERS
                </div>
                <div className="w-[33%] h-[70%] bg-orange-100 rounded-xl shadow-2xl p-1">
                  {" "}
                  <FaUser className="w-full h-full text-xl text-gray-600" />
                </div>
              </div>
              <div className="w-full h-[40%] bg-green-100 rounded-lg flex justify-center items-center text-3xl font-semibold px-5">
                {users.length}
              </div>
            </div>
            <div className="w-[33%] shadow-2xl h-full rounded-xl bg-cyan-100 p-2 flex flex-col items-center justify-center gap-2">
              {" "}
              <div className="w-full h-[55%] bg-cyan-200 rounded-lg flex justify-center items-start gap-2 p-2">
                <div className="w-[65%] h-[60%] bg-red-100 rounded-xl shadow-xl text-xl font-bold flex justify-center items-center text-gray-600">
                  VIEWS
                </div>
                <div className="w-[33%] h-[70%] bg-orange-100 rounded-xl shadow-2xl">
                  <HiMiniViewfinderCircle className="w-full h-full text-5xl text-gray-600" />
                </div>
              </div>
              <div className="w-full h-[40%] bg-green-100 rounded-lg flex justify-center items-center text-3xl font-semibold px-5">
                {views}
              </div>
            </div>
          </div>
          <div className="w-full h-[60%] bg-yellow-200 rounded-lg flex flex-col items-start justify-center gap-3 p-3">
            <div className="w-[40%] h-[17%] rounded-xl shadow-2xl tracking-widest bg-blue-100 text-2xl font-bold flex justify-start p-3 items-center">
              LATEST BLOG
            </div>
            <div className="w-full h-[80%] rounded-lg shadow-xl bg-cyan-100 flex justify-center items-center gap-2 p-2">
              <div className="w-[40%] h-[100%] rounded-lg shadow-xl bg-red-100 flex justify-center items-center gap-2 ">
                {posts.length != 0 && (
                  <img
                    src={posts[posts.length - 1].imageUrl}
                    alt="post"
                    className="w-full h-full object-cover object-center rounded-lg"
                  />
                )}
              </div>
              <div className="w-[58%] h-[90%] rounded-lg shadow-xl bg-pink-100 flex flex-col items-start justify-center gap-3 p-2">
                {posts.length != 0 && (
                  <div className="w-full h-[30%] bg-yellow-200 rounded-lg shadow-xl text-3xl tracking-wide font-bold flex justify-center items-center gap-2">
                    {posts[posts.length - 1].title}
                  </div>
                )}
                {posts.length != 0 && (
                  <div className="w-full h-[67%] bg-red-200 rounded-lg shadow-xl flex justify-center items-center gap-2">
                    {posts[posts.length - 1].content}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[42%] h-full p-3 rounded-lg flex flex-col items-center justify-center gap-4">
          <div className="w-full h-[35%] rounded-xl shadow-xl bg-cyan-200  flex justify-center items-center gap-3">
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: posts.length, label: "Post" },
                    { id: 1, value: users.length, label: "Users" },
                    { id: 2, value: views, label: "Views" },
                  ],
                },
              ]}
              width={400}
              height={180}
            />
          </div>
          <div className="w-full h-[63%] rounded-xl shadow-xl ">
            {" "}
            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
          </div>
        </div>
      </div>
      {!token && <Navigate to="/signin" />}
    </div>
  );
};

export default Dashboard;
