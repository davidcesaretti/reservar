/* const auth = useAuth()
const dispatch = useDispatch()
const history = useHistory()
const listOfUsers = useSelector((state:any) => state.listOfUsers)
const [currentPage, setCurrentPage] = useState(0)
useEffect(() => {
    dispatch(getUsersList())
}, [dispatch])

console.log(listOfUsers)
const filteredUsers = listOfUsers.slice(currentPage, currentPage + 8)
    

    const nextPage = () => {
        if (listOfUsers.length < currentPage + 8) {
            setCurrentPage(currentPage)
        } else {
            setCurrentPage(currentPage + 8)
        }
    }

    const prevPage = () => {
        if (currentPage < 7) {
            setCurrentPage(0)
        } else {
            setCurrentPage(currentPage - 8)
        }
    }
 */
/*     import React from 'react';
    import clsx from 'clsx';
    import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
    import Table from '@material-ui/core/Table';
    import TableBody from '@material-ui/core/TableBody';
    import TableCell from '@material-ui/core/TableCell';
    import TableContainer from '@material-ui/core/TableContainer';
    import TableHead from '@material-ui/core/TableHead';
    import TablePagination from '@material-ui/core/TablePagination';
    import TableRow from '@material-ui/core/TableRow';
    import TableSortLabel from '@material-ui/core/TableSortLabel';
    import Toolbar from '@material-ui/core/Toolbar';
    import Typography from '@material-ui/core/Typography';
    import Paper from '@material-ui/core/Paper';
    import Checkbox from '@material-ui/core/Checkbox';
    import IconButton from '@material-ui/core/IconButton';
    import Tooltip from '@material-ui/core/Tooltip';
    import FormControlLabel from '@material-ui/core/FormControlLabel';
    import Switch from '@material-ui/core/Switch';
    import DeleteIcon from '@material-ui/icons/Delete';
    import FilterListIcon from '@material-ui/icons/FilterList';
    import { useEffect } from 'react';
    import axios from 'axios';
    import { useState } from 'react';
    
    interface Data {
      name: string;
      phone: string;
      email: string;
      lodgings_registered: number;
      status_account: string;
      statusSwitch: any;
    }
    
    
    let rows = []
          axios.get("http://localhost:3001/admin/getusers").then(respuesta => {
            rows = (respuesta.data)
            console.log(rows)
          })
    
    // const rows = [
    // {name: 'walter', phone: '3731323423', email: 'sh@jdjd.com', lodgings: 5, status: 'active'},
    // {name: 'david', phone: '37345423', email: 'dhsh@jdjd.com', lodgings: 7, status: 'active'},
    // {name: 'jesus', phone: '787823423', email: 'dfgsh@jdjd.com', lodgings: 3, status: 'suspended'},
    // {name: 'pedro', phone: '99999323423', email: 'uiouihsh@jdjd.com', lodgings: 4, status: 'suspended'},
    // {name: 'vero', phone: '3733333323', email: 'vbcv@jdjd.com', lodgings: 9, status: 'active'},
    // {name: 'ulises', phone: '3000000423', email: 'vvvvvsh@jdjd.com', lodgings: 5, status: 'active'},
    // {name: 'nelson', phone: '2731323423', email: 'yuiyuuuu@jdjd.com', lodgings: 5, status: 'suspended'},
    // {name: 'dario', phone: '89989823423', email: 'vvvvvv@jdjd.com', lodgings: 5, status: 'active'},
    // ];
    
    
    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }
    
    type Order = 'asc' | 'desc';
    
    function getComparator<Key extends keyof any>(
      order: Order,
      orderBy: Key,
    ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
      return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    }
    
    function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
      const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    }
    
    interface HeadCell {
      disablePadding: boolean;
      id: keyof Data;
      label: string;
      numeric: boolean;
    }
    
    const headCells: HeadCell[] = [
      { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
      { id: 'phone', numeric: false, disablePadding: false, label: 'Phone' },
      { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
      { id: 'lodgings_registered', numeric: true, disablePadding: false, label: '# of lodgings registered' },
      { id: 'status_account', numeric: false, disablePadding: false, label: 'Account status' },
      { id: 'statusSwitch', numeric: false, disablePadding: false, label: 'status switch' },
    
    ];
    
    interface EnhancedTableProps {
      classes: ReturnType<typeof useStyles>;
      numSelected: number;
      onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
      onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
      order: Order;
      orderBy: string;
      rowCount: number;
    }
    
    function EnhancedTableHead(props: EnhancedTableProps) {
      const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
      const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };
    
      return (
        <TableHead className={classes.titulos}>
          <TableRow >
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{ 'aria-label': 'select all desserts' }}
              />
            </TableCell>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      );
    }
    
    const useToolbarStyles = makeStyles((theme: Theme) =>
      createStyles({
        root: {
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(1),
        },
        highlight:
          theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
              }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
              },
        title: {
          flex: '1 1 100%',
        },
      }),
    );
    
    interface EnhancedTableToolbarProps {
      numSelected: number;
    }
    
    const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
      const classes = useToolbarStyles();
      const { numSelected } = props;
    
      return (
        <Toolbar
          className={clsx(classes.root, {
            [classes.highlight]: numSelected > 0,
          })}
        >
          {numSelected > 0 ? (
            <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
              Registered Users
            </Typography>
          )}
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      );
    };
    
    const useStyles = makeStyles((theme: Theme) =>
      createStyles({
        root: {
          width: '95%',
          padding: '30px 30px'
        },
        paper: {
          width: '100%',
          marginBottom: theme.spacing(2),
        },
        table: {
          minWidth: 750,
        },
        visuallyHidden: {
          border: 0,
          clip: 'rect(0 0 0 0)',
          height: 1,
          margin: -1,
          overflow: 'hidden',
          padding: 0,
          position: 'absolute',
          top: 20,
          width: 1,
        },
        titulos: {
          backgroundColor: theme.palette.secondary.main
        }
      }),
    );
    
    export default function EnhancedTable({setSection}) {
      const classes = useStyles();
      const [order, setOrder] = React.useState<Order>('asc');
      const [orderBy, setOrderBy] = React.useState<keyof Data>('lodgings_registered');
      const [selected, setSelected] = React.useState<string[]>([]);
      const [page, setPage] = React.useState(0);
      const [dense, setDense] = React.useState(false);
      const [rowsPerPage, setRowsPerPage] = React.useState(5);
      const [toggle, setToggle] = useState({})
    
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {   // Funcion para switch
        //setToggle(!toggle)
        setToggle({ ...toggle, [event.target.name]: event.target.checked });
      };
    
      const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
      };
    
      const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
          const newSelecteds = rows.map((n) => n.name);
          setSelected(newSelecteds);
          return;
        }
        setSelected([]);
      };
    
      const handleClick = (event: React.MouseEvent<unknown>, name: any) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: string[] = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
    
        setSelected(newSelected);
      };
    
      const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    
      const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
      };
    
      const isSelected = (name: any) => selected.indexOf(name) !== -1;
    
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
      console.log(rows)

      return (
        <div className={classes.root}>
            <button>Back</button>
          <Paper className={classes.paper}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;
    
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.name}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                              onClick={(event) => handleClick(event, row.name)}
                            />
                          </TableCell>
                          <TableCell component="th" id={labelId} scope="row" padding="none">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.phone}</TableCell>
                          <TableCell align="right">{row.email}</TableCell>
                          <TableCell align="right">{row.lodgings_registered}</TableCell>
                          <TableCell align="right">{toggle[row.name] ?
                                row.status_account : 'Suspended'}</TableCell>
                          <Switch
                            checked={toggle[row.name]}  //row.status_account === 'Active'
                            onChange={handleChange}
                            name={row.name}
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                            
                          />
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
        </div>
      );
    } */
    import React, {useState ,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import { useAuth } from "../../firebase/index";
import {getUsersList} from '../../actions/index'
import style from './RegisteredUsers.module.css'

const RegisteredUsers = ({setSection}) => {

const auth = useAuth()
const dispatch = useDispatch()
const history = useHistory()
const listOfUsers = useSelector((state:any) => state.listOfUsers)
const [currentPage, setCurrentPage] = useState(0)
useEffect(() => {
    dispatch(getUsersList())
}, [dispatch])

console.log(listOfUsers)
const filteredUsers = listOfUsers.slice(currentPage, currentPage + 8)
    

    const nextPage = () => {
        if (listOfUsers.length < currentPage + 8) {
            setCurrentPage(currentPage)
        } else {
            setCurrentPage(currentPage + 8)
        }
    }

    const prevPage = () => {
        if (currentPage < 7) {
            setCurrentPage(0)
        } else {
            setCurrentPage(currentPage - 8)
        }
    }

    return (
        <div className={style.ctn}>
            <button onClick={() => {setSection('')}}> Back</button>
            <div className={style.userCtn}>
            {
                filteredUsers?.map((e) => {
                    return (
                            <Link to={`/userAdmin/${e._id}`}  className={style.userInfo} key={e._id}>
                                <p className={style.data}><b>Name:</b> {e.name} </p>
                                <p className={style.data}><b>Email:</b> {e.email} </p>
                                <p className={style.data}><b>Phone:</b> {e._id} </p>
                            </Link>
                    )
                })
            }
            </div>
            { listOfUsers.length > 7 ? <div className={style.buttonPag}>
                {currentPage !== 0 ? <button
                    className={style.prevButton}
                    onClick={ prevPage }
                >
                    {'<'}
                </button> : <div></div>}
                {currentPage < listOfUsers.length-9 ? <button
                    className={style.nextButton}
                    onClick={ nextPage }
                >
                    {'>'}
                </button> : <div></div> }
            </div> : <div></div> }
        </div>
    )
}

export default RegisteredUsers