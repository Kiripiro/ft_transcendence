import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../State";

function ConnectionChecker(props: {
  component: any;
}): JSX.Element {

  const userData = useSelector((state: RootState) => state.user)

  useEffect(() => {
    console.log('useEffect')
  })

  return userData.user !== null ? <>{props.component}</> : <Navigate to="/Login" />;
}

export default ConnectionChecker;
