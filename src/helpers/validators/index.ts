export const sameAge = (compareToValue: string) => (value: string) =>
  compareToValue !== value ? "Password doesn't match." : undefined;
