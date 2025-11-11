export const fetchCoinPrice = async (coin) => {
  const url = `${import.meta.env.VITE_BINANCE_API}?symbol=${coin.toUpperCase()}USDT`;
  console.log("Fetching URL:", url);

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed for ${coin}:`, res.status);
      return 0;
    }

    const data = await res.json();
    return parseFloat(data.price) || 0;
  } catch (error) {
    console.error(`Error fetching price for ${coin}:`, error);
    return 0;
  }
};
