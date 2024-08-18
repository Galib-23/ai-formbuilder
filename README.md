# Smart Forms

Smart Forms is an AI-powered form builder that allows users to create, customize, and manage forms with ease. Powered by AI, users can simply provide a prompt about the type of form they need, and Smart Forms will generate it. Users can sign up for free and create up to 3 forms, or upgrade to the Pro version for unlimited form creation.

## Features

- **AI-Powered Form Creation**: Generate forms by simply providing a prompt. Smart Form utilizes AI to create tailored forms based on the user's input.
- **User Authentication**: Secure user authentication with Clerk, enabling login and signup.
- **Personalized Dashboard**: Each user has a dashboard to manage their forms and responses.
  - **Free Tier**: Users can create up to 3 forms.
  - **Pro Tier**: Unlimited form creation with Pro mode (powered by Stripe for payments).
- **Form Customization**: Users can edit the theme, background, and style of their forms.
- **Live Preview**: See real-time previews of the form as you customize it.
- **Form Sharing**: Share forms with others and gather responses.
- **Response Management**: View and export form responses in the dashboard. Responses can be exported to Excel format.
- **Payment System**: Upgrade to Pro using Stripe's secure payment gateway.

## Technologies Used

- **Frontend**:
  - [Next.js](https://nextjs.org/) - A React framework for production-grade applications.
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.
  - [Shadcn UI](https://shadcn.dev/) - Modern UI components library.
  - [Daisy UI](https://daisyui.com/) - Tailwind CSS-based UI components.
- **Backend**:
  - [PostgreSQL](https://www.postgresql.org/) - Relational database to store user data and form responses.
  - [Neon Database](https://neon.tech/) - Managed Postgres database for cloud-based storage.
  - [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm) - Lightweight ORM for interacting with the database.
- **Authentication**:
  - [Clerk](https://clerk.dev/) - Authentication and user management solution.
- **AI Integration**:
  - [Gemini AI API](https://gemini.dev/) - AI engine used for intelligent form creation based on user prompts.
- **Payment**:
  - [Stripe](https://stripe.com/) - Payment platform for managing subscriptions and upgrading users to Pro.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Galib-23/ai-formbuilder.git
   cd ai-formbuilder
   ```
2. Install Dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:

- Create a **.env.local** file
- Add stripe Api keys
- Database connection string
- Gemini API keys

4. Run the Development Server
   ```bash
   npm run dev
   ```
5. Run drizzle-kit-studio
   ```bash
   npx run drizzle-kit-studio
   ```
