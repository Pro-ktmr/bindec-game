// pages/binary2decimal.jsx
import React, { useState, useEffect } from 'react'
import BinaryQuestionCard from '../components/BinaryQuestionCard'
import { useRouter } from 'next/router'

const generateBinaryQuestion = (difficulty) => {
  let binaryDigits, decimalValue
  if (difficulty === 2) {
    // 4ビット（0～15）
    decimalValue = Math.floor(Math.random() * 16)
    binaryDigits = decimalValue.toString(2).padStart(4, '0')
  } else if (difficulty === 3) {
    // 8ビット（0～255）
    decimalValue = Math.floor(Math.random() * 256)
    binaryDigits = decimalValue.toString(2).padStart(8, '0')
  } else if (difficulty === 4) {
    // 12ビット（0～4095）
    decimalValue = Math.floor(Math.random() * 4096)
    binaryDigits = decimalValue.toString(2).padStart(12, '0')
  } else {
    decimalValue = Math.floor(Math.random() * 16)
    binaryDigits = decimalValue.toString(2).padStart(4, '0')
  }
  return { binary: binaryDigits, decimal: decimalValue }
}

const Binary2DecimalPage = () => {
  const router = useRouter()
  const difficulty = router.query.difficulty ? parseInt(router.query.difficulty, 10) : 2
  const [questionIndex, setQuestionIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (!startTime) {
      setStartTime(Date.now())
    }
    setCurrentQuestion(generateBinaryQuestion(difficulty))
  }, [difficulty, startTime, questionIndex])

  if (!currentQuestion) {
    return <div>Loading...</div>
  }

  const handleAnswerCorrect = () => {
    if (questionIndex + 1 >= 5) {
      setFinished(true)
    } else {
      setQuestionIndex(questionIndex + 1)
      setCurrentQuestion(generateBinaryQuestion(difficulty))
    }
  }

  const totalTime = finished ? ((Date.now() - startTime) / 1000).toFixed(2) : null

  return (
    <div style={{ background: 'linear-gradient(135deg, #fbc2eb, #a6c1ee)', minHeight: '100vh', padding: '20px' }}>
      {!finished ? (
        <BinaryQuestionCard
          question={currentQuestion}
          onAnswerCorrect={handleAnswerCorrect}
          difficulty={difficulty}
        />
      ) : (
        <div className="result" style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2 style={{ color: '#fff' }}>完了！</h2>
          <p style={{ color: '#fff' }}>正解までに要した時間：{totalTime} 秒</p>
          <button
            onClick={() => router.push('/')}
            style={{ padding: '10px 20px', fontSize: '1.2em' }}
          >
            モード選択へ戻る
          </button>
        </div>
      )}
    </div>
  )
}

export default Binary2DecimalPage
