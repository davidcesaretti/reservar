import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHostReserves } from "../../actions";
import { Link } from "react-router-dom";

const MyProperties = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    dispatch(getHostReserves(user?.email));
    console.log(user?.email);
  }, []);

  return (
    <div>
      ACA VEO MIS PROPIEDADES
      <Link to="/chathost">
        <button>GO TO MY CHAT </button>
      </Link>
    </div>
  );
};

export default MyProperties;
