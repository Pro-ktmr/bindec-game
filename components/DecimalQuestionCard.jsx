// components/DecimalQuestionCard.jsx
import React, { useState, useEffect } from 'react'
import DigitCard from './DigitCard'
import dynamic from 'next/dynamic'

const Confetti = dynamic(() => import('react-confetti'), { ssr: false })

const DecimalQuestionCard = ({ question, onAnswerCorrect, difficulty }) => {
  const numBits = question.binary.length
  const initialAnswer = Array.from({ length: numBits }, () => 0)
  const [answer, setAnswer] = useState(initialAnswer)
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    setAnswer(initialAnswer)
    setFeedback(null)
  }, [question])

  const handleBitClick = (index) => {
    if (feedback === 'correct') return
    setAnswer(prev => {
      const newAnswer = [...prev]
      newAnswer[index] = prev[index] === 0 ? 1 : 0
      return newAnswer
    })
  }

  useEffect(() => {
    const answerBinary = answer.join('')
    if (answerBinary === question.binary) {
      setFeedback('correct')
      const timer = setTimeout(() => {
        onAnswerCorrect()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [answer, question.binary, onAnswerCorrect])

  // 出題時の十進数は，数字ごとにシンプルなスタイルで表示
  const decimalString = question.decimal.toString()
  const decimalDigits = decimalString.split('')

  return (
    <div className="question-card" style={{ margin: '20px', padding: '10px', background: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>十進数→二進数 モード</h2>
      <div className="question-display" style={{ marginBottom: '20px', textAlign: 'center', fontSize: '2em', fontWeight: 'bold', color: '#333' }}>
        {decimalDigits.map((digit, idx) => (
          <span key={idx} style={{ padding: '0 4px' }}>{digit}</span>
        ))}
      </div>
      <div className="answer-area" style={{ display: 'flex', justifyContent: 'center', gap: '0px' }}>
        {answer.map((bit, idx) => {
          // 各桁の重みは，最下位なら 2^0＝1，その上なら 2^1＝2，…とする
          const weightValue = Math.pow(2, numBits - 1 - idx)
          return (
            <DigitCard
              key={idx}
              value={bit}
              weight={weightValue}
              isActive={bit === 1}
              onClick={() => handleBitClick(idx)}
              showDots={true}
            />
          )
        })}
      </div>
      {feedback === 'correct' && (
        <>
          <div className="feedback" style={{ marginTop: '20px', fontSize: '1.5em', color: '#009688', textAlign: 'center' }}>
            正解！
          </div>
          <Confetti recycle={false} numberOfPieces={200} />
        </>
      )}
    </div>
  )
}

export default DecimalQuestionCard
