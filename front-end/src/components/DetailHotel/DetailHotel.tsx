import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { clearDetail, detailHotel } from "../../actions";
import { Link } from "react-router-dom";
import NavBar from "../Nav/Nav2";
import style from "./DetailHotel.module.css";

const DetailHotel = () => {
  const detailhotel = useSelector((state: any) => state.categorieDetail);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(detailHotel(id));
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  if (detailhotel === null) {
    return <h1>Error</h1>;
  } else if (detailhotel.length < 1) {
    return <h1>Cargando...</h1>;
  } else {
    return (
      <div>
        <NavBar />
        <div className={style.contimg}>
          <img
            src={detailhotel[0]?.image}
            style={{ width: 600 }}
            alt="No image"
          />
        </div>
        <div className={style.contnd}>
          <div className={style.name}>{detailhotel[0]?.name}</div>
          <h3 className={style.des}>Description</h3>
          <div className={style.summ}>{detailhotel[0]?.summary}</div>
          <hr className={style.hr} />
        </div>
        {/* <table className={style.contf}>
          <tr className={style.contfechas}>
            <td className={style.fechas}>Arrival date</td>
            <div className={style.hr4}></div>
            <td>Departure date</td>
          </tr>
          <hr className={style.hr3} />
          <td className={style.travel}>¿How many are traveling?</td>
          <tr></tr>
        </table> */}
        <div className={style.gridPadre}>
          <div className={style.gridHijo1}>
            <p>Arrival date</p>
            <p></p>
          </div>
          <div className={style.gridHijo2}>
            <p>Departure date</p>
          </div>
          <div className={style.gridHijo3}>
            <p>¿How many are traveling?</p>
            <input type="text"></input>
          </div>
        </div>
        <h2 className={style.service}>OUTSTANDING SERVICIE</h2>
        <div className={style.hr1}></div>
        <div className={style.hr2}></div>
        {/*  <div>{detailhotel[0]?.amenities.map((e) => (
                <div>
                    {e === "TV" && <LiveTvIcon/> || e === "Air conditioning" && <AcUnitIcon/> || e}
                </div>
                
            ))}
            </div> */}
        <Link to={"/categories"}>Back</Link>
        <div>Accommodates {detailhotel[0]?.accommodates}</div>
        <div>Value per night {detailhotel[0]?.price}</div>
        <div>Score {detailhotel[0]?.score}</div>
      </div>
    );
  }
};

export default DetailHotel;
