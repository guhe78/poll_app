export function timeLeft(date: string): string {
  const today = new Date();
  const target = new Date(date);
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const leftInMS = target.getTime() - today.getTime();
  const leftInDays = Math.ceil(leftInMS / (1000 * 60 * 60 * 24));

  if (leftInDays < 1 && leftInDays > -1) {
    const leftInHours = Math.ceil(leftInMS / (1000 * 60 * 60));

    return 'Ends in ' + leftInHours + ' hours';
  } else {
    return 'Ends in ' + leftInDays + ' days';
  }
}

export function getAnswerLetter(index: number): string {
  return String.fromCharCode(65 + index);
}
