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

  const rowsPerPage = 5;
  const page = 0;
  
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
                  <TableCell align={column.align}>{column.name}</TableCell>
                ))
              }              
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => {
                return (
                  <TableRow key={row.divida}>
                    {
                      Object.keys(row).map((column) => {
                        return (
                          <TableCell align={row[column].position}>{row[column].valor}</TableCell>
                        )
                      })
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={props.handleChangePage}
          onChangeRowsPerPage={props.handleChangeRowsPerPage}
        />      
    </Paper>
  );
}

export default CustomTable;
