import currency from 'currency.js';

const NumberFormat = ({number}) => {
  return currency(number, {symbol: 'Rp '}).format();
};

export default NumberFormat;
