export default function shortenWords(words: string) {
  const shortenedWords = words.split(".")[0] + ". ";
  return shortenedWords;
}
