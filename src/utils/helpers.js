export const truncateText = (text, length = 100) => {
    if (text.length <= length)
        return text;
    return `${text.substring(0, length)}...`;
};
export const capitalize = (value) => value.charAt(0).toUpperCase() +
    value.slice(1);
