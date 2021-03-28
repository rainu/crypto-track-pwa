export default {
  fiat: {
    EUR: {
      label: "Euro",
      factor: 1E-2,
      format: {
        numeral: "0,0.[00]"
      },
      crawler: {
        forexsb: {
          from: 'EUR',
          to: 'USD'
        },
        finnhub: {
          symbol: "OANDA:EUR_USD"
        }
      }
    },
    USD: {
      label: "US Dollar",
      factor: 1E-2,
      format: {
        numeral: "0,0.[00]"
      }
    }
  },
  crypto: {
    BTC: {
      label: "Bitcoin",
      factor: 1E-8,
      format: {
        numeral: "0,0.[00000000]"
      },
      crawler: {
        coinmarketcap: {
          id: 1,
          slug: "bitcoin"
        }
      }
    },
    ETH: {
      label: "Ethereum",
      factor: 1E-18,
      format: {
        numeral: "0,0.[000000000000000000]"
      },
      crawler: {
        coinmarketcap: {
          id: 1027,
          slug: "ethereum"
        }
      }
    },
    BCH: {
      label: "BitcoinCash",
      factor: 1E-8,
      format: {
        numeral: "0,0.[00000000]"
      },
      crawler: {
        coinmarketcap: {
          id: 1831,
          slug: "bitcoin-cash"
        }
      }
    },
    OMG: {
      label: "OmiseGO",
      factor: 1E-18,
      format: {
        numeral: "0,0.[000000000000000000]"
      },
      crawler: {
        coinmarketcap: {
          id: 1808,
          slug: "omg"
        }
      }
    },
    VIU: {
      label: "Viuly",
      factor: 1E-18,
      format: {
        numeral: "0,0.[000000000000000000]"
      },
      crawler: {
        coinmarketcap: {
          id: 2198,
          slug: "viuly"
        }
      }
    },
    PAY: {
      label: "TenX",
      factor: 1E-18,
      format: {
        numeral: "0,0.[000000000000000000]"
      },
      crawler: {
        coinmarketcap: {
          id: 1758,
          slug: "tenx"
        }
      }
    },
    XMR: {
      label: "Monero",
      factor: 1E-12,
      format: {
        numeral: "0,0.[000000000000]"
      },
      crawler: {
        coinmarketcap: {
          id: 328,
          slug: "monero"
        }
      }
    }
  }
}
