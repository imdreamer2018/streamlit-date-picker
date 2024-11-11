# Streamlit DatePicker

[![PyPI](https://img.shields.io/pypi/v/streamlit-datetime-range-picker.svg)](https://pypi.org/project/streamlit-datetime-range-picker/)
[![GitHub](https://img.shields.io/github/license/imdreamer2018/streamlit-datetime-range-picker)](https://github.com/imdreamer2018/streamlit-datetime-range-picker/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/imdreamer2018/streamlit-datetime-range-picker)](https://github.com/imdreamer2018/streamlit-datetime-range-picker/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/imdreamer2018/streamlit-datetime-range-picker)](https://github.com/imdreamer2018/streamlit-datetime-range-picker/pulls)

## Project Introduction

`streamlit-date-picker` is a date picker designed for use with [Streamlit](https://streamlit.io/). It allows users to easily select a range of dates and times.

Try out a demo here: [![Streamlit App](https://static.streamlit.io/badges/streamlit_badge_black_white.svg)](https://date-picker.streamlit.app/)

![Streamlit Date Picker](https://github.com/imdreamer2018/streamlit-date-picker/blob/master/images/streamlit_date_picker.png)

## Installation

Install the package using the following command:

```bash
pip install streamlit-date-picker
```
## Usage

```python
import streamlit as st
from datetime import datetime, timedelta

from streamlit_date_picker import date_range_picker, date_picker, PickerType

st.set_page_config(
    page_title="Streamlit Date Picker",
    page_icon="📅",
    layout="wide",
)

st.title('Streamlit Date Picker')
st.subheader('Date Picker')
st.markdown("#### 1.Date Picker")
default_value = datetime.now()
select_date = date_picker(picker_type=PickerType.date, value=default_value, key='date_picker')

if select_date:
    st.write(f"Date Picker: {select_date}")

st.markdown("#### 2.Available Date Picker")
default_value = datetime.now()
available_datas = [
    datetime.now() - timedelta(days=4),
    datetime.now() - timedelta(days=3),
    datetime.now() - timedelta(days=1),
    datetime.now(),
    datetime.now() + timedelta(days=1),
    datetime.now() + timedelta(days=3),
    datetime.now() + timedelta(days=4),
]
select_date = date_picker(picker_type=PickerType.date, value=default_value, key='available_date_picker', available_dates=available_datas)

if select_date:
    st.write(f"Date Picker: {select_date}")

st.subheader('Date Range Picker')
st.markdown("#### 1.Time Range Picker")
default_start, default_end = datetime.now() - timedelta(minutes=30), datetime.now()
refresh_value = timedelta(minutes=30)
refresh_buttons = [{
                    'button_name': 'Refresh Last 30 Minutes',
                    'refresh_value': refresh_value
                  }]
    
date_range_string = date_range_picker(picker_type=PickerType.time,
                                      start=default_start, end=default_end,
                                      key='time_range_picker',
                                      refresh_buttons=refresh_buttons)
if date_range_string:
    start, end = date_range_string
    st.write(f"Time Range Picker [{start}, {end}]")

st.markdown("#### 2.Date Range Picker")
default_start, default_end = datetime.now() - timedelta(days=1), datetime.now()
refresh_value = timedelta(days=1)
refresh_buttons = [{
                    'button_name': 'Refresh Last 1 Days',
                    'refresh_value': refresh_value
                  }]
    
date_range_string = date_range_picker(picker_type=PickerType.date,
                                      start=default_start, end=default_end,
                                      key='date_range_picker',
                                      refresh_buttons=refresh_buttons)
if date_range_string:
    start, end = date_range_string
    st.write(f"Date Range Picker [{start}, {end}]")

st.markdown("#### 3.Week Range Picker")
default_start, default_end = datetime.now() - timedelta(days=7), datetime.now()
refresh_value = timedelta(days=7)
refresh_buttons = [{
                    'button_name': 'Refresh Last 1 Week',
                    'refresh_value': refresh_value
                  }]
date_range_string = date_range_picker(picker_type=PickerType.week,
                                      start=default_start, end=default_end,
                                      key='week_range_picker',
                                      refresh_buttons=refresh_buttons)
if date_range_string:
    start, end = date_range_string
    st.write(f"Week Range Picker [{start}, {end}]")

st.markdown("#### 4.Month Range Picker")
default_start, default_end = datetime.now() - timedelta(days=30), datetime.now()
refresh_value = timedelta(days=30)
refresh_buttons = [{
                    'button_name': 'Refresh Last 1 Month',
                    'refresh_value': refresh_value
                  }]
date_range_string = date_range_picker(picker_type=PickerType.month,
                                      start=default_start, end=default_end,
                                      key='month_range_picker',
                                      refresh_buttons=refresh_buttons)
if date_range_string:
    start, end = date_range_string
    st.write(f"Month Range Picker [{start}, {end}]")

st.markdown("#### 5.Year Range Picker")
default_start, default_end = datetime.now() - timedelta(days=365), datetime.now()
refresh_value = timedelta(days=365)
refresh_buttons = [{
                    'button_name': 'Refresh Last 1 Year',
                    'refresh_value': refresh_value
                  }]
date_range_string = date_range_picker(picker_type=PickerType.year,
                                      start=default_start, end=default_end,
                                      key='year_range_picker',
                                      refresh_buttons=refresh_buttons)
if date_range_string:
    start, end = date_range_string
    st.write(f"Year Range Picker [{start}, {end}]")

st.markdown("#### 6.Available Date Range Picker")
default_start, default_end = datetime.now() - timedelta(days=1), datetime.now()
available_datas = [
    datetime.now() - timedelta(days=4),
    datetime.now() - timedelta(days=3),
    datetime.now() - timedelta(days=1),
    datetime.now(),
    datetime.now() + timedelta(days=1),
    datetime.now() + timedelta(days=3),
    datetime.now() + timedelta(days=4),
]
date_range_string = date_range_picker(picker_type=PickerType.date,
                                      start=default_start, end=default_end,
                                      available_dates=available_datas,
                                      key='available_date_range_picker',)
if date_range_string:
    start, end = date_range_string
    st.write(f"Date Range Picker [{start}, {end}]")

st.markdown("#### 7.Mutil Refresh Button Date Time Range Picker")
default_start, default_end = datetime.now() - timedelta(minutes=30), datetime.now()
refresh_buttons = [
            {
                'button_name': 'Refresh Last 30 Minutes',
                'refresh_value': timedelta(minutes=30)
            },
            {
                'button_name': 'Refresh Last 60 Minutes',
                'refresh_value': timedelta(minutes=60)
            }
        ]
date_range_string = date_range_picker(picker_type=PickerType.time,
                                      start=default_start, end=default_end,
                                      key='mutil_time_range_picker',
                                      refresh_buttons=refresh_buttons)
if date_range_string:
    start, end = date_range_string
    st.write(f"Time Range Picker [{start}, {end}]")
```
## Parameter
### Range Picker
- `picker_type`: Default picker type, type: str, options: time, date, week, month, quarter, year.
- `key`: Picker key, default value: None.
- `start`: Default start datetime, type: datetime, default value: datetime.now().
- `end`: Default end datetime, type: int, default value: datetime.now().
- `refresh_button`: Refresh button configuration, type: {'is_show': bool, 'button_name': str, 'refresh_value': datetime}, default values: None. When the button is clicked, it refreshes the selected time range.
- The return value of datetime_range_picker is of type str.
### Date Picker
- `picker_type`: Default picker type, type: str, options: time, date, week, month, quarter, year.
- `value`: Default value, type: datetime, default value: datetime.now().
- `key`: Picker key, default value: None.

## License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/imdreamer2018/streamlit-datetime-range-picker/blob/master/LICENSE) file for more details.



