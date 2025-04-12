// components/BinaryQuestionCard.jsx
import React, { useState, useEffect } from 'react'
import DigitCard from './DigitCard'
import DecimalDigitControl from './DecimalDigitControl'
import dynamic from 'next/dynamic'

const Confetti = dynamic(() => import('react-confetti'), { ssr: false })

const BinaryQuestionCard = ({ question, onAnswerCorrect, difficulty }) => {
  // 解答用の桁数は difficulty（例：簡単＝2桁，普通＝3桁，難しい＝4桁）とする
  const numDigits = difficulty
  const initialAnswer = Array.from({ length: numDigits }, () => 0)
  const [answer, setAnswer] = useState(initialAnswer)
  const [feedback, setFeedback] = useState(null)

  // 問題が変わったときは，解答状態とフィードバックをリセット
  useEffect(() => {
    setAnswer(initialAnswer)
    setFeedback(null)
  }, [question])

  const handleIncrement = (index) => {
    if (feedback === 'correct') return // 正解後は操作不可
    setAnswer(prev => {
      const newAnswer = [...prev]
      newAnswer[index] = (newAnswer[index] + 1) % 10
      return newAnswer
    })
  }

  const handleDecrement = (index) => {
    if (feedback === 'correct') return
    setAnswer(prev => {
      const newAnswer = [...prev]
      newAnswer[index] = (newAnswer[index] + 9) % 10 // 減算は +9 mod10
      return newAnswer
    })
  }

  useEffect(() => {
    const answerNumber = parseInt(answer.join(''), 10)
    if (answerNumber === question.decimal) {
      setFeedback('correct')
      const timer = setTimeout(() => {
        onAnswerCorrect()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [answer, question.decimal, onAnswerCorrect])

  return (
    <div className="question-card" style={{ margin: '20px', padding: '10px', background: 'linear-gradient(135deg, #f6d365, #fda085)', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>二進数→十進数 モード</h2>
      <div className="question-display" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
        {question.binary.split('').map((bit, idx) => {
          // 各桁の重みは，その桁が表す値（例：左端なら 2^(桁数-1)）
          const weightValue = Math.pow(2, question.binary.length - 1 - idx)
          return (
            <DigitCard
              key={idx}
              value={bit === '1' ? 1 : 0}
              weight={weightValue}
              isActive={bit === '1'}
              onClick={() => {}}
              showDots={true}
            />
          )
        })}
      </div>
      <div className="answer-area" style={{ display: 'flex', justifyContent: 'center', gap: '0px' }}>
        {answer.map((digit, idx) => (
          <DecimalDigitControl
            key={idx}
            value={digit}
            onIncrement={() => handleIncrement(idx)}
            onDecrement={() => handleDecrement(idx)}
          />
        ))}
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

export default BinaryQuestionCard
