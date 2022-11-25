import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();

  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");

  const navigate = useNavigate();

  const user = useSelector((state) => state.user.value);

  const getInfo = async () => {
    const { data } = await axios.get(
      `http://go.contact.mmeducare.com/api/v1/contacts/${id}`,
      {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log(data.contact);
    setFirstName(data?.contact.firstName);
    setSecondName(data?.contact.secondName);
  };

  const apiUpdate = async (userData) => {
    const { data } = await axios.patch(
      `http://go.contact.mmeducare.com/api/v1/contacts/${id}`,
      userData,
      {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log(data);
    if (data) {
      navigate("/dashboard");
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(firstName, secondName);
    apiUpdate({ firstName, secondName });
  };

  useEffect(() => {
    getInfo();
  }, []);
  return (
    <form className="col-6" onSubmit={onSubmitHandler}>
      <h1 className="my-3">Edit Account</h1>
      <input
        type="text"
        placeholder="First Name"
        className="form-control my-3"
        onChange={(e) => setFirstName(e.target.value)}
        defaultValue={firstName}
      />
      <input
        type="text"
        placeholder="Second Name"
        className="form-control my-3"
        onChange={(e) => setSecondName(e.target.value)}
        defaultValue={secondName}
      />
      <button type="submit" className="btn btn-success">
        update
      </button>
    </form>
  );
};

export default Edit;
