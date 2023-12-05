import streamlit.components.v1 as components
import os


def datetime_range_picker(picker_type='date', start=-30, end=0, unit='minutes', key=None, picker_button=None):
    _RELEASE = False
    if not _RELEASE:
        _date_time_range_picker_component = components.declare_component(
            "datetime_range_picker",
            url="http://localhost:3000"
        )
    else:
        parent_dir = os.path.dirname(os.path.abspath(__file__))
        build_dir = os.path.join(parent_dir, "frontend/build")
        _date_time_range_picker_component = components.declare_component("datetime_range_picker", path=build_dir)

    return _date_time_range_picker_component(picker_type=picker_type, start=start, end=end, unit=unit, key=key, picker_button=picker_button)
