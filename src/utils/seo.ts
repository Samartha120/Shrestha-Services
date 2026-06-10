export const buildMetaTitle = (
  title: string
) => {
  return `${title} | Shrestha Services`;
};

export const buildMetaDescription = (
  description: string
) => {
  return description.substring(0, 160);
};