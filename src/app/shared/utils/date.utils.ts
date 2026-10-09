export function timeLeft(date: string): string {
  const today = new Date();
  const target = new Date(date);
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const leftInMS = target.getTime() - today.getTime();
  const leftInDays = Math.ceil(leftInMS / (1000 * 60 * 60 * 24));

  if (leftInDays < 1 && leftInDays > -1) {
    return 'Ends today';
  } else if (leftInDays < 0 && leftInDays > -2) {
    return 'Ended ' + leftInDays * -1 + ' day ago';
  } else if (leftInDays < -1) {
    return 'Ended ' + leftInDays * -1 + ' days ago';
  } else {
    return 'Ends in ' + leftInDays + ' days';
  }
}

export function getAnswerLetter(index: number): string {
  return String.fromCharCode(65 + index);
}
