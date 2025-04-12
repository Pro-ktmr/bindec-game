// pages/decimal2binary.jsx
import React, { useState, useEffect } from 'react'
import DecimalQuestionCard from '../components/DecimalQuestionCard'
import { useRouter } from 'next/router'

const generateDecimalQuestion = (difficulty) => {
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

const Decimal2BinaryPage = () => {
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
    setCurrentQuestion(generateDecimalQuestion(difficulty))
  }, [difficulty, startTime, questionIndex])

  if (!currentQuestion) {
    return <div>Loading...</div>
  }

  const handleAnswerCorrect = () => {
    if (questionIndex + 1 >= 5) {
      setFinished(true)
    } else {
      setQuestionIndex(questionIndex + 1)
      setCurrentQuestion(generateDecimalQuestion(difficulty))
    }
  }

  const totalTime = finished ? ((Date.now() - startTime) / 1000).toFixed(2) : null

  return (
    <div style={{ background: 'linear-gradient(135deg, #ffecd2, #fcb69f)', minHeight: '100vh', padding: '20px' }}>
      {!finished ? (
        <DecimalQuestionCard
          question={currentQuestion}
          onAnswerCorrect={handleAnswerCorrect}
          difficulty={difficulty}
        />
      ) : (
        <div className="result" style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2>完了！</h2>
          <p>正解までに要した時間：{totalTime} 秒</p>
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

export default Decimal2BinaryPage
