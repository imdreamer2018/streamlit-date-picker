import streamlit as st
from datetime import datetime, timedelta

from streamlit_date_picker import date_range_picker, date_picker, PickerType

st.set_page_config(page_title="streamlit date picker",
                   layout="wide",
                   initial_sidebar_state="expanded",
                   menu_items={
                        'Get Help': 'https://github.com/imdreamer2018/streamlit-date-picker',
                        'Report a bug': "https://github.com/imdreamer2018/streamlit-date-picker/issues/new",
                        'About': "# This is a streamlit date picker demo!"
                    })
with st.sidebar:
    st.markdown("""
        ## Introduction
        ``streamlit-date-picker` is a date picker designed for use with [Streamlit](https://streamlit.io/). It allows users to easily select a range of dates and times.
        ## Github
        - [Streamlit date picker](https://github.com/imdreamer2018/streamlit-date-picker)
        
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
    """)
st.title('Streamlit Date Picker')

column1, column2 = st.columns([1, 2])

with column1:
    st.subheader('Date Picker')
    st.markdown("#### 1.Time Picker")
    default_value = datetime.now()
    select_date = date_picker(picker_type=PickerType.time, value=default_value, key='time_picker')
    if select_date:
        st.write(f"Time Picker: {select_date}")

    st.markdown("#### 2.Date Picker")
    default_value = datetime.now()
    select_date = date_picker(picker_type=PickerType.date, value=default_value, key='date_picker')
    if select_date:
        st.write(f"Date Picker: {select_date}")

    st.markdown("#### 3.Week Picker")
    default_value = datetime.now()
    select_date = date_picker(picker_type=PickerType.week, value=default_value, key='week_picker')
    if select_date:
        st.write(f"Week Picker: {select_date}")

    st.markdown("#### 4.Month Picker")
    default_value = datetime.now()
    select_date = date_picker(picker_type=PickerType.month, value=default_value, key='month_picker')
    if select_date:
        st.write(f"Month Picker: {select_date}")

    st.markdown("#### 5.Quarter Picker")
    default_value = datetime.now()
    select_date = date_picker(picker_type=PickerType.quarter, value=default_value, key='quarter_picker')
    if select_date:
        st.write(f"Quarter Picker: {select_date}")

    st.markdown("#### 6.Year Picker")
    default_value = datetime.now()
    select_date = date_picker(picker_type=PickerType.year, value=default_value, key='year_picker')

    if select_date:
        st.write(f"Year Picker: {select_date}")

with column2:
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

    st.markdown("#### 2.Date Range Picker not show refresh button")
    default_start, default_end = datetime.now() - timedelta(days=1), datetime.now()
    refresh_value = timedelta(days=1)
    date_range_string = date_range_picker(picker_type=PickerType.date,
                                          start=default_start, end=default_end,
                                          key='date_range_picker',
                                          refresh_button=None)
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

    st.markdown("#### 5.Quarter Range Picker")
    default_start, default_end = datetime.now() - timedelta(days=90), datetime.now()
    refresh_value = timedelta(days=90)
    date_range_string = date_range_picker(picker_type=PickerType.quarter,
                                          start=default_start, end=default_end,
                                          key='quarter_range_picker',
                                          refresh_button={'is_show': True, 'button_name': 'Refresh Last 3 Months',
                                                          'refresh_value': refresh_value})
    if date_range_string:
        start, end = date_range_string
        st.write(f"Quarter Range Picker [{start}, {end}]")

    st.markdown("#### 6.Year Range Picker")
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