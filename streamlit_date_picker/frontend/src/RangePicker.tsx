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
    format_string: FormatString,
    start: dayjs.Dayjs,
    end: dayjs.Dayjs,
    refresh_buttons: { button_name: string, refresh_value: number }[],
    availableDates: dayjs.Dayjs[]
}
export class DateRangePicker extends StreamlitComponentBase<State> {

    constructor(props: ComponentProps<any>) {
        super(props);
        const refreshButtons = this.props.args["refresh_buttons"] || [];
        this.state = {
            picker_type: getPickerType(this.props.args["picker_type"]) || PickerType.date,
            format_string: getFormatString(this.props.args["picker_type"]) || FormatString.date,
            start: dayjs(this.props.args["start"] * 1000),
            end: dayjs(this.props.args["end"] * 1000),
            refresh_buttons: refreshButtons,
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
            <div style={{ height: '60px', display: 'flex', alignItems: 'center' }}>
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
                <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '20px' }}>
                    {this.state.refresh_buttons.length > 0 &&
                        this.state.refresh_buttons.map((button, index) => (
                            <Button key={'fresh_button_'+index} onClick={() => this._button_on_click(button.refresh_value)}
                                    style={{ marginLeft: '10px' }}>{button.button_name}
                            </Button>
                        ))
                    }
                </div>
            </div>
        )
    }

    private _button_on_click = (refreshValue: number) => {
        this.setState({
            start: dayjs().subtract(refreshValue, 'seconds'),
            end: dayjs()
        });
        this.setComponentValue();
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