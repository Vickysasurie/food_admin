import React, { Component } from 'react'
// import { Motion } from 'react-motion'
import style from './SimpleMarker.css'
import classNames from 'classnames'

const thresholdZoom = 14

class SimpleMarker extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {text, onClick, zoom} = this.props
    const simpleMarkStyle = (zoom >= thresholdZoom) ? classNames(style['bigMarker']) : classNames(style['marker'])
    const _text = (zoom >= thresholdZoom) ? text.substr(0, 4) : text.substr(0, 2)

    return <div className={simpleMarkStyle} onClick={onClick}>
             <p>
               {_text}
             </p>
           </div>
  }
}

export default SimpleMarker