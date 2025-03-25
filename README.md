<div align="center">
	<img width="600" alt="Nexus" src="https://github.com/user-attachments/assets/4a747a35-51f7-40af-9a20-47d753b3ace7" />
</div>

# [Nexus](https://)

**Nexus** is a modern blogging platform where writers, thinkers, and creators can share their insights and stories with the world. Whether you’re passionate about technology, literature, or personal experiences, Nexus provides a seamless and engaging space for self-expression.

## Technologies

![TYPESCRIPT_BADGE](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=fff)
![ReactJS](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next_JS](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=nextdotjs&logoColor=fff)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn/ui](https://img.shields.io/badge/shadcn/ui-000?style=for-the-badge&logo=shadcnui&logoColor=fff)

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
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

POSTGRES_USER=johndoe
POSTGRES_PASSWORD=randompassword
POSTGRES_DB=mydb

NEXT_BACKEND_URL="http://localhost:3000/api"

BETTER_AUTH_SECRET=YOUR_SECRET
BETTER_AUTH_URL=http://localhost:3000

```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Write & Publish** – Create and share blog posts easily.
- **User Authentication** – Secure login and registration powered by Clerk.
- **Rich Content** – Format your articles with images, links, and code blocks.

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
