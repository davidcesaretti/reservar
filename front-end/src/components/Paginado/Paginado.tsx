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

  React.useEffect(() => {
    dispatch(
      //fetchCardsHotels(page, price, amenities, type, accommodates, score);
      fetchCardsHotels(
        page,
        paginador.price === "nada" ? undefined : paginador.price,
        paginador.amenities === "nada" ? undefined : paginador.amenities,
        paginador.type === "nada" ? undefined : paginador.type,
        paginador.guest === "nada" ? undefined : paginador.guest,
        paginador.score === "nada" ? undefined : paginador.score,
        paginador.cities === "nada" ? undefined : paginador.cities,
        paginador.fechas === "nada" ? undefined : paginador.fechas
      )
    );
  }, [page]);

  const onPrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const onNext = () => {
    if (page < cards.pageCount) {
      setPage(page + 1);
    }
  };

  return (
    <div className="paginado-container">
      <Button
        variant="text"
        color="inherit"
        onClick={() => {
          onPrev();
        }}
      >
        {" "}
        Prev{" "}
      </Button>
      <div className={classes.root}>
        <Pagination
          count={cards.pageCount}
          page={page ? page : 1}
          onChange={handleChange}
        />
      </div>
      <Button
        variant="text"
        color="inherit"
        onClick={() => {
          onNext();
        }}
      >
        {" "}
        Next{" "}
      </Button>
    </div>
  );
}

export default Paginado;
