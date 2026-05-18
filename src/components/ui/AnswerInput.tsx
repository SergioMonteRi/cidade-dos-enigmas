import { useState } from 'react';
import type { Card } from '../../types';
import styles from './AnswerInput.module.css';

interface AnswerInputProps {
  readonly card: Card;
}

type FeedbackState = 'idle' | 'correct' | 'incorrect';

export default function AnswerInput({ card }: AnswerInputProps) {
  const [value, setValue] = useState('');
  const [feedback, setFeedback] = useState<FeedbackState>('idle');
  const [attempts, setAttempts] = useState(0);

  const submitAnswer = () => {
    const numeric = Number.parseFloat(value.replace(',', '.'));
    setAttempts((prev) => prev + 1);
    if (Math.abs(numeric - card.answer) < 0.01) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const handleReset = () => {
    setValue('');
    setFeedback('idle');
  };

  if (feedback === 'correct') {
    return (
      <div className={`${styles.feedback} ${styles.correct}`} role="alert">
        <div className={styles.feedbackIcon}>💎</div>
        <h3 className={styles.feedbackTitle}>Parabéns! Você acertou!</h3>
        <p className={styles.feedbackAnswer}>
          A resposta é <strong>{card.answer} {card.answerUnit}</strong>.
        </p>
        <p className={styles.feedbackInstruction}>
          Você conquistou um <strong>diamante</strong>! Continue o jogo normalmente.
        </p>
      </div>
    );
  }

  if (feedback === 'incorrect') {
    return (
      <div className={`${styles.feedback} ${styles.incorrect}`} role="alert">
        <div className={styles.feedbackIcon}>❌</div>
        <h3 className={styles.feedbackTitle}>Resposta incorreta.</h3>
        {attempts >= 3 && (
          <p className={styles.hint}>
            💡 <strong>Dica:</strong> Releia o desafio com atenção e verifique a unidade de medida pedida.
          </p>
        )}
        <p className={styles.feedbackInstruction}>
          Sem diamante desta vez. Continue o jogo — mas você precisará entrar em outro ambiente antes de tentar aqui novamente.
        </p>
        <button className="btn-primary" onClick={handleReset}>
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); submitAnswer(); }} className={styles.form}>
      <label htmlFor="answer-input" className={styles.label}>
        Sua resposta:
      </label>
      <div className={styles.inputRow}>
        <input
          id="answer-input"
          type="number"
          step="any"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={card.answerUnit ? 'Ex: 42' : 'Digite o número...'}
          required
          className={styles.input}
          aria-describedby="answer-hint"
        />
        {card.answerUnit && (
          <span className={styles.unit}>{card.answerUnit}</span>
        )}
      </div>
      <p id="answer-hint" className={styles.hint}>
        Use ponto ou vírgula para decimais.
      </p>
      <button type="submit" className="btn-primary" disabled={!value.trim()}>
        Confirmar resposta →
      </button>
    </form>
  );
}
