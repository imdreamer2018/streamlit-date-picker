import {
  Streamlit,
  StreamlitComponentBase,
} from "streamlit-component-lib"
import React, {ComponentProps, ReactNode} from "react"
import { DatePicker as DATE_PICKER, DatePickerProps } from 'antd';
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


interface State {
    picker_type: PickerType,
    format_string: FormatString
    value: dayjs.Dayjs,
    availableDates: dayjs.Dayjs[],
}
export class DatePicker extends StreamlitComponentBase<State> {


    constructor(props: ComponentProps<any>) {
        super(props);
        this.state = {
            picker_type: getPickerType(this.props.args["picker_type"]) || PickerType.date,
            format_string: getFormatString(this.props.args["picker_type"]) || FormatString.date,
            value: dayjs(this.props.args["value"] * 1000),
            availableDates: this.props.args["available_dates"] ? 
                this.props.args["available_dates"].map((available_date: number) => dayjs(available_date * 1000)) : []
        }
        this.setComponentValue()
    }

    private setComponentValue = () => {
        Streamlit.setComponentValue(this.state.value.format(this.state.format_string))
    }

    public render = (): ReactNode => {
        return (
            <div style={{ height: '50px' }}>
                {this.state.picker_type === "time" &&
                    <DATE_PICKER showTime
                           format={this.state.format_string}
                           onChange={this._onChange}
                           placement={"bottomLeft"}
                           onOpenChange={this._onOpenChange}
                           value={this.state.value}
                           disabledDate={this.disabledDate}
                    />
                }
                {this.state.picker_type !== "time" &&
                    <DATE_PICKER
                           picker={this.state.picker_type}
                           format={this.state.format_string}
                           onChange={this._onChange}
                           placement={"bottomLeft"}
                           onOpenChange={this._onOpenChange}
                           value={this.state.value}
                           disabledDate={this.disabledDate}
              />}
            </div>
        )
    }

    private _onChange = (date: any, dateString: any) => {
        this.setState({
            value: date
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