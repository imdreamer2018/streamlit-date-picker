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

    @property
    def string_value(self):
        return self.value[0]


class Unit(Enum):
    milliseconds = 'milliseconds',
    seconds = 'seconds',
    minutes = 'minutes',
    hours = 'hours',
    days = 'days',
    weeks = 'weeks',
    months = 'months',
    years = 'years'

    @property
    def string_value(self):
        return self.value[0]


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


def date_range_picker(picker_type='time', start=-30, end=0, unit='minutes', key=None, refresh_button=None):
    return component_func(id='date_range_picker', kw=locals(), key=key)


def date_picker(picker_type='date', value=0, unit='days', key=None):
    return component_func(id='date_picker', kw=locals(), key=key)
