import streamlit as st
from datetime import datetime, timedelta

from streamlit_date_picker import date_range_picker, date_picker, PickerType

st.title('Streamlit Date Picker')
st.subheader('Date Picker')
default_value = datetime.now()
select_date = date_picker(picker_type=PickerType.time, value=default_value, key='date_picker')

if select_date:
    st.write(f"Date Picker: {select_date}")

st.subheader('Date Range Picker')
st.markdown("#### 1.Time Range Picker")
default_start, default_end = datetime.now() - timedelta(minutes=30), datetime.now()
refresh_value = timedelta(minutes=30)
date_range_string = date_range_picker(picker_type=PickerType.time,
                                      start=default_start, end=default_end,
                                      key='time_range_picker',
                                      refresh_button={'is_show': True, 'button_name': 'Refresh Last 30 Minutes',
                                                      'refresh_value': refresh_value})
if date_range_string:
    start, end = date_range_string
    st.write(f"Time Range Picker [{start}, {end}]")

st.markdown("#### 2.Date Range Picker")
default_start, default_end = datetime.now() - timedelta(days=1), datetime.now()
refresh_value = timedelta(days=1)
date_range_string = date_range_picker(picker_type=PickerType.date,
                                      start=default_start, end=default_end,
                                      key='date_range_picker',
                                      refresh_button={'is_show': True, 'button_name': 'Refresh Last 1 Days',
                                                      'refresh_value': refresh_value})
if date_range_string:
    start, end = date_range_string
    st.write(f"Date Range Picker [{start}, {end}]")

st.markdown("#### 3.Week Range Picker")
default_start, default_end = datetime.now() - timedelta(days=7), datetime.now()
refresh_value = timedelta(days=7)
date_range_string = date_range_picker(picker_type=PickerType.week,
                                      start=default_start, end=default_end,
                                      key='week_range_picker',
                                      refresh_button={'is_show': True, 'button_name': 'Refresh Last 1 Week',
                                                      'refresh_value': refresh_value})
if date_range_string:
    start, end = date_range_string
    st.write(f"Week Range Picker [{start}, {end}]")

st.markdown("#### 4.Month Range Picker")
default_start, default_end = datetime.now() - timedelta(days=30), datetime.now()
refresh_value = timedelta(days=30)
date_range_string = date_range_picker(picker_type=PickerType.month,
                                      start=default_start, end=default_end,
                                      key='month_range_picker',
                                      refresh_button={'is_show': True, 'button_name': 'Refresh Last 1 Month',
                                                      'refresh_value': refresh_value})
if date_range_string:
    start, end = date_range_string
    st.write(f"Month Range Picker [{start}, {end}]")

st.markdown("#### 5.Year Range Picker")
default_start, default_end = datetime.now() - timedelta(days=365), datetime.now()
refresh_value = timedelta(days=365)
date_range_string = date_range_picker(picker_type=PickerType.year,
                                      start=default_start, end=default_end,
                                      key='year_range_picker',
                                      refresh_button={'is_show': True, 'button_name': 'Refresh Last 1 Year',
                                                      'refresh_value': refresh_value})
if date_range_string:
    start, end = date_range_string
    st.write(f"Year Range Picker [{start}, {end}]")