export const capitalizeFirstLetter = (value?: string): string =>
  value ? value.charAt(0).toLocaleUpperCase() + value.slice(1) : '';

export const formatPersonName = (value?: string): string =>
  value
    ?.trim()
    .split(/\s+/)
    .map(capitalizeFirstLetter)
    .join(' ') ?? '';
