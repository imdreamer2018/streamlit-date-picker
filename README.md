# Streamlit DatePicker

[![PyPI](https://img.shields.io/pypi/v/streamlit-datetime-range-picker.svg)](https://pypi.org/project/streamlit-datetime-range-picker/)
[![GitHub](https://img.shields.io/github/license/imdreamer2018/streamlit-datetime-range-picker)](https://github.com/imdreamer2018/streamlit-datetime-range-picker/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/imdreamer2018/streamlit-datetime-range-picker)](https://github.com/imdreamer2018/streamlit-datetime-range-picker/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/imdreamer2018/streamlit-datetime-range-picker)](https://github.com/imdreamer2018/streamlit-datetime-range-picker/pulls)

## Project Introduction

`streamlit-date-picker` is a date picker designed for use with [Streamlit](https://streamlit.io/). It allows users to easily select a range of dates and times.
![Streamlit Date Picker](https://github.com/imdreamer2018/streamlit-date-picker/blob/master/images/date_picker.png)

## Installation

Install the package using the following command:

```bash
pip install streamlit-date-picker
```
## Usage

```python
import streamlit as st

from streamlit_date_picker import date_range_picker, PickerType, Unit, date_picker

st.title('Streamlit Date Picker')

# Use date_range_picker to create a datetime range picker
st.subheader('Date Range Picker')
date_range_string = date_range_picker(picker_type=PickerType.time.string_value,
                                      start=-30, end=0, unit=Unit.minutes.string_value,
                                      key='range_picker',
                                      refresh_button={'is_show': True, 'button_name': 'Refresh last 30min',
                                                      'refresh_date': -30,
                                                      'unit': Unit.minutes.string_value})
if date_range_string is not None:
    start_datetime = date_range_string[0]
    end_datetime = date_range_string[1]
    st.write(f"Date Range Picker [{start_datetime}, {end_datetime}]")

st.subheader('Date Picker')
# Use date_picker to create a date picker
date_string = date_picker(picker_type=PickerType.time.string_value, value=0, unit=Unit.days.string_value,
                          key='date_picker')

if date_string is not None:
    st.write('Date Picker: ', date_string)
```
## Parameter
### Range Picker
- `picker_type`: Default Date, type: str, options: time, date, week, month, quarter, year.
- `start`: Default start time, type: int, default value: -30.
- `end`: Default end time, type: int, default value: 0.
- `unit`: Default time unit, type: str, options: milliseconds, seconds, minutes, hours, days, weeks, months, years.
- `key`: Picker key, default value: None.
- `refresh_button`: Refresh button configuration, type: {'is_show': bool, 'button_name': str}, default values: False and 'Refresh last 30min'. When the button is clicked, it refreshes the selected time range.
- The return value of datetime_range_picker is of type str.
### Date Picker
- `picker_type`: Default Date, type: str, options: time, date, week, month, quarter, year.
- `value`: Default value, type: int, default value: 0.
- `unit`: Default time unit, type: str, options: milliseconds, seconds, minutes, hours, days, weeks, months, years.
- `key`: Picker key, default value: None.

## License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/imdreamer2018/streamlit-datetime-range-picker/blob/master/LICENSE) file for more details.



