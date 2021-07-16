import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { clearDetail, detailHotel } from "../../actions";
import { Link } from "react-router-dom";
import NavBar from "../Nav/Nav2";
import style from "./DetailHotel.module.css";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});

const DetailHotel = () => {
  const detailhotel = useSelector((state: any) => state.categorieDetail);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();
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
            style={{ width: 550 }}
            alt="No image"
          />
        </div>
        <div className={style.contnd}>
          <div className={style.name}>{detailhotel[0]?.name}</div>
          <h3 className={style.des}>Description</h3>
          <div className={style.summ}>{detailhotel[0]?.summary}</div>
          <hr className={style.hr} />
        </div>
        <div className={style.gridPadre}>
          <div className={style.gridHijo1}>
            <p>Arrival date</p>
          </div>
          <div className={style.gridHijo2}>
            <p>Departure date</p>
          </div>
          <div className={style.gridHijo3}>
            <p>¿How many are traveling?</p>
            <input type="text"></input>
          </div>
        </div>
        <div className={style.gridEst}>
            <div className={style.score}>
                <p>Value per night {detailhotel[0]?.price}</p>
                <p>Number of nights</p>
            </div>
            <div className={style.totalp}>
                <p>TOTAL STAY</p>
                <Button className={style.button} variant="contained" color="primary">
                Reserve
                </Button>
            </div>  
        </div>
        <div className={style.contcuad}>
            <div className={style.cuad}>
            <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                />
                {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
            </div>
        </div>
        <div>Score {detailhotel[0]?.score}</div>
        {/* <h2 className={style.service}>OUTSTANDING SERVICIE</h2>
        <div className={style.hr1}></div>
        <div className={style.hr2}></div> */}
        {/*  <div>{detailhotel[0]?.amenities.map((e) => (
                <div>
                    {e === "TV" && <LiveTvIcon/> || e === "Air conditioning" && <AcUnitIcon/> || e}
                </div>
                
            ))}
            </div> */}
        <Link to={"/categories"}>Back</Link>
        <div>Accommodates {detailhotel[0]?.accommodates}</div>
      </div>
    );
  }
};

export default DetailHotel;
