import { isEmpty } from './common'
import { format } from 'date-fns'

const formatTime = (time: string, type: string) => {
  const timesmap = new Date(time).getTime()
  const newTime = format(new Date(timesmap), type)
  return newTime
}

const convertToJson = <T>(jsonSchma: T) => {
  return JSON.stringify(jsonSchma)
}

const parseNum = (value: number, precision: number): string => {
  if (isEmpty(value) || isNaN(value)) return '--';
  if (isEmpty(precision) || isNaN(precision))
    return value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 10 });
  return value.toLocaleString(undefined, { minimumFractionDigits: precision, maximumFractionDigits: precision });
}


export default {
  convertToJson,
  parseNum,
  formatTime
}