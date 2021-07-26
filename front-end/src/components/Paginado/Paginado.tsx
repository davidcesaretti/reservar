import React from "react";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { BotonesPaginado, fetchCardsHotels } from "../../actions";
import PaginationButtons from "./PaginationButtons";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import "./paginado.css";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

function Paginado() {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const dispatch = useDispatch();
  const paginador = useSelector((state: any) => state.paginado);
  const cards = useSelector((state: any) => state.cardsHotel);
  console.log(cards);
  React.useEffect(() => {}, [cards.page]);

  const onPrev = (e) => {
    // if (pagination.page > 2 && pagination.page !== undefined) {
    //  if (paginador.paginado > 1) {
    dispatch(
      BotonesPaginado({ ...paginador, paginado: paginador.paginado - 1 })
    );
    // }

    //setPaginado(paginado - 1);
    setTimeout(() => {
      dispatch(
        //fetchCardsHotels(page, price, amenities, type, accommodates, score);
        fetchCardsHotels(
          paginador.paginado === "nada" ? undefined : paginador.paginado,
          paginador.price === "nada" ? undefined : paginador.price,
          paginador.amenities === "nada" ? undefined : paginador.amenities,
          paginador.type === "nada" ? undefined : paginador.type,
          paginador.guest === "nada" ? undefined : paginador.guest,
          paginador.score === "nada" ? undefined : paginador.score,
          paginador.cities === "nada" ? undefined : paginador.cities,
          paginador.fechas === "nada" ? undefined : paginador.fechas
        )
      );
    }, 100);

    //}
  };

  const onNext = (e) => {
    dispatch(
      BotonesPaginado({ ...paginador, paginado: paginador.paginado + 1 })
    );

    setTimeout(() => {
      dispatch(
        //fetchCardsHotels(page, price, amenities, type, accommodates, score);
        fetchCardsHotels(
          paginador.paginado === "nada" ? undefined : paginador.paginado,
          paginador.price === "nada" ? undefined : paginador.price,
          paginador.amenities === "nada" ? undefined : paginador.amenities,
          paginador.type === "nada" ? undefined : paginador.type,
          paginador.guest === "nada" ? undefined : paginador.guest,
          paginador.score === "nada" ? undefined : paginador.score,
          paginador.cities === "nada" ? undefined : paginador.cities,
          paginador.fechas === "nada" ? undefined : paginador.fechas
        )
      );
    }, 100);
  };

  return (
    <div className="paginado-container">
      <Button
        variant="text"
        color="inherit"
        onClick={(e) => {
          onPrev(e);
        }}
      >
        {" "}
        Prev{" "}
      </Button>
      <div className={classes.root}>
        <Pagination
          count={cards.pageCount}
          page={cards.page - 1}
          onChange={handleChange}
        />
      </div>
      <Button
        variant="text"
        color="inherit"
        onClick={(e) => {
          onNext(e);
        }}
      >
        {" "}
        Next{" "}
      </Button>
    </div>
  );
}

export default Paginado;
