import {
  Streamlit,
  StreamlitComponentBase,
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
import {FormatString, getFormatString, getPickerType, PickerType} from "./utils";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Shanghai');

const { RangePicker } = DatePicker;

interface State {
    picker_type: PickerType,
    format_string: FormatString
    start: dayjs.Dayjs,
    end: dayjs.Dayjs,
    fresh_button: {
        is_show: boolean,
        button_name: string,
        refresh_value: number,
    },
    availableDates: dayjs.Dayjs[]
}
export class DateRangePicker extends StreamlitComponentBase<State> {

    constructor(props: ComponentProps<any>) {
        super(props);
        const refreshButton = this.props.args["refresh_button"]
            || { is_show: false, button_name: "Refresh button", refresh_value: 0};
        this.state = {
            picker_type: getPickerType(this.props.args["picker_type"]) || PickerType.date,
            format_string: getFormatString(this.props.args["picker_type"]) || FormatString.date,
            start: dayjs(this.props.args["start"] * 1000),
            end: dayjs(this.props.args["end"] * 1000),
            fresh_button: refreshButton,
            availableDates: this.props.args["available_dates"] ? 
                this.props.args["available_dates"].map((available_date: number) => dayjs(available_date * 1000)) : []
        }
        this.setComponentValue();
    }

    private setComponentValue = () => {
        Streamlit.setComponentValue([
            this.state.start.format(this.state.format_string),
            this.state.end.format(this.state.format_string)])
    }

    public render = (): ReactNode => {
        return (
            <div style={{ height: '50px' }}>
                {this.state.picker_type === "time" &&
                    <RangePicker showTime
                           format={this.state.format_string}
                           onChange={this._onChange}
                           placement={"bottomLeft"}
                           onOpenChange={this._onOpenChange}
                           value={[this.state.start, this.state.end]}
                           disabledDate={this.disabledDate}
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
                           disabledDate={this.disabledDate}
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
            start: dayjs().subtract(this.state.fresh_button.refresh_value, 'seconds'),
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
        Streamlit.setFrameHeight(450);
        super.componentDidUpdate();
    }

    private disabledDate = (current: dayjs.Dayjs) => {
        if (this.state.availableDates.length === 0) {
            return false;
        }
        return !this.state.availableDates.some(availableDate => availableDate.isSame(current, 'day'));
    }
}