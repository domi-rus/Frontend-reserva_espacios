import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import * as moment from 'moment'
import { Reserve } from 'src/app/interfaces/reserve'

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss']
})

export class UiComponent implements OnInit {

  @Input() reserves: Reserve[] = []
  // Comunicamos el evento de seleccion de fecha   
  @Output() SelectedDate: EventEmitter<any>
  // Creamos los días de la semana
  week: any = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ]
  // Creamos las siguientes variables inicializadas a any para que se puedan usar en el html
  monthSelect: any[] = []
  dateSelect: any
  dateValue: any

  constructor() {
    this.SelectedDate = new EventEmitter()
  }
  // Capturamos mes y año actuales
  ngOnChanges() {
    // console.log(moment().format('MM'))
    // console.log(moment().format('YYYY'))
  }
  // Fecha de inicio
  ngOnInit(): void {
    this.getDaysFromDate(moment().format('MM'), moment().format('YYYY'))
  }
  // Calendario
  getDaysFromDate(month: any, year: any) {
    // Moment.js
    // Guardamos el dia inicial y el día final para calcular el número de días del mes
    const startDate = moment.utc(`${year}/${month}/01`)
    const endDate = startDate.clone().endOf('month')
    this.dateSelect = startDate
    // Diferencia de dias entre la fecha inicial y la fecha final	(startDate - endDate)
    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays)
    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {

      a = parseInt(a) + 1
      // Date
      const dayObject = moment(`${year}-${month}-${a}`)

      const haveReserve = this.reserves.find(reserves => {
        let justDay = dayObject.isSame(moment(reserves.date), 'day')
        return justDay
      })
      return {
        name: dayObject.format("dddd"),
        value: a,
        // Día de la semana
        indexWeek: dayObject.isoWeekday()
      }
    })
    this.monthSelect = arrayDays
  }
  // Cambiar el mes
  changeMonth(flag: any) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month")
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"))
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"))
    }
  }

  async clickDay(day: any) {
    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day.value}`
    const objectDate = moment(parse)
    this.dateValue = objectDate
    let date = this.dateValue._i

    if (date !== "") {
      this.SelectedDate.emit(date)

    }
  }
}