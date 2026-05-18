export interface Card {
  id: number;
  locationName: string;
  locationEmoji: string;
  locationColor: string;
  locationIllustrationAlt: string;
  challengeText: string;
  highlightedTerms: string[];
  answer: number;
  answerUnit?: string;
  librasVideoSrc: string;
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
