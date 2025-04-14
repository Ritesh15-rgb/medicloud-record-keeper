
# MediVault - Medical Records & Receipt Organizer

MediVault is a secure platform for storing, organizing, and accessing medical records and receipts. This application allows users to keep track of their healthcare documents in one convenient location.

## Features

- **Secure Authentication**: User authentication powered by Clerk
- **Dashboard**: View all your medical records in one place
- **Upload System**: Easily add new medical records with detailed information
- **Search & Filter**: Find specific records quickly with powerful search and filtering
- **Record Management**: View, edit, download, and share your medical records
- **User Profiles**: Store emergency contact information and personal details
- **Responsive Design**: Seamless experience across desktop and mobile devices

## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn-ui components
- **Authentication**: Clerk
- **Routing**: React Router
- **State Management**: React Query
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm, yarn, or pnpm

### Installation

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`

### Authentication Setup

To enable authentication with Clerk:

1. Sign up for a Clerk account at [clerk.dev](https://clerk.dev)
2. Get your publishable key from the Clerk dashboard
3. Replace the placeholder in `src/components/auth/ClerkProviderWithRoutes.tsx` with your key

## Project Structure

- `/src/components` - Reusable UI components
- `/src/pages` - Main application pages
- `/src/providers` - Context providers
- `/src/hooks` - Custom React hooks
- `/src/lib` - Utility functions

## License

This project is licensed under the MIT License.
