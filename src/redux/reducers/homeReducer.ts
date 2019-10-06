import {
  ACTION_SET_FROM,
  ACTION_SET_TO,
  ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
  ACTION_SET_CITY_DATA,
  ACTION_SET_IS_LOADING,
  ACTION_SET_CURRENT_SELECTING_LEFT_CITY
} from 'redux/actions/actionTypes'

interface IState {
  from: string
  to: string
  isCitySelectorVisible: boolean
  cityData: string
  isLoading: boolean | null
  currentLeftCity: boolean
}

const initialState = {
  from: '北京',
  to: '上海',
  isCitySelectorVisible: false, //显示城市选择蒙层
  isLoading: false, // 正在加载
  cityData: null, // 城市数据
  currentLeftCity: false // 是否选中起点城市
}
const from = (state: IState, action) => {
  return {
    ...state,
    from: action.payload
  }
}
const to = (state: IState, action) => {
  return {
    ...state,
    to: action.payload
  }
}
const showCitySelector = (state: IState, action) => {
  return {
    ...state,
    isCitySelectorVisible: action.payload
  }
}
const setCityData = (state: IState, action) => {
  return {
    ...state,
    cityData: action.payload
  }
}
const setIsLoading = (state: IState, action) => {
  return {
    ...state,
    isLoading: action.payload
  }
}
const isSelectLeftCity = (state: IState, action) => {
  return {
    ...state,
    currentLeftCity: action.payload
  }
}

const homeReducer = (state: IState = initialState, action) => {
  switch (action.type) {
    case ACTION_SET_FROM:
      return from(state, action)
    case ACTION_SET_TO:
      return to(state, action)
    case ACTION_SET_IS_CITY_SELECTOR_VISIBLE:
      return showCitySelector(state, action)
    case ACTION_SET_CITY_DATA:
      return setCityData(state, action)
    case ACTION_SET_IS_LOADING:
      return setIsLoading(state, action)
    case ACTION_SET_CURRENT_SELECTING_LEFT_CITY:
      return isSelectLeftCity(state, action)
    default:
      return state
  }
}
export default homeReducer
