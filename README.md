# Prodigy Teacher Portal

Educational web application prototype - a lightweight, modular clone of the Prodigy teacher portal for rapid prototyping and UX experimentation.

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Backend:** Supabase (planned)
- **UI Components:** shadcn/ui (planned)
- **Charts:** Chart.js (planned)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/himynameismarvin/project-shell.git
cd project-shell
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── ui/          # Base UI components
│   └── features/    # Feature-specific components
├── lib/             # Utility libraries
└── styles/          # Global styles and tokens
```

## Development Status

See [TASK_LIST.md](./TASK_LIST.md) for detailed development progress and task tracking.

## License

MIT