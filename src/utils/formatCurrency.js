export const formatCurrency = (amount, currency = "NPR") => {
    return new Intl.NumberFormat("en-NP", {
        style: "currency",
        currency,
    }).format(amount);
};
