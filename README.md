# Streamlit DateTime Range Picker

[![PyPI](https://img.shields.io/pypi/v/streamlit-datetime-range-picker.svg)](https://pypi.org/project/streamlit-datetime-range-picker/)
[![GitHub](https://img.shields.io/github/license/imdreamer2018/streamlit-datetime-range-picker)](https://github.com/imdreamer2018/streamlit-datetime-range-picker/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/imdreamer2018/streamlit-datetime-range-picker)](https://github.com/imdreamer2018/streamlit-datetime-range-picker/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/imdreamer2018/streamlit-datetime-range-picker)](https://github.com/imdreamer2018/streamlit-datetime-range-picker/pulls)

## Project Introduction

`streamlit-datetime-range-picker` is a datetime range picker designed for use with [Streamlit](https://streamlit.io/). It allows users to easily select a range of dates and times.

## Installation

Install the package using the following command:

```bash
pip install streamlit-datetime-range-picker
```
## Usage
```python
import streamlit as st
from streamlit_datetime_range_picker import datetime_range_picker

# Use datetime_range_picker to create a datetime range picker
datetime_string = datetime_range_picker(start=-30, end=0, unit='minutes', key='range_picker', 
                                        picker_button={'is_show': True, 'button_name': 'Refresh last 30min'})
if datetime_string is not None:
    start_datetime = datetime_string[0]
    end_datetime = datetime_string[1]
```
## Parameter
- `start`: Default start time, type: int, default value: -30.
- `end`: Default end time, type: int, default value: 0.
- `unit`: Default time unit, type: str, options: milliseconds, seconds, minutes, hours, days, weeks, months, years.
- `key`: Picker key, default value: None.
- `picker_button`: Refresh button configuration, type: {'is_show': bool, 'button_name': str}, default values: False and 'Refresh last 30min'. When the button is clicked, it refreshes the selected time range.
- The return value of datetime_range_picker is of type str.

## License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/imdreamer2018/streamlit-datetime-range-picker/blob/master/LICENSE) file for more details.



