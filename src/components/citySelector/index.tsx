import React, { useState, useMemo, useEffect, memo, useCallback } from 'react'
import classnames from 'classnames'

interface CProps {
  show: boolean
  onBack: (val: boolean) => void
  cityData: any
  isLoading: boolean
  fetchCityData: () => string
  onSelect: (val: string) => void
}
interface CityItemProps {
  onSelect: (val: string) => void
  name: string
}
type CitySectionProps = {
  title: string
  cities: Array<any>
  onSelect: (val: string) => void
}

// 城市子组件
const CityItem = (props: CityItemProps) => {
  const { onSelect, name } = props
  return (
    <li className="city-li" onClick={() => onSelect(name)}>
      {name}
    </li>
  )
}
// 城市块组件
const CitySection = (props: CitySectionProps) => {
  const { title, cities, onSelect } = props
  return (
    <ul className="city-ul">
      <li className="city-li" key="title" data-cate={title}>
        {title}
      </li>
      {cities &&
        cities.map(city => {
          return (
            <CityItem key={city.name} name={city.name} onSelect={onSelect} />
          )
        })}
    </ul>
  )
}
// 字母表
const alphabet = Array.from(new Array(26), (ele, index) =>
  String.fromCharCode(65 + index)
)
// 字母表组件
const AlphaIndex = memo((props: any) => {
  const { alpha, clickAlpha } = props
  return (
    <i
      className="city-index-item"
      onClick={() => clickAlpha(alpha)}
      data-cate={alpha}
    >
      {alpha}
    </i>
  )
})
// 城市组件容器
// position sticky + scrollIntoView(),实现 字母表成城市组件 以及按照字母查询
const CityList = (props: any) => {
  const { sections, onSelect } = props
  const clickAlpha = useCallback(alpha => {
    document.querySelector(`[data-cate='${alpha}']`).scrollIntoView()
  }, [])

  return (
    <div className="city-list">
      <div className="city-cate">
        {sections &&
          sections.map(section => {
            return (
              <CitySection
                key={section.title}
                title={section.title}
                cities={section.citys}
                onSelect={onSelect}
              />
            )
          })}
      </div>
      <div className="city-index">
        {alphabet &&
          alphabet.map(item => {
            return (
              <AlphaIndex key={item} alpha={item} clickAlpha={clickAlpha} />
            )
          })}
      </div>
    </div>
  )
}

// 按关键字搜索组件
const SuggestItem = memo((props: any) => {
  const { onClick, name, setSearchKey } = props
  return (
    <li
      className="city-suggest-li"
      onClick={() => {
        onClick(name)
        setSearchKey('')
      }}
    >
      {name}
    </li>
  )
})
// 搜索城市组件
const Suggest = memo((props: any) => {
  const { onSelect, searchKey, setSearchKey } = props
  const [result, setResult] = useState([])
  useEffect(() => {
    // 根据输入的关键字模糊查询,汉字转码
    fetch('/rest/search?key=' + encodeURIComponent(searchKey))
      .then(res => res.json())
      .then(data => {
        const { result } = data
        setResult(result)
      })
  }, [])

  return (
    <div className="city-suggest">
      <ul className="city-suggest-ul">
        {result &&
          result.map(item => {
            return (
              <SuggestItem
                key={item.display}
                name={item.display}
                onClick={onSelect}
                setSearchKey={setSearchKey}
              />
            )
          })}
      </ul>
    </div>
  )
})

export default function CitySelector(props: CProps) {
  const { show, onBack, cityData, isLoading, fetchCityData, onSelect } = props
  const [searchKey, setSearchKey] = useState('')
  const key = useMemo(() => searchKey.trim(), [searchKey])

  useEffect(
    () => {
      // 判断 蒙层隐藏,城市列表数据已存在,正在加载 都不应该请求
      if (!show || cityData || isLoading) return
      // 否则请求数据
      fetchCityData()
    },
    [show, cityData, isLoading]
  )

  return (
    <div className={classnames('city-selector', { hidden: !show })}>
      <div className="city-search">
        {/* 每次返回清除搜索关键字 */}
        <div
          className="search-back"
          onClick={() => {
            onBack(false)
            setSearchKey('')
          }}
        >
          <svg width="42" height="42">
            <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={searchKey}
            className="search-input"
            placeholder="城市、车站的中文或拼音"
            onChange={e => setSearchKey(e.target.value)}
          />
        </div>
        {/* 点击清空搜索关键字 */}
        <i
          onClick={() => {
            setSearchKey('')
          }}
          className={classnames('search-clean', {
            hidden: key.length === 0
          })}
        >
          &#xf063;
        </i>
      </div>
      {key && (
        <Suggest
          onSelect={onSelect}
          searchKey={searchKey}
          setSearchKey={setSearchKey}
        />
      )}
      <CityList sections={cityData && cityData.cityList} onSelect={onSelect} />
    </div>
  )
}
