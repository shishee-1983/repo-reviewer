# AI-Powered Codebase Explorer & Documenter

A Next.js 14 application that allows users to explore and document codebases with AI assistance.

## Features

- 🔐 **Authentication**: Email/password authentication with NextAuth.js
- 📁 **Code Explorer**: Browse repository files with syntax highlighting
- 🤖 **AI Chat**: Ask natural language questions about your codebase
- 🗺️ **Project Map**: Visual module dependency graph
- 📋 **Pull Request Analysis**: AI-powered PR review and suggestions
- 📊 **Analytics**: Usage metrics and insights
- 🎨 **Modern UI**: Dark-mode first with neon-tech aesthetic

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Animations**: Framer Motion
- **UI Components**: Custom components with glassmorphism design

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Docker (optional, for containerized deployment)
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd repo-reviewer
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
- `DATABASE_URL`: Your PostgreSQL connection string
- `NEXTAUTH_URL`: Your application URL (http://localhost:3000 for development)
- `NEXTAUTH_SECRET`: A random secret for JWT signing
- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret

### Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create an OAuth 2.0 Client ID
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy the Client ID and Client Secret to your `.env` file

4. Set up the database:
```bash
npm run db:generate
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Docker Deployment

### Using Docker Compose (Recommended)

1. Make sure you have Docker and Docker Compose installed
2. Create a `.env` file with your environment variables
3. Run the application:

```bash
docker-compose up -d
```

This will start both the PostgreSQL database and the Next.js application.

### Using Docker Only

1. Build the Docker image:
```bash
docker build -t codebase-explorer .
```

2. Run the container:
```bash
docker run -p 3000:3000 \
  -e DATABASE_URL="your-database-url" \
  -e NEXTAUTH_URL="http://localhost:3000" \
  -e NEXTAUTH_SECRET="your-secret" \
  -e GOOGLE_CLIENT_ID="your-google-client-id" \
  -e GOOGLE_CLIENT_SECRET="your-google-client-secret" \
  codebase-explorer
```

### Production Deployment

For production deployment, make sure to:
1. Use a secure `NEXTAUTH_SECRET`
2. Set the correct `NEXTAUTH_URL` for your domain
3. Use a production PostgreSQL database
4. Configure your Google OAuth redirect URIs for your production domain

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard pages
│   └── api/               # API routes
├── components/            # Reusable UI components
│   ├── auth/             # Authentication components
│   ├── layout/           # Layout components
│   └── ui/               # Base UI components
├── lib/                  # Utility libraries
└── types/                # TypeScript type definitions
```

## Key Features

### Authentication
- Email/password registration and login
- Protected routes with middleware
- Session management with NextAuth.js

### Code Explorer
- File tree navigation
- Syntax-highlighted code viewer
- Documentation panel with AI-generated docs
- Repository import from GitHub URLs

### AI Chat Interface
- Natural language queries about codebase
- Chat history and bookmarks
- Export conversations to PDF

### Project Map
- Interactive module dependency visualization
- Pan and zoom controls
- Mini-map navigation
- Module details panel

### Pull Request Analysis
- List and filter pull requests
- Side-by-side diff viewer
- AI-generated review comments
- Bulk actions for GitHub integration

### Settings & Configuration
- AI model configuration
- API credentials management
- Usage analytics and metrics
- Notification preferences

## Database Schema

The application uses Prisma with PostgreSQL. Key models include:

- **User**: User accounts and authentication
- **Repository**: Imported GitHub repositories
- **File**: Individual files within repositories
- **Query**: Chat queries and AI responses
- **PullRequest**: PR data and AI analysis

## Styling & Design

The application features a dark-mode first design with:

- **Color Palette**: Neon cyan (#00ffff), magenta (#ff00ff), and teal accents
- **Glassmorphism**: Translucent panels with backdrop blur
- **Animations**: Smooth transitions and micro-interactions
- **Responsive**: Mobile-first responsive design

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations

### Adding New Features

1. Create components in `src/components/`
2. Add pages in `src/app/`
3. Update database schema in `prisma/schema.prisma`
4. Add API routes in `src/app/api/`

## Deployment

The application is ready for deployment on platforms like Vercel, Netlify, or any Node.js hosting service.

### Environment Variables for Production

Ensure these environment variables are set:
- `DATABASE_URL`
- `NEXTAUTH_URL` 
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `OPENAI_API_KEY` (optional)
- `GITHUB_TOKEN` (optional)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.