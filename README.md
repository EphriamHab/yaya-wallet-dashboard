# YaYa Wallet Transaction Dashboard

A full-stack application for monitoring YaYa Wallet transactions with search, pagination, and responsive design.

## Architecture

### Backend (Express + TypeScript)

- **Security**: API credentials are stored securely on the backend and never exposed to the frontend
- **Proxy Pattern**: Backend acts as a proxy to the YaYa Wallet API to maintain security
- **Rate Limiting**: Prevents API abuse with express-rate-limit
- **CORS Protection**: Only allows requests from the frontend domain
- **Error Handling**: Comprehensive error handling and logging
- **Mock Data Fallback**: If the YaYa Sandbox API is slow or unresponsive, the backend automatically falls back to mock transaction data

### Frontend (React + Vite + TypeScript + RTK Query)

- **State Management**: RTK Query for efficient API state management and caching
- **Responsive Design**: TailwindCSS for mobile-first responsive design
- **TypeScript**: Full type safety throughout the application
- **Performance**: Vite for fast development and optimized builds

## Features

✅ **Pagination**: Navigate through transactions using page numbers  
✅ **Search**: Search by sender, receiver, cause, or transaction ID  
✅ **Transaction Type Indicators**: Visual indicators for incoming/outgoing transactions  
✅ **Responsive Design**: Adapts to different screen sizes  
✅ **Security**: API credentials protected on backend  
✅ **Error Handling**: User-friendly error messages  
✅ **Loading States**: Smooth loading indicators  
✅ **Mock Data Fallback**: Ensures transactions display even if sandbox API is unavailable

## Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd yaya-wallet-dashboard
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend will run on `http://localhost:3001`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## Testing the Application

### Manual Testing Steps

1. **Basic Functionality**:

   - Visit `http://localhost:5173`
   - Verify transactions load on the initial page
   - Check that incoming/outgoing indicators work correctly

2. **Pagination**:

   - Navigate between pages using pagination controls
   - Verify URL updates with page parameter
   - Test edge cases (first page, last page)

3. **Search Functionality**:

   - Search for transactions by:
   - Transaction ID
   - Sender name
   - Receiver name
   - Cause/description
   - Verify search results are accurate
   - Test clearing search results

4. **Responsive Design**:
   - Test on mobile devices (< 640px)
   - Test on tablets (640px - 1024px)
   - Test on desktop (> 1024px)
   - Verify table remains readable on all screen sizes
5. **Error Handling**:
   - Test with network disconnected
   - Test with invalid search queries
   - Verify error messages are user-friendly

## Security Considerations

### API Credentials Protection

- Credentials stored in backend environment variables only
- Frontend never has access to raw API credentials
- Backend acts as secure proxy to YaYa Wallet API ### Additional Security Measures
- CORS protection limiting frontend domain access
- Rate limiting to prevent API abuse
- Helmet.js for security headers
- Input validation on all endpoints
- No sensitive data logged in production

## Problem-Solving Approach

### 1. Architecture Decisions **Problem**:

How to securely handle API credentials? **Solution**: Implemented backend proxy pattern to keep credentials secure while providing clean API for frontend.

### 2. State Management **Problem**:

Managing complex async state for search + pagination. **Solution**: RTK Query provides excellent caching, loading states, and error handling out of the box.

### 3. Responsive Design **Problem**:

Transaction tables with many columns on mobile devices. **Solution**: Used TailwindCSS responsive utilities and horizontal scrolling for mobile devices.

### 4. User Experience **Problem**:

Distinguishing between incoming and outgoing transactions. **Solution**: Color-coded borders, icons, and amount prefixes (+/-) for clear visual distinction.

## Assumptions Made

1.  **User Authentication**: Assumed current user identification for transaction type determination
2.  **API Response Format**: Assumed standard pagination format from YaYa Wallet API
3.  **Transaction Types**: Top-up transactions (same sender/receiver) treated as incoming
4.  **Error Handling**: Assumed network errors are most common, provided retry mechanisms
5.  **Browser Support**: Targeted modern browsers with ES6+ support

## API Endpoints Used

- GET /api/transactions?p={page}
- Get paginated transactions
- POST /api/transactions/search - Search transactions

## Environment Variables

### Backend (.env)
