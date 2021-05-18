import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_action/user_action";
import { withRouter } from "react-router-dom";

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (inputs.password !== inputs.passwordConfirm) {
      return alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
    }

    let body = inputs;
    dispatch(registerUser(body)).then((res) => {
      if (res.payload.success) {
        props.history.push("/login");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={inputs.email}
          onChange={onChangeHandler}
        />

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={inputs.name}
          onChange={onChangeHandler}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={inputs.password}
          onChange={onChangeHandler}
        />

        <label>Password Confirm</label>
        <input
          type="password"
          name="passwordConfirm"
          value={inputs.passwordConfirm}
          onChange={onChangeHandler}
        />

        <br />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
