const axios = require('axios');

// Lekérjük az Ethereum árfolyamát USD-ben a CoinGecko API-ról
async function getEthPriceUSD() {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
    );
    return response.data.ethereum.usd; // pl. 1900.45
  } catch (error) {
    console.error('Error fetching ETH price:', error);
    throw error;
  }
}

// USD → ETH átváltás
async function usdToEth(usdAmount) {
  const ethPrice = await getEthPriceUSD();
  return usdAmount / ethPrice;
}

module.exports = { getEthPriceUSD, usdToEth };
