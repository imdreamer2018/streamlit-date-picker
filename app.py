import streamlit as st
from streamlit_datetime_range_picker import date_range_picker

st.title('Streamlit Date Picker')

# Use date_range_picker to create a datetime range picker
st.subheader('Date Range Picker')
datetime_string = date_range_picker(picker_type=PickerType.time.string_value,
                                    start=-30, end=0, unit=Unit.minutes.string_value,
                                    key='range_picker',
                                    refresh_button={'is_show': True, 'button_name': 'Refresh last 30min',
                                                    'refresh_date': -30,
                                                    'unit': Unit.minutes.string_value})
if datetime_string is not None:
    start_datetime = datetime_string[0]
    end_datetime = datetime_string[1]
    st.write(f"Date Range Picker [{start_datetime}, {end_datetime}]")


st.subheader('Date Picker')
# Use date_picker to create a date picker
date_string = date_picker(picker_type=PickerType.time.string_value, value=0, unit=Unit.days.string_value, key='date_picker')

if date_string is not None:
    st.write('Date Picker: ', date_string)
