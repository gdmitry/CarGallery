const numberLocale = new Intl.NumberFormat('da-DK');
export const formatCurrency = (value: number) => `${numberLocale.format(value)} kr.`;