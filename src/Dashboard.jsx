import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "./services/userSlice";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const Dashboard = () => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [num, setNum] = useState(1);
  console.log(user);

  const getContacts = async () => {
    const { data } = await axios.get(
      `http://go.contact.mmeducare.com/api/v1/contacts?page=${num}`,
      { headers: { authorization: `Bearer ${user.token}` } }
    );

    setContacts(data.data);
    console.log(data);
  };

  const apiDelete = async (id) => {
    const { data } = await axios.delete(
      `http://go.contact.mmeducare.com/api/v1/contacts/${id}`,
      {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (data.success) {
      getContacts();
    }
    console.log(data);
  };

  useEffect(() => {
    getContacts();
  }, [num]);

  const onClickHandler = () => {
    navigate("/login");
    dispatch(logout(null));
  };
  return (
    <div>
      <h1>Dashbaord</h1>
      <p>{user?.auth?.name}</p>
      <button onClick={onClickHandler} className="btn btn-outline-danger">
        Logout
      </button>
      <NavLink to="/create">
        <button className="btn btn-primary">Create New Contact</button>
      </NavLink>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Photo</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts?.map((contact) => (
            <tr key={contact.id}>
              <td scope="row">
                <img
                  src={contact.contactPhoto}
                  width="30px"
                  height="30px"
                  className="rounded-circle"
                  alt=""
                />
              </td>
              <td>{contact.fullName}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td className="">
                <NavLink to={`/edit/${contact.id}`}>
                  <button className="text-warning btn">
                    <AiFillEdit />
                  </button>
                </NavLink>
                <button
                  className="text-danger btn"
                  onClick={() => apiDelete(contact.id)}
                >
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tbody></tbody>
      </table>
      <div>
        <button onClick={() => setNum(num - 1)}>prev</button>
        <p>{num}</p>
        <button onClick={() => setNum(num + 1)}>next</button>
      </div>
    </div>
  );
};

export default Dashboard;
