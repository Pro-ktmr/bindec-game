// components/DigitCard.jsx
import React from 'react'
import PropTypes from 'prop-types'

// dotCount に対して，理想的な行数・列数を返す関数
function getDotGridLayout(count) {
  switch(count) {
    case 1: return { rows: 1, columns: 1 }
    case 2: return { rows: 1, columns: 2 }
    case 3: return { rows: 1, columns: 3 }
    case 4: return { rows: 2, columns: 2 }
    case 8: return { rows: 2, columns: 4 }
    case 9: return { rows: 3, columns: 3 }
    case 16: return { rows: 4, columns: 4 }
    case 32: return { rows: 4, columns: 8 }
    default: {
      let rows = Math.floor(Math.sqrt(count))
      let columns = Math.ceil(count / rows)
      return { rows, columns }
    }
  }
}

const DigitCard = ({ value, weight, isActive, onClick, showDots }) => {
  const { rows, columns } = getDotGridLayout(weight)
  return (
    <div
      className={`digit-card ${isActive ? 'active' : 'inactive'}`}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        border: '1px solid #ccc',
        padding: '8px',
        margin: 0, // カード間の余白をなくす
        textAlign: 'center',
        borderRadius: '4px',
        minWidth: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div className="number" style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
        {value}
      </div>
      {showDots && (
        <div 
          className="dots" 
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: '0px',
            width: '100%',
            alignItems: 'center',
            justifyItems: 'center',
            marginTop: '4px'
          }}
        >
          {Array.from({ length: weight }).map((_, i) => (
            <span key={i} style={{ display: 'block', lineHeight: 1 }}>{'●'}</span>
          ))}
        </div>
      )}
    </div>
  )
}

DigitCard.propTypes = {
  value: PropTypes.number.isRequired,
  weight: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  showDots: PropTypes.bool,
}

DigitCard.defaultProps = {
  isActive: false,
  onClick: () => {},
  showDots: true,
}

export default DigitCard
