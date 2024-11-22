// CoinGecko API ile DOGWif için ID
const dogWifCoinGeckoId = "dogwifcoin";
const fudCoinGeckoId = "fud-the-pug";
const multiplier10M = 10_000_000; // 10 milyon
const multiplier100M = 100_000_000; // 100 milyon
const multiplier100T = 1_000_000_000_000; // 1 Trilyon
const tokenAddress = "0xdc9b462697876ff4c680e59b3756ac39a6899cfbc355a6880c60e01c8930b3cc::ronda::RONDA";

function updateRONDAPrice() {
  fetch(`https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`)
    .then((response) => response.json())
    .then((data) => {
      const pair = data.pairs.reduce((prev, current) =>
        prev.liquidity?.usd > current.liquidity?.usd ? prev : current
      );

      const price = parseFloat(pair.priceUsd);
      const marketCap = pair.fdv;

      document.getElementById("current-price").textContent = `$${price.toFixed(8)}`;
      document.getElementById("market-cap").textContent = `${formatMarketCap(marketCap)}`;
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("current-price").textContent = "LOADING...";
      document.getElementById("market-cap").textContent = "LOADING...";
    });
}

function formatMarketCap(marketCap) {
  if (marketCap >= 1e9) {
    return (marketCap / 1e9).toFixed(1) + "B";
  } else if (marketCap >= 1e6) {
    return (marketCap / 1e6).toFixed(1) + "M";
  } else if (marketCap >= 1e3) {
    return (marketCap / 1e3).toFixed(1) + "K";
  } else {
    return marketCap.toFixed(1);
  }
}

document.addEventListener("DOMContentLoaded", updateRONDAPrice);

function updateRONDADetails() {
  fetch(`https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Ronda API response:", data);

      const pair = data.pairs.reduce((prev, current) =>
        prev.liquidity?.usd > current.liquidity?.usd ? prev : current
      );

      const price = parseFloat(pair.priceUsd);
      const marketCap = parseFloat(pair.fdv);

      if (price && marketCap) {
        const totalPrice = Math.round(price * multiplier100M);
        document.getElementById("ronda-price").textContent = `$${parseFloat(totalPrice).toLocaleString()}`;

        let marketCapText;
        if (marketCap >= 1e9) {
          marketCapText = `( AT ${(marketCap / 1e9).toFixed(1)}B MCAP )`;
        } else if (marketCap >= 1e6) {
          marketCapText = `( AT ${(marketCap / 1e6).toFixed(1)}M MCAP )`;
        } else if (marketCap >= 1e3) {
          marketCapText = `( AT ${(marketCap / 1e3).toFixed(1)}K MCAP )`;
        } else {
          marketCapText = `${marketCap.toFixed(1)}`;
        }

        document.getElementById("ronda-marketcap").textContent = marketCapText;
      } else {
        document.getElementById("ronda-price").textContent = "Veri bulunamadı";
        document.getElementById("ronda-marketcap").textContent = "Veri bulunamadı";
      }
    })
    .catch((error) => {
      console.error("Error fetching Ronda details:", error);
      document.getElementById("ronda-price").textContent = "LOADING...";
      document.getElementById("ronda-marketcap").textContent = "LOADING...";
    });
}

// DOGWif fiyatını ve market cap'ini alıp gösteren fonksiyon
function updateDOGWifDetails() {
  fetch(`https://api.coingecko.com/api/v3/coins/${dogWifCoinGeckoId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("DOGWif API response:", data);

      const price = data.market_data?.current_price?.usd;
      const marketCap = data.market_data?.market_cap?.usd;

      if (price && marketCap) {
        const totalPrice = (price * multiplier10M).toFixed(1);
        document.getElementById("dogwifcoin-price").textContent = `$${parseFloat(totalPrice).toLocaleString()}`;

        let marketCapText;
        if (marketCap >= 1e9) {
          marketCapText = `( AT ${(marketCap / 1e9).toFixed(1)}B MCAP )`;
        } else if (marketCap >= 1e6) {
          marketCapText = `( AT ${(marketCap / 1e6).toFixed(1)}M MCAP )`;
        } else if (marketCap >= 1e3) {
          marketCapText = `( AT ${(marketCap / 1e3).toFixed(1)}K MCAP )`;
        } else {
          marketCapText = `${marketCap.toFixed(1)}`;
        }

        document.getElementById("dogwifcoin-marketcap").textContent = marketCapText;
      } else {
        document.getElementById("dogwifcoin-price").textContent = "Veri bulunamadı";
        document.getElementById("dogwifcoin-marketcap").textContent = "Veri bulunamadı";
      }
    })
    .catch((error) => {
      console.error("Error fetching DOGWif details:", error);
      document.getElementById("dogwifcoin-price").textContent = "LOADING...";
      document.getElementById("dogwifcoin-marketcap").textContent = "LOADING...";
    });
}

// Fud fiyatını ve market cap'ini alıp gösteren fonksiyon
function updateFudDetails() {
  fetch(`https://api.coingecko.com/api/v3/coins/${fudCoinGeckoId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Fud API response:", data);

      const price = data.market_data?.current_price?.usd;
      const marketCap = data.market_data?.market_cap?.usd;

      if (price && marketCap) {
        const totalPrice = (price * multiplier100T).toFixed(0);
        document.getElementById("fud-the-pug-price").textContent = `$${parseFloat(totalPrice).toLocaleString()}`;

        let marketCapText;
        if (marketCap >= 1e9) {
          marketCapText = `( AT ${(marketCap / 1e9).toFixed(1)}B MCAP )`;
        } else if (marketCap >= 1e6) {
          marketCapText = `( AT ${(marketCap / 1e6).toFixed(1)}M MCAP )`;
        } else if (marketCap >= 1e3) {
          marketCapText = `( AT ${(marketCap / 1e3).toFixed(1)}K MCAP )`;
        } else {
          marketCapText = `${marketCap.toFixed(1)}`;
        }

        document.getElementById("fud-the-pug-marketcap").textContent = marketCapText;
      } else {
        document.getElementById("fud-the-pug-price").textContent = "Veri bulunamadı";
        document.getElementById("fud-the-pug-marketcap").textContent = "Veri bulunamadı";
      }
    })
    .catch((error) => {
      console.error("Error fetching Fud details:", error);
      document.getElementById("fud-the-pug-price").textContent = "LOADING...";
      document.getElementById("fud-the-pug-marketcap").textContent = "LOADING...";
    });
}

// Sayfa yüklendiğinde tüm fonksiyonları çağır
document.addEventListener("DOMContentLoaded", () => {
  updateRONDAPrice();
  updateRONDADetails();
  updateFudDetails();
  updateDOGWifDetails();
});
