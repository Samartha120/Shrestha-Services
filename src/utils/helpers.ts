export const truncateText = (
  text: string,
  length = 100
): string => {
  if (text.length <= length) return text;
  return `${text.substring(0, length)}...`;
};

export const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() +
  value.slice(1);