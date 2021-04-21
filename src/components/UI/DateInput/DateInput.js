import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} >
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          id="date-picker-inline"
          label={props.label}
          value={props.value}
          onChange={props.onChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          {...props}
        />        
    </MuiPickersUtilsProvider>
  );
}
