import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, RootState } from "../../State";
import { bindActionCreators } from "redux";
import { useCookies } from "react-cookie";
import axios from "axios";

function ConnectionChecker(props: {
  component: any;
}): JSX.Element {

  const userData = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch();
    const { setUser } = bindActionCreators(actionCreators, dispatch);

    //A MODIFIER ALED CA MARCHE PAS COMME ON VEUT
    const [cookies, setCookie, removeCookie] = useCookies(["auth-cookie"]);

    if (!cookies["auth-cookie"])
      setUser(null)
    else
      axios.get("http://localhost:5001/user/userExist/" + cookies["auth-cookie"].refreshToken).then((item) => { console.log('item.data', item.data); setUser(item.data) })

  useEffect(() => {
    console.log('useEffect')
  })

  return userData.user !== null ? <>{props.component}</> : <Navigate to="/Login" />;
}

export default ConnectionChecker;
