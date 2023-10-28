export function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function shortenWords(words: string) {
  const shortenedWords = words.split(".")[0] + ". ";
  return shortenedWords;
}

export function formatUsername(words: string | undefined) {
  const formattedWords = words?.split("@")[0];
  return formattedWords;
}
