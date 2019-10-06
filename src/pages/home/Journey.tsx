import React from 'react'
import switchImg from 'assets/img/switch.svg'

interface JProps {
  from: string
  to: string
  exchangeFromTo: () => void
  showCitySelector: (val: boolean, position: boolean) => void
}
export default function Journey(props: JProps) {
  const { from, to, exchangeFromTo, showCitySelector } = props

  return (
    <div className="journey">
      {/* 点击城市 进入城市选择浮层 */}
      <div
        className="journey-station"
        onClick={() => {
          showCitySelector(true, true)
        }}
      >
        <input
          type="text"
          readOnly
          name="from"
          value={from}
          className="journey-input journey-from"
        />
      </div>
      <div className="journey-switch" onClick={() => exchangeFromTo()}>
        <img src={switchImg} width="70" height="40" alt="switch" />
      </div>
      <div
        className="journey-station"
        onClick={() => {
          showCitySelector(true, false)
        }}
      >
        <input
          type="text"
          readOnly
          name="to"
          value={to}
          className="journey-input journey-to"
        />
      </div>
    </div>
  )
}
