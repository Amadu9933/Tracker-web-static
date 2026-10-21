export const capitalizeFirstLetter = (value?: string): string =>
  value ? value.charAt(0).toLocaleUpperCase() + value.slice(1) : '';

export const formatPersonName = (value?: string): string =>
  value
    ?.trim()
    .split(/\s+/)
    .map(capitalizeFirstLetter)
    .join(' ') ?? '';

export const formatJoinedDate = (
  ...values: Array<string | undefined>
): string => {
  for (const value of values) {
    if (!value?.trim()) continue;

    const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
    const date = dateOnly
      ? new Date(
          Number(dateOnly[1]),
          Number(dateOnly[2]) - 1,
          Number(dateOnly[3])
        )
      : new Date(value.trim());

    if (
      !Number.isNaN(date.getTime()) &&
      (!dateOnly ||
        (date.getFullYear() === Number(dateOnly[1]) &&
          date.getMonth() + 1 === Number(dateOnly[2]) &&
          date.getDate() === Number(dateOnly[3])))
    ) {
      return date.toLocaleDateString();
    }
  }

  return '\u2014';
};
