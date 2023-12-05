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
import {FormatString, getFormatString, getPickerType, PickerType, Unit} from "./utils";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Shanghai');

const { RangePicker } = DatePicker;

interface State {
    height: number,
    picker_type: PickerType,
    format_string: FormatString
    start: dayjs.Dayjs,
    end: dayjs.Dayjs,
    fresh_button: {
        is_show: boolean,
        button_name: string,
        refresh_date: number,
        unit: Unit
    }
}
class DateRangePicker extends StreamlitComponentBase<State> {


    constructor(props: ComponentProps<any>, context: any) {
        super(props, context);
        const refreshButton = this.props.args["refresh_button"] || { is_show: false, button_name: "Refresh last 30min", refresh_date: 30, unit: "minutes"};
        this.state = {
            height: 50,
            picker_type: getPickerType(this.props.args["picker_type"]) || PickerType.date,
            format_string: getFormatString(this.props.args["picker_type"]) || FormatString.date,
            start: dayjs().add(this.props.args["start"], this.props.args["unit"]),
            end: dayjs().add(this.props.args["end"], this.props.args["unit"]),
            fresh_button: refreshButton
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

    private setComponentValue = () => {
        Streamlit.setComponentValue([
            this.state.start.format(this.state.format_string),
            this.state.end.format(this.state.format_string)])
    }

    public render = (): ReactNode => {
        return (
            <div>
                {this.state.picker_type === "time" &&
                    <RangePicker showTime
                           format={this.state.format_string}
                           onChange={this._onChange}
                           placement={"bottomLeft"}
                           onOpenChange={this._onOpenChange}
                           value={[this.state.start, this.state.end]}
                    />
                }
                {this.state.picker_type !== "time" &&
                    <RangePicker
                           picker={this.state.picker_type}
                           format={this.state.format_string}
                           onChange={this._onChange}
                           placement={"bottomLeft"}
                           onOpenChange={this._onOpenChange}
                           value={[this.state.start, this.state.end]}
              />}
                {this.state.fresh_button.is_show &&
                    <Button onClick={this._button_on_click}
                            style={{ marginLeft: '20px' }}>{this.state.fresh_button.button_name}
                    </Button>
                }
            </div>
        )
    }

    private _button_on_click = () => {
        this.setState({
            height: 50,
            start: dayjs().add(this.state.fresh_button.refresh_date, this.state.fresh_button.unit),
            end: dayjs()
        });
        this.setComponentValue()
    }

    private _onChange = (date: any, dateString: any) => {
        this.setState({
            start: date[0],
            end: date[1]
        });
        Streamlit.setComponentValue(dateString)
    }

    private _onOpenChange: DatePickerProps['onOpenChange'] = (isOpen) => {
        this.setState({
            height: isOpen ? 450: 50
        })
    }
}

export default withStreamlitConnection(DateRangePicker)