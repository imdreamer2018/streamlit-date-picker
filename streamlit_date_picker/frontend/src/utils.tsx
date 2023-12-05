export enum PickerType {
  time = 'time',
  date = 'date',
  week = 'week',
  month = 'month',
  quarter = 'quarter',
  year = 'year'
}

export const getPickerType = (value: string): PickerType | undefined => {
  switch (value) {
    case 'time':
      return PickerType.time
    case 'date':
      return PickerType.date
    case 'week':
      return PickerType.week
    case 'month':
      return PickerType.month
    case 'quarter':
      return PickerType.quarter
    case 'year':
      return PickerType.year
    default:
      return PickerType.date;
  }
}

export enum FormatString {
    time = 'YYYY-MM-DD HH:mm:ss',
    date = 'YYYY-MM-DD',
    week = 'YYYY-wo',
    month = 'YYYY-MM',
    quarter = 'YYYY-Q',
    year = 'YYYY'
}
export const getFormatString = (value: string): FormatString | undefined => {
  switch (value) {
    case 'time':
      return FormatString.time
    case 'date':
      return FormatString.date
    case 'week':
      return FormatString.week
    case 'month':
      return FormatString.month
    case 'quarter':
      return FormatString.quarter
    case 'year':
      return FormatString.year
    default:
      return FormatString.date;
  }
}

export enum Unit {
  milliseconds='milliseconds',
  seconds='seconds',
  minutes='minutes',
  hours='hours',
  days='days',
  weeks='weeks',
  months='months',
  years='years'
}