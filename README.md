# Peyronnet Account System

A user management and subscription-based application built with **React**, **Next.js**, and **TypeScript**. The project uses **Supabase** for authentication and database management and integrates **Stripe** to manage subscriptions and payments. Based on [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments).

## Features

- **User Authentication**: Secure user login and registration using Supabase.
- **Subscription Management**: Integration with Stripe to handle user subscriptions, payments, and billing.
- **Real-time Updates**: Utilizes Supabase's real-time features to keep user data and subscription status up-to-date.
- **TypeScript Support**: Fully typed codebase for improved developer experience and reliability.
- **Responsive Design**: Ensures the application looks good on both desktop and mobile devices.

## Tech Stack

- **Frontend**: [React](https://reactjs.org/), [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Backend**: [Supabase](https://supabase.com/) for database management and authentication.
- **Payments**: [Stripe](https://stripe.com/) for handling subscription payments and billing.
- **Deployment**: Compatible with platforms like [Netlify](https://netlify.com/) for easy CI/CD.

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/peyronnet-group/account.git
   cd account
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables:

   - Create a `.env.local` file in the root directory.
   - Add the following environment variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
     NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
     SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-key>
     STRIPE_SECRET_KEY=<your-stripe-secret-key>
     NEXT_PUBLIC_STRIPE_PUBLIC_KEY=<your-stripe-public-key>
     STRIPE_WEBHOOK_SECRET=<your-stripe-webhook-secret>
     ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The application should now be running at `http://localhost:3000`.

## Usage

### Authentication

Users can sign up or log in through the app using Supabase's authentication methods. Ensure you have configured your Supabase project with the necessary settings for authentication.

### Subscription Management

The app uses Stripe to manage subscriptions. Users can select subscription plans, and the app will handle the checkout process using Stripe’s API. Ensure you set up the webhook endpoint `/api/webhooks` in your Stripe dashboard to handle events such as subscription updates.

### Deployment

The project is optimized for deployment on Netlify/Vercel. Follow these steps:

1. Link your repository to Netlify.
2. Set up the environment variables in Netlify's dashboard to match your local `.env` file.
3. Deploy the application.

## Folder Structure

```bash
.
├── components        # React components
├── pages             # Next.js pages and API routes
├── public            # Static assets
├── styles            # CSS/SCSS files
├── types             # TypeScript types
├── utils             # Utility functions for Supabase and Stripe
└── .env.local        # Environment variables (not included in version control)
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.

## Acknowledgments

- [Supabase](https://supabase.com) for providing a scalable and easy-to-use backend.
- [Stripe](https://stripe.com) for powering the payment processing.
- [Next.js](https://nextjs.org) and [React](https://reactjs.org) for the frontend framework.
