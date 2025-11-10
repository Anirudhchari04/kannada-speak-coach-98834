export interface DialogueLine {
  character: "A" | "B";
  english: string;
  kannada: string;
}

export interface Dialogue {
  id: string;
  title: string;
  titleKannada: string;
  category: string;
  lines: DialogueLine[];
}

export const dialogues: Dialogue[] = [
  {
    id: "intro-friend-school",
    title: "Introducing a Friend at School",
    titleKannada: "ಶಾಲೆಯಲ್ಲಿ ಸ್ನೇಹಿತನನ್ನು ಪರಿಚಯಿಸುವುದು",
    category: "School & Friends",
    lines: [
      { character: "A", english: "Hi! This is my friend Ravi.", kannada: "ಹಾಯ್! ಇದು ನನ್ನ ಸ್ನೇಹಿತ ರವಿ." },
      { character: "B", english: "Nice to meet you, Ravi!", kannada: "ನಿನ್ನನ್ನು ಭೇಟಿಯಾಗಿ ಸಂತೋಷವಾಯಿತು, ರವಿ!" },
      { character: "A", english: "Ravi is new to our school.", kannada: "ರವಿ ನಮ್ಮ ಶಾಲೆಗೆ ಹೊಸಬನಾಗಿ ಬಂದಿದ್ದಾನೆ." },
      { character: "B", english: "Welcome! Which class are you in?", kannada: "ಸ್ವಾಗತ! ನೀನು ಯಾವ ತರಗತಿಯಲ್ಲಿದ್ದೀಯ?" },
      { character: "A", english: "He's in my class, 5th standard.", kannada: "ಅವನು ನನ್ನ ತರಗತಿಯಲ್ಲಿದ್ದಾನೆ, 5ನೇ ತರಗತಿ." },
      { character: "B", english: "That's great! Do you like it here?", kannada: "ಅದು ಚೆನ್ನಾಗಿದೆ! ನಿನಗೆ ಇಲ್ಲಿ ಇಷ್ಟವಾಯಿತು?" },
      { character: "A", english: "Yes, everyone is very friendly.", kannada: "ಹೌದು, ಎಲ್ಲರೂ ತುಂಬಾ ಸ್ನೇಹಪರರಾಗಿದ್ದಾರೆ." },
      { character: "B", english: "Would you like to play with us?", kannada: "ನೀನು ನಮ್ಮೊಂದಿಗೆ ಆಡಲು ಇಷ್ಟಪಡುತ್ತೀಯಾ?" },
      { character: "A", english: "Sure! Let's play together.", kannada: "ಖಂಡಿತ! ಒಟ್ಟಿಗೆ ಆಡೋಣ." },
    ],
  },
  {
    id: "intro-friend-teacher",
    title: "Introducing a Friend to a Teacher",
    titleKannada: "ಶಿಕ್ಷಕರಿಗೆ ಸ್ನೇಹಿತನನ್ನು ಪರಿಚಯಿಸುವುದು",
    category: "School & Friends",
    lines: [
      { character: "A", english: "Good morning, teacher!", kannada: "ಶುಭೋದಯ, ಶಿಕ್ಷಕರೇ!" },
      { character: "B", english: "Good morning! Who is this?", kannada: "ಶುಭೋದಯ! ಇದು ಯಾರು?" },
      { character: "A", english: "This is my friend Maya.", kannada: "ಇದು ನನ್ನ ಸ್ನೇಹಿತೆ ಮಾಯಾ." },
      { character: "B", english: "Nice to meet you, Maya.", kannada: "ನಿನ್ನನ್ನು ಭೇಟಿಯಾಗಿ ಸಂತೋಷವಾಯಿತು, ಮಾಯಾ." },
      { character: "A", english: "She is also in 5th standard.", kannada: "ಅವಳು ಕೂಡ 5ನೇ ತರಗತಿಯಲ್ಲಿದ್ದಾಳೆ." },
      { character: "B", english: "Welcome to our school, Maya!", kannada: "ನಮ್ಮ ಶಾಲೆಗೆ ಸ್ವಾಗತ, ಮಾಯಾ!" },
      { character: "A", english: "Thank you, teacher!", kannada: "ಧನ್ಯವಾದಗಳು, ಶಿಕ್ಷಕರೇ!" },
    ],
  },
  {
    id: "family-friends",
    title: "Talking about Family and Friends",
    titleKannada: "ಕುಟುಂಬ ಮತ್ತು ಸ್ನೇಹಿತರ ಬಗ್ಗೆ ಮಾತನಾಡುವುದು",
    category: "School & Friends",
    lines: [
      { character: "A", english: "How many people are in your family?", kannada: "ನಿನ್ನ ಕುಟುಂಬದಲ್ಲಿ ಎಷ್ಟು ಜನರಿದ್ದಾರೆ?" },
      { character: "B", english: "There are five people in my family.", kannada: "ನನ್ನ ಕುಟುಂಬದಲ್ಲಿ ಐದು ಜನರಿದ್ದಾರೆ." },
      { character: "A", english: "Who are they?", kannada: "ಅವರು ಯಾರು?" },
      { character: "B", english: "My father, mother, brother, sister, and me.", kannada: "ನನ್ನ ತಂದೆ, ತಾಯಿ, ಸಹೋದರ, ಸಹೋದರಿ ಮತ್ತು ನಾನು." },
      { character: "A", english: "That's a nice family!", kannada: "ಅದೊಂದು ಒಳ್ಳೆಯ ಕುಟುಂಬ!" },
      { character: "B", english: "Yes. Do you have siblings?", kannada: "ಹೌದು. ನಿನಗೆ ಸಹೋದರ ಸಹೋದರಿಯರಿದ್ದಾರೆಯೇ?" },
      { character: "A", english: "Yes, I have one younger sister.", kannada: "ಹೌದು, ನನಗೆ ಒಬ್ಬ ತಂಗಿ ಇದ್ದಾಳೆ." },
      { character: "B", english: "How old is she?", kannada: "ಅವಳು ಎಷ್ಟು ವಯಸ್ಸಿನವಳು?" },
      { character: "A", english: "She is 8 years old.", kannada: "ಅವಳಿಗೆ 8 ವರ್ಷ." },
    ],
  },
  {
    id: "vegetable-shop",
    title: "At the Vegetable Shop",
    titleKannada: "ತರಕಾರಿ ಅಂಗಡಿಯಲ್ಲಿ",
    category: "Daily Life",
    lines: [
      { character: "A", english: "Hello! What vegetables do you have today?", kannada: "ನಮಸ್ಕಾರ! ಇಂದು ಯಾವ ತರಕಾರಿಗಳಿವೆ?" },
      { character: "B", english: "We have tomatoes, potatoes, and onions.", kannada: "ನಮ್ಮಲ್ಲಿ ಟೊಮೇಟೊ, ಆಲೂಗಡ್ಡೆ ಮತ್ತು ಈರುಳ್ಳಿಗಳಿವೆ." },
      { character: "A", english: "How much is one kilo of tomatoes?", kannada: "ಒಂದು ಕಿಲೋ ಟೊಮೇಟೊ ಎಷ್ಟು?" },
      { character: "B", english: "It's 30 rupees per kilo.", kannada: "ಒಂದು ಕಿಲೋಗೆ 30 ರೂಪಾಯಿ." },
      { character: "A", english: "Give me two kilos of tomatoes.", kannada: "ನನಗೆ ಎರಡು ಕಿಲೋ ಟೊಮೇಟೊ ಕೊಡಿ." },
      { character: "B", english: "Anything else?", kannada: "ಬೇರೆ ಏನಾದರೂ?" },
      { character: "A", english: "Yes, one kilo of potatoes too.", kannada: "ಹೌದು, ಒಂದು ಕಿಲೋ ಆಲೂಗಡ್ಡೆ ಕೂಡ." },
      { character: "B", english: "That will be 90 rupees.", kannada: "ಒಟ್ಟು 90 ರೂಪಾಯಿ ಆಯಿತು." },
      { character: "A", english: "Here you go. Thank you!", kannada: "ತೆಗೆದುಕೊಳ್ಳಿ. ಧನ್ಯವಾದಗಳು!" },
    ],
  },
  {
    id: "daily-routine",
    title: "Daily Routine",
    titleKannada: "ದೈನಂದಿನ ದಿನಚರಿ",
    category: "Daily Life",
    lines: [
      { character: "A", english: "What time do you wake up?", kannada: "ನೀನು ಎಷ್ಟು ಗಂಟೆಗೆ ಎದ್ದೇಳುತ್ತೀಯ?" },
      { character: "B", english: "I wake up at 6 o'clock.", kannada: "ನಾನು 6 ಗಂಟೆಗೆ ಎದ್ದೇಳುತ್ತೇನೆ." },
      { character: "A", english: "What do you do in the morning?", kannada: "ನೀನು ಬೆಳಿಗ್ಗೆ ಏನು ಮಾಡುತ್ತೀಯ?" },
      { character: "B", english: "I brush my teeth and take a bath.", kannada: "ನಾನು ಹಲ್ಲು ತೊಳೆದು ಸ್ನಾನ ಮಾಡುತ್ತೇನೆ." },
      { character: "A", english: "When do you go to school?", kannada: "ನೀನು ಯಾವಾಗ ಶಾಲೆಗೆ ಹೋಗುತ್ತೀಯ?" },
      { character: "B", english: "I go to school at 8 o'clock.", kannada: "ನಾನು 8 ಗಂಟೆಗೆ ಶಾಲೆಗೆ ಹೋಗುತ್ತೇನೆ." },
      { character: "A", english: "What time do you come back?", kannada: "ನೀನು ಎಷ್ಟು ಗಂಟೆಗೆ ಹಿಂತಿರುಗುತ್ತೀಯ?" },
      { character: "B", english: "I come back at 4 o'clock.", kannada: "ನಾನು 4 ಗಂಟೆಗೆ ಹಿಂತಿರುಗುತ್ತೇನೆ." },
    ],
  },
  {
    id: "shopping-clothes",
    title: "Shopping for Clothes",
    titleKannada: "ಬಟ್ಟೆಗಳನ್ನು ಖರೀದಿಸುವುದು",
    category: "Practical Skills",
    lines: [
      { character: "A", english: "Welcome! How can I help you?", kannada: "ಸ್ವಾಗತ! ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?" },
      { character: "B", english: "I want to buy a shirt.", kannada: "ನನಗೆ ಒಂದು ಶರ್ಟ್ ಖರೀದಿಸಬೇಕು." },
      { character: "A", english: "What color do you want?", kannada: "ನಿಮಗೆ ಯಾವ ಬಣ್ಣ ಬೇಕು?" },
      { character: "B", english: "I want a blue shirt.", kannada: "ನನಗೆ ನೀಲಿ ಶರ್ಟ್ ಬೇಕು." },
      { character: "A", english: "What size do you need?", kannada: "ನಿಮಗೆ ಯಾವ ಸೈಜ್ ಬೇಕು?" },
      { character: "B", english: "I need medium size.", kannada: "ನನಗೆ ಮಧ್ಯಮ ಸೈಜ್ ಬೇಕು." },
      { character: "A", english: "Here is a nice blue shirt.", kannada: "ಇಲ್ಲಿ ಒಂದು ಒಳ್ಳೆಯ ನೀಲಿ ಶರ್ಟ್ ಇದೆ." },
      { character: "B", english: "How much does it cost?", kannada: "ಇದು ಎಷ್ಟು?" },
      { character: "A", english: "It costs 500 rupees.", kannada: "ಇದು 500 ರೂಪಾಯಿ." },
      { character: "B", english: "Can I try it on?", kannada: "ನಾನು ಇದನ್ನು ಧರಿಸಿ ನೋಡಬಹುದೇ?" },
      { character: "A", english: "Sure! The trial room is there.", kannada: "ಖಂಡಿತ! ಟ್ರಯಲ್ ರೂಮ್ ಅಲ್ಲಿದೆ." },
    ],
  },
  {
    id: "objects-in-bag",
    title: "Asking About Objects in the Bag",
    titleKannada: "ಚೀಲದಲ್ಲಿರುವ ವಸ್ತುಗಳ ಬಗ್ಗೆ ಕೇಳುವುದು",
    category: "Practical Skills",
    lines: [
      { character: "A", english: "What do you have in your bag?", kannada: "ನಿನ್ನ ಚೀಲದಲ್ಲಿ ಏನಿದೆ?" },
      { character: "B", english: "I have books and a pencil box.", kannada: "ನನ್ನಲ್ಲಿ ಪುಸ್ತಕಗಳು ಮತ್ತು ಪೆನ್ಸಿಲ್ ಪೆಟ್ಟಿಗೆ ಇವೆ." },
      { character: "A", english: "How many books do you have?", kannada: "ನಿನ್ನಲ್ಲಿ ಎಷ್ಟು ಪುಸ್ತಕಗಳಿವೆ?" },
      { character: "B", english: "I have four books.", kannada: "ನನ್ನಲ್ಲಿ ನಾಲ್ಕು ಪುಸ್ತಕಗಳಿವೆ." },
      { character: "A", english: "Do you have a water bottle?", kannada: "ನಿನ್ನಲ್ಲಿ ನೀರಿನ ಬಾಟಲಿ ಇದೆಯೇ?" },
      { character: "B", english: "Yes, I have a water bottle.", kannada: "ಹೌದು, ನನ್ನಲ್ಲಿ ನೀರಿನ ಬಾಟಲಿ ಇದೆ." },
      { character: "A", english: "Can I see your pencil box?", kannada: "ನಾನು ನಿನ್ನ ಪೆನ್ಸಿಲ್ ಪೆಟ್ಟಿಗೆಯನ್ನು ನೋಡಬಹುದೇ?" },
      { character: "B", english: "Sure! Here it is.", kannada: "ಖಂಡಿತ! ಇಲ್ಲಿದೆ." },
    ],
  },
];

export const categories = [
  { id: "school-friends", name: "School & Friends", emoji: "🎓" },
  { id: "daily-life", name: "Daily Life", emoji: "🏠" },
  { id: "practical-skills", name: "Practical Skills", emoji: "💼" },
];
