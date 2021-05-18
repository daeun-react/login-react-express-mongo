import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_action/user_action";

export default function Auth(SpecificComponent, option, adminRoute = null) {
  // option
  // null : 아무나 가능
  // true : 로그인한 유저만 가능
  // false : 로그인한 유저는 불가능

  function AuthCheck(props) {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);

        // 로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        }
        // 로그인 한 상태
        else {
          if (adminRoute && !response.paylaod.isAdmin) {
            props.history.push("/");
          } else {
            if (option === false) {
              props.history.push("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }

  return AuthCheck;
}
