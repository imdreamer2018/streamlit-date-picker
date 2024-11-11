from datetime import datetime, timedelta
from enum import Enum

import streamlit.components.v1 as components
import os


class PickerType(Enum):
    time = 'time',
    date = 'date',
    week = 'week',
    month = 'month',
    quarter = 'quarter',
    year = 'year'


_RELEASE = True

if not _RELEASE:
    component_func = components.declare_component(
        "date_picker",
        url="http://localhost:3000",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    component_func = components.declare_component("dater_picker", path=build_dir)


def convert_timedelta_to_total_seconds(delta: timedelta):
    return delta.total_seconds()


def date_range_picker(picker_type=PickerType.time, start: datetime = datetime.now(), end: datetime = datetime.now(),
                      available_dates=None, key=None, refresh_buttons=[]):
    if refresh_buttons is not None:
        for refresh_button in refresh_buttons:
            refresh_button['refresh_value'] = convert_timedelta_to_total_seconds(refresh_button['refresh_value'])

    if available_dates is not None:
        available_dates = [available_date.timestamp() for available_date in available_dates]
    return component_func(id='date_range_picker', key=key, picker_type=picker_type.name,
                          start=str(start.timestamp()), end=str(end.timestamp()),
                          available_dates=available_dates,
                          refresh_buttons=refresh_buttons)


def date_picker(picker_type=PickerType.date, value: datetime = datetime.now(), available_dates=None, key=None):
    if available_dates is not None:
        available_dates = [available_date.timestamp() for available_date in available_dates]
    return component_func(id='date_picker', key=key, picker_type=picker_type.name, value=str(value.timestamp()), 
                          available_dates=available_dates)
