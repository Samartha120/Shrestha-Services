export const formatCurrency = (
  amount: number,
  currency = "NPR"
) => {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency,
  }).format(amount);
};