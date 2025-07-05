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