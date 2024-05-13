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
                      key=None, refresh_button=None):
    if refresh_button is not None:
        refresh_button['refresh_value'] = convert_timedelta_to_total_seconds(refresh_button['refresh_value'])
    return component_func(id='date_range_picker', key=key, picker_type=picker_type.name,
                          start=str(start.timestamp()), end=str(end.timestamp()),
                          refresh_button=refresh_button)


def date_picker(picker_type=PickerType.date, value: datetime = datetime.now(), key=None):
    return component_func(id='date_picker', key=key, picker_type=picker_type.name, value=str(value.timestamp()))
