import streamlit as st

from streamlit_datetime_range_picker import datetime_range_picker

st.title('skynet website')

picker = datetime_range_picker(start=-1470, end=-1440, unit='minutes', key='slow_sql_report_compare')