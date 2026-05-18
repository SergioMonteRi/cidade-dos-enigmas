# Cidade dos Enigmas — Guia de Implementação Passo a Passo

## Contexto do Projeto

Board game educativo "Cidade dos Enigmas" com componente digital: determinadas casas do tabuleiro têm QR codes que direcionam para páginas web com cartas-desafio de matemática. O site tem uma landing page apresentando o jogo e uma rota por carta (card/:id) onde o jogador resolve o enigma e recebe feedback.

**Stack:** React 18 + Vite + TypeScript + React Router v7 + CSS Modules (ou Tailwind CSS v4)
**Sem backend.** Toda a lógica é client-side.

---

## Identidade Visual (extraída do material do jogo)

- **Background principal:** `#0A1628` (azul marinho profundo)
- **Accent primário:** `#F5A623` (amarelo-âmbar — botões, destaques, bordas)
- **Accent secundário:** `#2EC4B6` (teal — "ENIGMAS", ícones)
- **Accent terciário:** `#7B5EA7` (roxo — símbolo ×, elementos decorativos)
- **Texto principal:** `#FFFFFF`
- **Bordas de carta:** amarelo-âmbar com bordas arredondadas e padrão de labirinto no fundo
- **Tipografia:** `Nunito` (peso 700–900, rounded, lúdico) + `Baloo 2` para o logotipo
- **Padrão de fundo:** labirinto SVG repetindo (maze pattern) em azul levemente mais claro sobre o fundo
- **Símbolos flutuantes:** `+  −  ×  ÷  △  □` em teal, amarelo e roxo

---

## Estrutura de Pastas

```
cidade-dos-enigmas/
├── public/
│   ├── videos/                    # Vídeos em Libras
│   │   ├── sobre.mp4
│   │   ├── regras.mp4
│   │   └── cartas/
│   │       ├── carta-01.mp4
│   │       ├── carta-02.mp4
│   │       └── ... (até carta-20.mp4)
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── maze-pattern.svg       # Padrão de labirinto para o fundo
│   ├── components/
│   │   ├── ui/
│   │   │   ├── LibrasPlayer.tsx   # Player de vídeo em Libras (modal ou inline)
│   │   │   ├── CardDisplay.tsx    # Renderiza a carta no estilo visual do jogo
│   │   │   ├── AnswerInput.tsx    # Input + feedback de resposta
│   │   │   ├── MathSymbols.tsx    # Símbolos flutuantes decorativos
│   │   │   └── GameBadge.tsx      # Badge com ícone de categoria (escola, padaria...)
│   │   ├── layout/
│   │   │   ├── Header.tsx         # Logo + nav
│   │   │   └── Footer.tsx
│   │   └── sections/              # Seções da landing page
│   │       ├── HeroSection.tsx
│   │       ├── AboutSection.tsx
│   │       ├── RulesSection.tsx
│   │       └── CardsGallery.tsx
│   ├── data/
│   │   └── cards.ts               # Array com todas as 20 cartas
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   └── CardPage.tsx
│   ├── types/
│   │   └── index.ts               # Interfaces TypeScript
│   ├── styles/
│   │   ├── globals.css            # CSS vars + reset
│   │   └── components/            # CSS Modules por componente (se não usar Tailwind)
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## PASSO 1 — Setup do Projeto

```bash
# Criar projeto
npm create vite@latest cidade-dos-enigmas -- --template react-ts
cd cidade-dos-enigmas

# Instalar dependências
npm install react-router-dom@7

# Opcional mas recomendado (ícones e animações)
npm install lucide-react framer-motion

# Dev dependencies
npm install -D @types/react @types/react-dom
```

**`vite.config.ts`** — sem mudanças, o padrão já funciona.

**`index.html`** — adicionar as fontes Google:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
<title>Cidade dos Enigmas</title>
```

---

## PASSO 2 — Design System (CSS Global)

**`src/styles/globals.css`:**

```css
:root {
  /* Colors */
  --color-bg: #0A1628;
  --color-bg-card: #0D1F3C;
  --color-bg-light: #132040;
  --color-accent-yellow: #F5A623;
  --color-accent-teal: #2EC4B6;
  --color-accent-purple: #7B5EA7;
  --color-text: #FFFFFF;
  --color-text-muted: rgba(255, 255, 255, 0.65);
  --color-border: rgba(245, 166, 35, 0.4);

  /* Typography */
  --font-display: 'Baloo 2', cursive;
  --font-body: 'Nunito', sans-serif;

  /* Spacing */
  --section-padding: clamp(3rem, 8vw, 6rem);
  --card-border-radius: 16px;

  /* Card dimensions (UNO card ratio: 56×87mm ≈ 2:3.1) */
  --card-width: 280px;
  --card-height: 435px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  min-height: 100vh;
  /* Maze pattern background */
  background-image: url('/maze-pattern.svg');
  background-size: 200px;
  background-repeat: repeat;
  background-attachment: fixed;
}

/* Utility classes */
.section-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  color: var(--color-text);
}

.section-title span {
  color: var(--color-accent-teal);
}

.btn-primary {
  background: var(--color-accent-yellow);
  color: var(--color-bg);
  font-family: var(--font-body);
  font-weight: 800;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(245, 166, 35, 0.4);
}
```

---

## PASSO 3 — TypeScript Types

**`src/types/index.ts`:**

```typescript
export interface Card {
  id: number;                        // 1–20
  locationName: string;              // Ex: "Escola", "Padaria", "Academia"
  locationEmoji: string;             // Ex: "🏫", "🥖", "🏋️"
  locationColor: string;             // Ex: "#2EC4B6" (teal) ou "#F5A623" (yellow)
  locationIllustrationAlt: string;   // Alt text para acessibilidade
  challengeText: string;             // Texto completo do desafio
  highlightedTerms: string[];        // Termos em teal para destacar no texto
  answer: number;                    // Resposta correta
  answerUnit?: string;               // Ex: "alunos", "km", "R$"
  librasVideoSrc: string;            // Ex: "/videos/cartas/carta-01.mp4"
  difficulty: 'fácil' | 'médio' | 'difícil';
}

export interface GameInfo {
  about: {
    text: string;
    librasVideoSrc: string;
  };
  rules: {
    steps: string[];
    librasVideoSrc: string;
  };
}
```

---

## PASSO 4 — Dados das Cartas

**`src/data/cards.ts`:**

```typescript
import { Card, GameInfo } from '../types';

export const GAME_INFO: GameInfo = {
  about: {
    text: 'Cidade dos Enigmas é um jogo de tabuleiro educativo onde os jogadores exploram uma cidade cheia de mistérios matemáticos. A cada casa especial, um QR code revela um desafio que testa o raciocínio lógico. Desenvolvido para promover a inclusão, o jogo conta com Libras em todos os desafios.',
    librasVideoSrc: '/videos/sobre.mp4',
  },
  rules: {
    steps: [
      'Role o dado e mova seu peão pelo tabuleiro da cidade.',
      'Ao cair em uma casa com QR Code, escaneie-o com seu celular.',
      'Leia o desafio matemático da carta revelada.',
      'Calcule a resposta e digite no campo indicado.',
      'Acertou? Avance 2 casas! Errou? Fique parado no próximo turno.',
      'O primeiro jogador a chegar ao centro da cidade vence!',
    ],
    librasVideoSrc: '/videos/regras.mp4',
  },
};

export const CARDS: Card[] = [
  {
    id: 1,
    locationName: 'Escola',
    locationEmoji: '🏫',
    locationColor: '#2EC4B6',
    locationIllustrationAlt: 'Ilustração de uma escola',
    challengeText: 'Uma escola possui 12 turmas de 6º ano, cada uma com 35 alunos. Quantos alunos do 6º ano estudam nessa escola no total?',
    highlightedTerms: ['12 turmas', '35 alunos'],
    answer: 420,
    answerUnit: 'alunos',
    librasVideoSrc: '/videos/cartas/carta-01.mp4',
    difficulty: 'médio',
  },
  {
    id: 2,
    locationName: 'Padaria',
    locationEmoji: '🥖',
    locationColor: '#F5A623',
    locationIllustrationAlt: 'Ilustração de uma padaria',
    challengeText: 'Na Padaria, um pãozinho custa R$ 0,50. Se você comprar uma dezena e meia de pães, quanto deverá pagar?',
    highlightedTerms: ['R$ 0,50', 'dezena e meia'],
    answer: 9,
    answerUnit: 'R$',
    librasVideoSrc: '/videos/cartas/carta-02.mp4',
    difficulty: 'médio',
  },
  {
    id: 3,
    locationName: 'Academia',
    locationEmoji: '🏋️',
    locationColor: '#2EC4B6',
    locationIllustrationAlt: 'Ilustração de uma academia com pista de corrida',
    challengeText: 'A Academia tem uma pista de corrida de 400 metros. Se um atleta der 12 voltas completas, quantos quilômetros ele terá percorrido?',
    highlightedTerms: ['400 metros', '12 voltas completas'],
    answer: 4.8,
    answerUnit: 'km',
    librasVideoSrc: '/videos/cartas/carta-03.mp4',
    difficulty: 'médio',
  },
  // CARTAS 4–20: preencher seguindo o mesmo padrão
  // Sugestões de locais: Supermercado, Biblioteca, Parque, Hospital, Banco,
  // Restaurante, Cinema, Farmácia, Praça, Museu, Estádio, Aeroporto,
  // Mercado, Posto de Gasolina, Zoológico, Piscina, Teatro
];
```

---

## PASSO 5 — Roteamento

**`src/App.tsx`:**

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CardPage from './pages/CardPage';
import './styles/globals.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/carta/:id" element={<CardPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

> **Nota sobre QR Codes:** cada QR code do tabuleiro aponta para `https://seu-dominio.com/carta/1`, `/carta/2`, etc.

---

## PASSO 6 — Componentes UI

### 6.1 LibrasPlayer

Componente que exibe um botão "Assistir em Libras" que abre um modal com o vídeo mp4.

**`src/components/ui/LibrasPlayer.tsx`:**

```tsx
import { useState } from 'react';

interface LibrasPlayerProps {
  src: string;
  label?: string;
}

/**
 * Exibe botão de Libras que abre modal com vídeo mp4.
 */
export default function LibrasPlayer({ src, label = 'Assistir em Libras' }: LibrasPlayerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={label}
        className="libras-btn"
      >
        {/* Ícone de mão em Libras */}
        🤟 {label}
      </button>

      {open && (
        <div
          className="libras-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Vídeo em Libras"
          onClick={() => setOpen(false)}
        >
          <div
            className="libras-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="libras-modal-close"
              onClick={() => setOpen(false)}
              aria-label="Fechar vídeo"
            >
              ✕
            </button>
            <video
              src={src}
              controls
              autoPlay
              playsInline
              style={{ width: '100%', borderRadius: '12px' }}
            >
              Seu navegador não suporta vídeos HTML5.
            </video>
          </div>
        </div>
      )}
    </>
  );
}
```

### 6.2 MathSymbols (decorativo)

Símbolos flutuantes `+  −  ×  ÷  △  □` posicionados absolutamente no fundo das seções.

```tsx
const SYMBOLS = ['+', '−', '×', '÷', '△', '□'];
const COLORS = ['#2EC4B6', '#F5A623', '#7B5EA7'];

export default function MathSymbols() {
  return (
    <div aria-hidden="true" className="math-symbols-container">
      {/* Gerar ~12 símbolos com posições, rotações e cores aleatórias via CSS inline */}
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="math-symbol"
          style={{
            left: `${(i * 8.3) % 95}%`,
            top: `${(i * 13.7) % 90}%`,
            color: COLORS[i % COLORS.length],
            fontSize: `${1 + (i % 3) * 0.4}rem`,
            opacity: 0.3 + (i % 4) * 0.1,
            transform: `rotate(${i * 15}deg)`,
          }}
        >
          {SYMBOLS[i % SYMBOLS.length]}
        </span>
      ))}
    </div>
  );
}
```

### 6.3 CardDisplay

Renderiza a carta visual no estilo do jogo (sem a lógica de resposta — apenas a carta).

```tsx
import { Card } from '../../types';

interface CardDisplayProps {
  card: Card;
  showAnswer?: boolean;
}

/**
 * Renderiza a carta no estilo visual "Cidade dos Enigmas".
 */
export default function CardDisplay({ card }: CardDisplayProps) {
  return (
    <div className="game-card" role="article">
      {/* Header com logo */}
      <div className="game-card__header">
        <img src="/logo.svg" alt="Cidade dos Enigmas" className="game-card__logo" />
      </div>

      {/* Badge de local */}
      <div className="game-card__badge" style={{ background: card.locationColor }}>
        <span className="game-card__badge-icon">{card.locationEmoji}</span>
        <span className="game-card__badge-name">{card.locationName.toUpperCase()}</span>
      </div>

      {/* Área da ilustração */}
      <div className="game-card__illustration" aria-label={card.locationIllustrationAlt}>
        {/* Placeholder visual até ter as ilustrações */}
        <div className="game-card__illustration-placeholder">
          <span style={{ fontSize: '4rem' }}>{card.locationEmoji}</span>
        </div>
      </div>

      {/* Desafio */}
      <div className="game-card__challenge">
        <div className="game-card__challenge-header">
          🔍 DESAFIO
        </div>
        <p className="game-card__challenge-text">
          {card.challengeText}
        </p>
      </div>

      {/* Footer com ícones de inclusão */}
      <div className="game-card__footer">
        <span aria-label="Inclusão e Libras">🤟</span>
        <span aria-label="Infinito">∞</span>
        <span aria-label="Comunicação e parceria">🖐️</span>
      </div>

      {/* Símbolos matemáticos decorativos nas bordas */}
      <div className="game-card__corner game-card__corner--tl">+</div>
      <div className="game-card__corner game-card__corner--tr">÷</div>
      <div className="game-card__corner game-card__corner--bl">△</div>
      <div className="game-card__corner game-card__corner--br">□</div>
    </div>
  );
}
```

### 6.4 AnswerInput

Input com validação e feedback visual.

```tsx
import { useState } from 'react';
import { Card } from '../../types';

interface AnswerInputProps {
  card: Card;
}

type FeedbackState = 'idle' | 'correct' | 'incorrect';

/**
 * Input de resposta com feedback visual para a carta-desafio.
 */
export default function AnswerInput({ card }: AnswerInputProps) {
  const [value, setValue] = useState('');
  const [feedback, setFeedback] = useState<FeedbackState>('idle');
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericValue = parseFloat(value.replace(',', '.'));
    setAttempts((prev) => prev + 1);

    if (Math.abs(numericValue - card.answer) < 0.001) {
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
      <div className="answer-feedback answer-feedback--correct" role="alert">
        <span className="answer-feedback__icon">✅</span>
        <h3>Parabéns! Você acertou!</h3>
        <p>
          A resposta é <strong>{card.answer} {card.answerUnit}</strong>.
        </p>
        <p className="answer-feedback__instruction">
          Avance 2 casas no tabuleiro!
        </p>
      </div>
    );
  }

  if (feedback === 'incorrect') {
    return (
      <div className="answer-feedback answer-feedback--incorrect" role="alert">
        <span className="answer-feedback__icon">❌</span>
        <h3>Ops! Tente novamente.</h3>
        {attempts >= 3 && (
          <p className="answer-feedback__hint">
            Dica: tente calcular {card.challengeText.split('.')[0].toLowerCase()}...
          </p>
        )}
        <button className="btn-primary" onClick={handleReset}>
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="answer-form">
      <label htmlFor="answer-input" className="answer-form__label">
        Sua resposta:
      </label>
      <div className="answer-form__row">
        <input
          id="answer-input"
          type="number"
          step="any"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`Digite em ${card.answerUnit || 'número'}...`}
          required
          className="answer-form__input"
          aria-describedby="answer-hint"
        />
        {card.answerUnit && (
          <span className="answer-form__unit">{card.answerUnit}</span>
        )}
      </div>
      <p id="answer-hint" className="answer-form__hint">
        Use ponto ou vírgula para decimais.
      </p>
      <button type="submit" className="btn-primary" disabled={!value}>
        Confirmar resposta
      </button>
    </form>
  );
}
```

---

## PASSO 7 — Seções da Landing Page

### 7.1 HeroSection

```tsx
// Fundo: logo grande centralizado, título, subtítulo, botão CTA
// Símbolos matemáticos flutuantes no fundo
// Animação de entrada suave (CSS keyframes ou Framer Motion)
```

Elementos:
- Logo "Cidade dos Enigmas" com tipografia `Baloo 2`
- Subtítulo: "Um jogo de tabuleiro cheio de enigmas matemáticos para toda a família"
- Botão CTA: "Ver as Cartas" (scroll para #cartas)
- Botão secundário: "Como Jogar" (scroll para #regras)
- `MathSymbols` no fundo

### 7.2 AboutSection

```tsx
// ID: "sobre"
// Texto descritivo do jogo
// LibrasPlayer com src="/videos/sobre.mp4"
// Ícones de features: Inclusão, Matemática, Diversão, Família
```

### 7.3 RulesSection

```tsx
// ID: "regras"
// Lista numerada de passos (GAME_INFO.rules.steps)
// LibrasPlayer com src="/videos/regras.mp4"
// Background ligeiramente diferente (var(--color-bg-light))
```

### 7.4 CardsGallery

```tsx
// ID: "cartas"
// Grid responsivo de 20 cartas miniaturizadas
// Cada carta é um <Link to={`/carta/${card.id}`}>
// Ao hover: escala + brilho amarelo
// Mostrar: número da carta, localização, dificuldade
```

Grid CSS sugerido:
```css
.cards-gallery__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
}
```

---

## PASSO 8 — Página da Carta

**`src/pages/CardPage.tsx`:**

```tsx
import { useParams, Link } from 'react-router-dom';
import { CARDS } from '../data/cards';
import CardDisplay from '../components/ui/CardDisplay';
import AnswerInput from '../components/ui/AnswerInput';
import LibrasPlayer from '../components/ui/LibrasPlayer';
import MathSymbols from '../components/ui/MathSymbols';

/**
 * Página individual da carta com desafio interativo.
 * Rota: /carta/:id
 */
export default function CardPage() {
  const { id } = useParams<{ id: string }>();
  const card = CARDS.find((c) => c.id === Number(id));

  if (!card) {
    return (
      <div className="card-page card-page--not-found">
        <h1>Carta não encontrada</h1>
        <Link to="/" className="btn-primary">Voltar ao início</Link>
      </div>
    );
  }

  return (
    <main className="card-page">
      <MathSymbols />

      <div className="card-page__container">
        {/* Navegação */}
        <Link to="/" className="card-page__back" aria-label="Voltar para o início">
          ← Voltar
        </Link>

        <div className="card-page__layout">
          {/* Coluna esquerda: carta visual */}
          <div className="card-page__card-col">
            <CardDisplay card={card} />
            <LibrasPlayer
              src={card.librasVideoSrc}
              label="Ver desafio em Libras"
            />
          </div>

          {/* Coluna direita: input de resposta */}
          <div className="card-page__answer-col">
            <div className="card-page__card-number">
              Carta #{String(card.id).padStart(2, '0')}
            </div>
            <h1 className="card-page__location">
              {card.locationEmoji} {card.locationName}
            </h1>

            <div className="card-page__challenge-block">
              <h2>Desafio</h2>
              <p>{card.challengeText}</p>
            </div>

            <AnswerInput card={card} />
          </div>
        </div>
      </div>
    </main>
  );
}
```

Layout responsivo:
- **Mobile:** coluna única (carta → resposta)
- **Desktop (≥768px):** duas colunas lado a lado

---

## PASSO 9 — Responsividade

Breakpoints CSS:

```css
/* Mobile first */
.card-page__layout {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

@media (min-width: 768px) {
  .card-page__layout {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }
}

/* Cards gallery */
.cards-gallery__grid {
  grid-template-columns: repeat(2, 1fr); /* mobile */
}

@media (min-width: 480px) {
  .cards-gallery__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 768px) {
  .cards-gallery__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1024px) {
  .cards-gallery__grid {
    grid-template-columns: repeat(5, 1fr);
  }
}
```

---

## PASSO 10 — Acessibilidade

- Todos os botões e links com `aria-label` descritivo
- Modais com `role="dialog"` e `aria-modal="true"`
- Fechar modal com `Escape` (adicionar `useEffect` com `keydown` listener)
- Contraste mínimo 4.5:1 (amarelo `#F5A623` sobre `#0A1628` ✓)
- `prefers-reduced-motion`: desabilitar animações CSS
- Vídeos com `<track>` de legendas se disponíveis

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## PASSO 11 — Deploy (Vercel ou GitHub Pages)

**Vercel (recomendado):**
```bash
npm i -g vercel
vercel --prod
```

**GitHub Pages com Vite:**
```ts
// vite.config.ts
export default defineConfig({
  base: '/cidade-dos-enigmas/', // nome do repo
  // ...
});
```

```bash
npm run build
# usar gh-pages ou GitHub Actions para publicar /dist
```

---

## Checklist de Entrega

- [ ] Projeto criado com Vite + React + TypeScript
- [ ] Roteamento `/` e `/carta/:id` funcionando
- [ ] Todas as 20 cartas cadastradas em `cards.ts`
- [ ] `CardDisplay` fiel ao design do jogo (bordas amarelas, fundo azul marinho, labirinto)
- [ ] `AnswerInput` com feedback correto/incorreto
- [ ] `LibrasPlayer` abrindo modal com vídeo mp4 para todas as cartas
- [ ] Vídeos sobre.mp4 e regras.mp4 nas seções correspondentes
- [ ] Landing page com seções: Hero, Sobre, Regras, Cartas (gallery)
- [ ] Responsivo em mobile, tablet e desktop
- [ ] Acessibilidade: aria-labels, contraste adequado, reduced-motion
- [ ] QR Codes apontando para o URL correto de cada carta

---

## Prompt para Iniciar a Implementação com Claude

Copie e envie para o Claude Code com o projeto aberto:

```
Crie um projeto React + Vite + TypeScript chamado "cidade-dos-enigmas" seguindo este guia de implementação. Comece pelo setup do projeto (Passo 1), o design system CSS (Passo 2), os tipos TypeScript (Passo 3) e os dados das 20 cartas (Passo 4 — crie todos os 20 enigmas matemáticos com locais variados da cidade). Depois implemente os componentes na ordem dos Passos 5–8. O design deve seguir a identidade visual: fundo azul marinho #0A1628, accent amarelo #F5A623, teal #2EC4B6, roxo #7B5EA7, fonte Baloo 2 + Nunito. Padrão de labirinto no fundo. Cartas no estilo UNO com bordas amarelas e bordas arredondadas.
```
