import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("");

  const apiCreateContct = async () => {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("secondName", secondName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("contactPhoto", photo);
    const { data } = await axios.post(
      "http://go.contact.mmeducare.com/api/v1/contacts",
      formData,
      {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (user?.success) {
      navigate("/dashboard");
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    apiCreateContct();
    console.log(firstName, secondName, email, phone, photo);
  };
  return (
    <form className="col-6" onSubmit={onSubmitHandler}>
      <h1>Create Account</h1>
      <input
        type="text"
        className="form-control my-5"
        placeholder="First Name"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />
      <input
        type="text"
        className="form-control my-5"
        placeholder="Second Name"
        onChange={(e) => setSecondName(e.target.value)}
        value={secondName}
      />
      <input
        type="email"
        className="form-control my-5"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="number"
        className="form-control my-5"
        placeholder="Phone"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
      />
      <input
        type="file"
        className="form-control my-5"
        placeholder="Photo"
        onChange={(e) => setPhoto(e.target.files[0])}
      />
      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

export default Create;
