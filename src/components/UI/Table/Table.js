import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Toolbar, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, TablePagination} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const CustomTable = (props) => {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value)
  };
  
  return (
    <Paper>
      <Toolbar>
        <Typography variant="h6" id="tableTitle" component="div" >
        {props.title}
        </Typography>
      </Toolbar>
      <TableContainer>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              {props.header.map((column) => (
                  <TableCell align={column.align} key={column.name}>{column.name}</TableCell>
                ))
              }              
            </TableRow>
          </TableHead>
          <TableBody>
            {
              Object.keys(props.rows).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map( (row) => {                  
                  return (
                    <TableRow key={props.rows[row].id}>
                        {
                          props.header.map((column) => (
                            <TableCell key={column.key} align={column.align}>{column.format ? column.format(props.rows[row][column.key]) :  props.rows[row][column.key]}</TableCell>    
                          ))                
                        }
                    </TableRow>
                  )
              }                
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={Object.keys(props.rows).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />      
    </Paper>
  );
}

export default CustomTable;
