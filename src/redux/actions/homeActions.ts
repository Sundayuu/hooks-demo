import {
  ACTION_SET_FROM,
  ACTION_SET_TO,
  ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
  ACTION_SET_CITY_DATA,
  ACTION_SET_IS_LOADING,
  ACTION_SET_CURRENT_SELECTING_LEFT_CITY
} from './actionTypes'

//来自城市
export const setFrom = (from: string) => dispatch => {
  dispatch({
    type: ACTION_SET_FROM,
    payload: from
  })
}
// 去哪里
export const setTo = (to: string) => dispatch => {
  dispatch({
    type: ACTION_SET_TO,
    payload: to
  })
}
// 切换起点和终点
export const exchangeFromTo = () => (dispatch, getState) => {
  const { from, to } = getState().homeReducer
  dispatch(setFrom(to))
  dispatch(setTo(from))
}
// 显示城市选择浮层 position选择起点true,终点false
export const showCitySelector = (
  val: boolean,
  position: boolean
) => dispatch => {
  dispatch({
    type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    payload: val
  })
  dispatch({
    type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
    payload: position
  })
}
// 存储城市数据
export const setCityData = (cityData: string) => {
  return {
    type: ACTION_SET_CITY_DATA,
    payload: cityData
  }
}
// 切换城市请求加载状态
export const setIsLoadingCityData = (param: boolean) => ({
  type: ACTION_SET_IS_LOADING,
  payload: param
})

// 请求城市数据
export const fetchCityData = () => (dispatch, getState) => {
  const { isLoading } = getState().homeReducer
  if (isLoading) return
  // 判断是否在缓存有效时间内 读缓存,不发送请求
  let cache = JSON.parse(localStorage.getItem('city_data_cache') || '{}')

  if (new Date() < cache.expires) {
    dispatch(setCityData(cache.data))
    return
  }

  fetch('/rest/cities?_ ' + Date.now())
    .then(res => res.json())
    .then(cityData => {
      dispatch(setCityData(cityData))
      //存缓存,防止用户短时间多次选择
      localStorage.setItem(
        'city_data_cache',
        JSON.stringify({
          expires: Date.now() + 60 * 1000, //缓存1分钟
          data: cityData
        })
      )
      // 请求结束关闭请求状态
      dispatch(setIsLoadingCityData(false))
    })
    .catch(() => {
      // 请求结束关闭请求状态
      dispatch(setIsLoadingCityData(false))
    })
}
// 选中城市.首先判断是开关(选择起点还是终点)
export const selectedCity = (name: string) => (dispatch, getState) => {
  // 从redux中获取开关判断
  const { currentLeftCity } = getState().homeReducer
  if (currentLeftCity) {
    dispatch(setFrom(name))
  } else {
    dispatch(setTo(name))
  }
  dispatch(showCitySelector(false, false))
}
