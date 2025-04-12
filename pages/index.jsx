// pages/index.jsx
import React from 'react'
import { useRouter } from 'next/router'

const HomePage = () => {
  const router = useRouter()

  const handleButtonClick = (mode, difficulty) => {
    router.push(`/${mode}?difficulty=${difficulty}`)
  }

  return (
    <div style={{ textAlign: 'center', padding: '50px', background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)' }}>
      <h1 style={{ color: '#fff' }}>二進数・十進数 相互変換 練習サイト</h1>
      <div style={{ marginTop: '40px', padding: '10px', background: 'rgba(255,255,255,0.8)', borderRadius: '8px', display: 'inline-block' }}>
        <h2>二進数→十進数 モード</h2>
        <button
          onClick={() => handleButtonClick('binary2decimal', 2)}
          style={{ margin: '5px', padding: '10px 20px', fontSize: '1.2em' }}
        >
          簡単
        </button>
        <button
          onClick={() => handleButtonClick('binary2decimal', 3)}
          style={{ margin: '5px', padding: '10px 20px', fontSize: '1.2em' }}
        >
          普通
        </button>
        <button
          onClick={() => handleButtonClick('binary2decimal', 4)}
          style={{ margin: '5px', padding: '10px 20px', fontSize: '1.2em' }}
        >
          難しい
        </button>
      </div>
      <div style={{ marginTop: '40px', padding: '10px', background: 'rgba(255,255,255,0.8)', borderRadius: '8px', display: 'inline-block' }}>
        <h2>十進数→二進数 モード</h2>
        <button
          onClick={() => handleButtonClick('decimal2binary', 2)}
          style={{ margin: '5px', padding: '10px 20px', fontSize: '1.2em' }}
        >
          簡単
        </button>
        <button
          onClick={() => handleButtonClick('decimal2binary', 3)}
          style={{ margin: '5px', padding: '10px 20px', fontSize: '1.2em' }}
        >
          普通
        </button>
        <button
          onClick={() => handleButtonClick('decimal2binary', 4)}
          style={{ margin: '5px', padding: '10px 20px', fontSize: '1.2em' }}
        >
          難しい
        </button>
      </div>
    </div>
  )
}

export default HomePage
