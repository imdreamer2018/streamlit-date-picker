import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, {ComponentProps, ReactNode} from "react"
import { DatePicker, DatePickerProps, Button } from 'antd';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import 'dayjs/locale/zh-cn';
import 'dayjs/plugin/utc';
import 'dayjs/plugin/timezone';
import 'dayjs/plugin/localeData';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Shanghai');

const { RangePicker } = DatePicker;

interface State {
    height: number,
    start_datetime: dayjs.Dayjs,
    end_datetime: dayjs.Dayjs
}

const format_string = 'YYYY-MM-DD HH:mm:ss'

class DateTimeRangePicker extends StreamlitComponentBase<State> {


    constructor(props: ComponentProps<any>, context: any) {
        super(props, context);
        this.state = {
            height: 50,
            start_datetime: dayjs().add(this.props.args["start"], this.props.args["unit"]),
            end_datetime: dayjs().add(this.props.args["end"], this.props.args["unit"])
        }
        Streamlit.setFrameHeight(this.state.height)
        this.setComponentValue()
    }

    componentDidMount() {
        super.componentDidMount();

    }
    componentDidUpdate() {
        super.componentDidUpdate()
        Streamlit.setFrameHeight(this.state.height)
    }

    private parse_string_to_datetime = (datetime_string: string): dayjs.Dayjs => {
        return dayjs(datetime_string, format_string)
    }

    private setComponentValue = () => {
        Streamlit.setComponentValue([
            this.state.start_datetime.format(format_string),
            this.state.end_datetime.format(format_string)])
    }

    public render = (): ReactNode => {
        return (
            <div>
              <RangePicker showTime
                           format={format_string}
                           onChange={this._onChange}
                           placement={"bottomLeft"}
                           onOpenChange={this._onOpenChange}
                           value={[this.state.start_datetime, this.state.end_datetime]}
              />
              <Button onClick={this._button_on_click} style={{ marginLeft: '20px' }}>Refresh last 30min</Button>
            </div>
        )
    }

    private _button_on_click = () => {
        this.setState({
            height: 50,
            start_datetime: dayjs().add(-30, 'minutes'),
            end_datetime: dayjs()
        });
        this.setComponentValue()
    }

    private _onChange = (date: any, dateString: any) => {
        this.setState({
            start_datetime: date[0],
            end_datetime: date[1]
        });
        Streamlit.setComponentValue(dateString)
    }

    private _onOpenChange: DatePickerProps['onOpenChange'] = (isOpen) => {
        this.setState({
            height: isOpen ? 450: 50
        })
    }
}

export default withStreamlitConnection(DateTimeRangePicker)