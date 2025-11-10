// Browser speech recognition utilities
export const isSpeechRecognitionSupported = (): boolean => {
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
};

export const getSpeechRecognition = () => {
  if ('SpeechRecognition' in window) {
    return new (window as any).SpeechRecognition();
  } else if ('webkitSpeechRecognition' in window) {
    return new (window as any).webkitSpeechRecognition();
  }
  return null;
};

export const isSpeechSynthesisSupported = (): boolean => {
  return 'speechSynthesis' in window;
};

// Calculate pronunciation accuracy
export const calculateAccuracy = (spoken: string, expected: string): number => {
  const spokenWords = spoken.toLowerCase().trim().split(/\s+/);
  const expectedWords = expected.toLowerCase().trim().split(/\s+/);
  
  if (expectedWords.length === 0) return 0;
  
  let matchCount = 0;
  const maxLength = Math.max(spokenWords.length, expectedWords.length);
  
  // Simple word-by-word comparison
  for (let i = 0; i < Math.min(spokenWords.length, expectedWords.length); i++) {
    if (spokenWords[i] === expectedWords[i]) {
      matchCount++;
    } else {
      // Check for partial matches (similar words)
      const similarity = calculateSimilarity(spokenWords[i], expectedWords[i]);
      if (similarity > 0.7) {
        matchCount += similarity;
      }
    }
  }
  
  return Math.round((matchCount / expectedWords.length) * 100);
};

// Calculate string similarity (Levenshtein distance based)
const calculateSimilarity = (str1: string, str2: string): number => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
};

// Levenshtein distance algorithm
const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix: number[][] = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
};

export interface FeedbackResult {
  accuracy: number;
  message: string;
  emoji: string;
  color: string;
  incorrectWords: string[];
  correctWords: string[];
}

export const generateFeedback = (spoken: string, expected: string): FeedbackResult => {
  const accuracy = calculateAccuracy(spoken, expected);
  const spokenWords = spoken.toLowerCase().trim().split(/\s+/);
  const expectedWords = expected.toLowerCase().trim().split(/\s+/);
  
  const incorrectWords: string[] = [];
  const correctWords: string[] = [];
  
  expectedWords.forEach((word, index) => {
    if (spokenWords[index] === word) {
      correctWords.push(word);
    } else {
      incorrectWords.push(word);
    }
  });
  
  if (accuracy >= 90) {
    return {
      accuracy,
      message: "Excellent pronunciation! You said it perfectly! 🌟",
      emoji: "🌟",
      color: "success",
      incorrectWords,
      correctWords,
    };
  } else if (accuracy >= 75) {
    return {
      accuracy,
      message: `Very good! ${incorrectWords.length > 0 ? `Just practice ${incorrectWords.slice(0, 3).join(', ')} a bit more.` : ''} 👍`,
      emoji: "👍",
      color: "info",
      incorrectWords,
      correctWords,
    };
  } else if (accuracy >= 60) {
    return {
      accuracy,
      message: `Good try! Focus on pronouncing ${incorrectWords.slice(0, 3).join(', ')} more clearly. 💪`,
      emoji: "💪",
      color: "warning",
      incorrectWords,
      correctWords,
    };
  } else {
    return {
      accuracy,
      message: "Let's try again! Listen carefully and repeat. 🔄",
      emoji: "🔄",
      color: "destructive",
      incorrectWords,
      correctWords,
    };
  }
};
