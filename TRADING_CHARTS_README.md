# Trading Charts Documentation

## Overview

This dashboard includes dynamic trading charts that read data from a JSON file. You can easily customize the data to display your own trading information.

## Chart Components

### 1. **PriceChart** - Price & Volume History

- Displays price trends with a dual Y-axis showing both price and volume
- Features smooth area gradients in Instagram theme colors
- Interactive tooltips showing detailed information

### 2. **CandlestickChart** - OHLC Chart

- Shows Open, High, Low, Close (OHLC) data
- Green candles for bullish days, red for bearish
- Perfect for technical analysis

### 3. **PortfolioChart** - Portfolio Distribution

- Pie chart showing asset allocation
- Color-coded segments with percentage labels
- Detailed asset breakdown below the chart

### 4. **StatsCards** - Portfolio Metrics

- Total portfolio value
- Daily change with percentage
- Total profit/loss

### 5. **RecentTrades** - Transaction History

- Table of recent buy/sell transactions
- Color-coded by transaction type
- Sortable and filterable

## Data Structure

The charts read from `src/data/tradingData.json`. Here's the structure:

```json
{
  "priceHistory": [
    {
      "date": "2025-01-01",
      "price": 42500,
      "volume": 1250000000,
      "high": 43200,
      "low": 41800,
      "open": 42000,
      "close": 42500
    }
  ],
  "portfolioStats": {
    "totalValue": 125000,
    "dailyChange": 3250,
    "dailyChangePercent": 2.67,
    "totalProfit": 25000,
    "totalProfitPercent": 25.0
  },
  "assets": [
    {
      "name": "Bitcoin",
      "symbol": "BTC",
      "amount": 1.5,
      "value": 93150,
      "change": 2.5
    }
  ],
  "recentTrades": [
    {
      "id": 1,
      "type": "buy",
      "asset": "BTC",
      "amount": 0.5,
      "price": 62100,
      "total": 31050,
      "date": "2025-01-20T14:30:00"
    }
  ]
}
```

## How to Customize

### Update Trading Data

1. Open `src/data/tradingData.json`
2. Modify the values according to your needs
3. The charts will automatically update

### Add More Price History

```json
{
  "date": "2025-01-21",
  "price": 65000,
  "volume": 2800000000,
  "high": 66500,
  "low": 64200,
  "open": 64500,
  "close": 65000
}
```

### Add New Assets

```json
{
  "name": "Ripple",
  "symbol": "XRP",
  "amount": 5000,
  "value": 3500,
  "change": -0.8
}
```

### Add New Trades

```json
{
  "id": 6,
  "type": "sell",
  "asset": "ETH",
  "amount": 3.0,
  "price": 2300,
  "total": 6900,
  "date": "2025-01-21T09:30:00"
}
```

## Integration with APIs

To connect to a real trading API:

1. Create an API service in `src/lib/tradingApi.js`:

```javascript
export async function fetchTradingData() {
  const response = await fetch("YOUR_API_ENDPOINT");
  return response.json();
}
```

2. Update the dashboard to use the API:

```javascript
import { useEffect, useState } from 'react';
import { fetchTradingData } from '@/lib/tradingApi';

export default function DashboardPage() {
  const [tradingData, setTradingData] = useState(null);

  useEffect(() => {
    fetchTradingData().then(setTradingData);
  }, []);

  if (!tradingData) return <div>Loading...</div>;

  return (
    // Your charts here
  );
}
```

## Styling

All charts use the Instagram-inspired gradient theme:

- Primary: `#f56040` to `#fbb040` (Orange/Pink gradient)
- Secondary: `#a855f7` (Purple)
- Success: `#10b981` (Green)
- Error: `#ef4444` (Red)

To customize colors, edit the chart components in `src/components/charts/`.

## Features

- ✅ Fully responsive design
- ✅ Dark mode support
- ✅ Smooth animations with Framer Motion
- ✅ Interactive tooltips
- ✅ Dynamic data loading from JSON
- ✅ Instagram-themed gradients
- ✅ Mobile-friendly

## Dependencies

- `recharts` - Chart library
- `framer-motion` - Animations
- `tailwindcss` - Styling

## Support

For issues or questions, refer to:

- [Recharts Documentation](https://recharts.org/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
