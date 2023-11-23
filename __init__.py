import streamlit.components.v1 as components
import os

from utils.env_utils import get_en0_ip_address


def date_time_range_picker(start=-30, end=0, unit='minutes', key=None):
    _RELEASE = True
    if not _RELEASE:
        _date_time_range_picker_component = components.declare_component(
            "date_time_range_picker",
            url="http://{}:8500".format(os.getenv('EN0_IP_ADDRESS', default=get_en0_ip_address())),
        )
    else:
        parent_dir = os.path.dirname(os.path.abspath(__file__))
        build_dir = os.path.join(parent_dir, "frontend/build")
        print(build_dir)
        _date_time_range_picker_component = components.declare_component("date_time_range_picker", path=build_dir)
        print(_date_time_range_picker_component)

    return _date_time_range_picker_component(start=start, end=end, unit=unit, key=key)