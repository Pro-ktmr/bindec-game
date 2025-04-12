// components/DecimalDigitControl.jsx
import React from 'react'
import PropTypes from 'prop-types'

const DecimalDigitControl = ({ value, onIncrement, onDecrement }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '4px',
      minWidth: '30px'
    }}>
      <div 
        style={{
          cursor: 'pointer',
          fontSize: '1.2em',
          color: '#0070f3',
          userSelect: 'none'
        }}
        onClick={onIncrement}
      >
        ▲
      </div>
      <div style={{ fontSize: '1.5em', fontWeight: 'bold', margin: '4px 0' }}>
        {value}
      </div>
      <div 
        style={{
          cursor: 'pointer',
          fontSize: '1.2em',
          color: '#ff4081',
          userSelect: 'none'
        }}
        onClick={onDecrement}
      >
        ▼
      </div>
    </div>
  )
}

DecimalDigitControl.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
}

export default DecimalDigitControl
