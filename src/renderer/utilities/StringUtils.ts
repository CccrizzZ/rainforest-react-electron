function capitalizeString(word: string): string {
  if (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  return word;
}

export default capitalizeString;
