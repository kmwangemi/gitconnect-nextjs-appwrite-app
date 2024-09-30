# NextJS Social Network for Developers Application

This is a **Next.js** application that integrates with an **Appwrite** backend that allows developers to  create a developer profile/portfolio, share posts and get help from others developers.

## Features
- Sign up and Sign in
- List all registered developers
- Profile page of Developer containing the following sections respectively: personal details, education, work experience and github repositories
- Ability to edit profile
- Ability to display posts from other developers
- Add/delete post
- Like post
- Comment/discuss post
- Display number of likes of a post
- View the comments of a given post

## Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (v14 or higher): [Download here](https://nodejs.org/)
- **npm** or **yarn** (for package management)
- **Appwrite Server** (you can follow the installation guide [here](https://appwrite.io/docs))

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/kmwangemi/gitconnect-nextjs-appwrite-app.git
cd your-repo-name

# For npm
npm install

# For yarn
yarn install
```
### 2. Set Up Environment Variables

```bash
NEXT_PUBLIC_APPWRITE_API_URL=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your-database-id
NEXT_PUBLIC_NODE_ENV=your-development-environment
NEXT_PUBLIC_JWT_SECRET=your-jwt-secret
NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID=your-user-collection-id
NEXT_PUBLIC_APPWRITE_POST_COLLECTION_ID=your-post-collection-id
NEXT_PUBLIC_APPWRITE_LIKE_COLLECTION_ID=your-like-collection-id
NEXT_PUBLIC_APPWRITE_COMMENT_COLLECTION_ID=your-comment-collection-id
NEXT_PUBLIC_APPWRITE_PROFILE_COLLECTION_ID=your-profile-collection-id
```

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


