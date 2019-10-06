import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import {
  exchangeFromTo,
  showCitySelector,
  fetchCityData,
  selectedCity
} from 'redux/actions/homeActions'

import { Head, CitySelector } from 'components'
import Journey from './Journey'

function Home(props: any) {
  const {
    from,
    to,
    exchangeFromTo,
    showCitySelector,
    isCitySelectorVisible,
    isLoading,
    cityData,
    fetchCityData,
    selectedCity
  } = props

  // useCallback 返回一个memoized 回调函数。优化性能使用,类似于做了shouldComponentUpdate
  const back = useCallback(() => {
    window.history.back()
  }, [])
  //useMemo 返回函数 其功能和useCallback一致
  const cbs = useMemo(() => {
    return {
      exchangeFromTo,
      showCitySelector
    }
  }, [])
  const citySelectCbs = useMemo(() => {
    return {
      onBack: showCitySelector,
      fetchCityData,
      onSelect: selectedCity
    }
  }, [])
  return (
    <div className="home">
      <div className="header-wrapper">
        <Head title="火车票" onBack={back} />
      </div>
      <form action="./query/html" className="form">
        <Journey
          from={from}
          to={to}
          // exchangeFromTo={useCallback(() => exchangeFromTo(), [])}
          // showCitySelector={useCallback(() => showCitySelector(), [])}
          {...cbs}
        />
      </form>
      <CitySelector
        cityData={cityData}
        isLoading={isLoading}
        show={isCitySelectorVisible}
        // onBack={useCallback(() => showCitySelector(), [])}
        {...citySelectCbs}
      />
    </div>
  )
}
export default connect(
  function mapStateToProps({ homeReducer }) {
    return { ...homeReducer }
  },
  function mapDispatchToProps(dispatch) {
    return {
      exchangeFromTo: () => dispatch(exchangeFromTo()),
      showCitySelector: (val, position) =>
        dispatch(showCitySelector(val, position)),
      fetchCityData: () => dispatch(fetchCityData()),
      selectedCity: cityName => dispatch(selectedCity(cityName))
    }
  }
)(Home)
