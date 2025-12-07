<div align="center">
	<img width="720" alt="Nexus" src="https://github.com/user-attachments/assets/5d6a499d-7a1b-4783-ad02-cea13374f369" />
</div>

# [Nexus](https://)

**Nexus** is a modern blogging platform where writers, thinkers, and creators can share their insights and stories with the world. Whether you’re passionate about technology, literature, or personal experiences, Nexus provides a seamless and engaging space for self-expression.

## Technologies

![TYPESCRIPT_BADGE](https://img.shields.io/badge/TypeScript-3178C6?&logo=typescript&logoColor=fff)
![ReactJS](https://img.shields.io/badge/React-20232A?&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?&logo=tailwind-css&logoColor=white)
![Shadcn/ui](https://img.shields.io/badge/shadcn/ui-fff?&logo=shadcnui&logoColor=000)
![Zod](https://img.shields.io/badge/zod-000?&logo=zod&logoColor=3068B7)
![React Query](https://img.shields.io/badge/Tanstack%20Query-FF4154?logo=reactquery&logoColor=fff)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)
![AWS](https://custom-icon-badges.demolab.com/badge/AWS-%23FF9900.svg?logo=aws&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white)

## Prerequisites

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

## Install and Run Nexus Locally

### 1. Clone the repository

```bash
git clone git@github.com:marceloxhenrique/nexus.git
cd Nexus
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add your credentials:

```bash
# Required: Used by both Prisma and the app to connect to your database
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

#Only needed if you're running Postgres using Docker
POSTGRES_USER=johndoe
POSTGRES_PASSWORD=randompassword
POSTGRES_DB=mydb

# Backend API URL
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000/api

# BetterAuth configuration
BETTER_AUTH_SECRET=YOUR_SECRET
BETTER_AUTH_URL=http://localhost:3000

# AWS (used for image uploads)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=
AWS_BUCKET_REGION=
NEXT_PUBLIC_AWS_URL=

# OAuth credentials
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Email (for notifications/auth)
USER_GMAIL=
PASSWORD_GMAIL=

# Cron job security
CRON_SECRET=

```

### Note:

If you're using Docker to run your database (recommended for local development), the **POSTGRES_USER**, **POSTGRES_PASSWORD**, and **POSTGRES_DB** variables will be used to initialize the container.

You still must set **DATABASE_URL**, it's required by both Prisma and the application to connect to the database.

Start the database container with:

```bash
docker compose up -d
```

### 4. Run prisma migrations

```bash
npx prisma migrate dev
```

### 5. Run the development server

```bash
npm run dev
# or
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Write & Publish**: Create and share blog posts easily.
- **User Authentication**: Secure login and registration powered by BetterAuth.
- **Rich Content**: Format your articles with images, links, and code blocks.
- **Comments**: Readers can comment on articles and engage in discussions.
- **User Profiles**: Personalized profile pages showcasing user info and articles.
- **Image Uploads**: Drag-and-drop images upload with AWS S3 integration.
- **Likes & Following**: Users can like articles and follow their favorite authors.
- **Blog Experience**: A clean, Medium-inspired blogging platform focused on reading and writing.

## Contribute

If you want to contribute, fork this repo, create your work branch and get your hands dirty!

1. ```shell
   git clone git@github.com:marceloxhenrique/nexus.git
   ```

2. ```shell
   git checkout -b feature/NAME
   ```

3. Follow commit patterns
4. Open a Pull Request explaining the problem solved or feature made, if exists, append screenshot of visual modifications and wait for the review!
