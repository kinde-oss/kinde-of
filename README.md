# Kinde + Amplify Next.js App Router Starter Kit

This is a Next.js application that combines [Kinde Authentication](https://kinde.com/) with [AWS Amplify](https://aws.amazon.com/amplify/) for deployment. It's built using the App Router and includes SSR (Server-Side Rendering) support.

## Features

- ✅ **Kinde Authentication** - Complete auth flow with sign-in, sign-up, and profile management
- ✅ **AWS Amplify Deployment** - Optimized for Amplify hosting with proper build configuration
- ✅ **Next.js 15** - Latest version with App Router
- ✅ **TypeScript** - Full type safety
- ✅ **SSR Support** - Server-side rendering for better SEO and performance
- ✅ **Custom Domain Support** - Configured for custom domains on Amplify

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- AWS Amplify CLI (for deployment)
- Kinde account and application

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file with your Kinde configuration:
   ```env
   KINDE_CLIENT_ID=your_client_id
   KINDE_CLIENT_SECRET=your_client_secret
   KINDE_ISSUER_URL=https://your-subdomain.kinde.com
   KINDE_SITE_URL=http://localhost:3000
   KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
   KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Deployment to AWS Amplify

1. **Connect your repository** to AWS Amplify Console

2. **Configure build settings:**
   - Build command: `npm run build`
   - Output directory: `.next`
   - Node.js version: 18.x

3. **Set environment variables** in Amplify Console:
   - `KINDE_CLIENT_ID`
   - `KINDE_CLIENT_SECRET`
   - `KINDE_ISSUER_URL`
   - `KINDE_SITE_URL` (your production domain)
   - `KINDE_POST_LOGOUT_REDIRECT_URL`
   - `KINDE_POST_LOGIN_REDIRECT_URL`

4. **Deploy:**
   Amplify will automatically build and deploy your application

### Custom Domain Configuration

1. **Add your custom domain** in Amplify Console
2. **Update Kinde settings** with your production domain
3. **Configure DNS** as instructed by Amplify

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   ├── dashboard/         # Protected dashboard page
│   │   ├── layout.tsx         # Root layout with Kinde + Amplify
│   │   └── page.tsx           # Home page
│   └── middleware.ts          # Kinde auth middleware
├── amplify/                   # Amplify backend configuration
│   ├── auth/                  # Auth resource
│   ├── data/                  # Data resource
│   └── backend.ts             # Backend definition
├── amplify.yml               # Amplify build configuration
├── next.config.js            # Next.js configuration
└── package.json              # Dependencies
```

## Key Configuration Files

### `amplify.yml`
Optimized build configuration for Amplify deployment with proper caching and artifact handling.

### `next.config.js`
Configured for SSR and Amplify deployment with proper asset handling and redirects.

### `src/middleware.ts`
Kinde authentication middleware that protects routes and handles auth redirects.

## Troubleshooting

### 404 Errors on Custom Domain
- Ensure your Kinde application settings include your custom domain
- Check that Amplify environment variables are correctly set
- Verify DNS configuration is complete

### Build Failures
- Make sure all dependencies are installed: `npm install`
- Check that environment variables are set in Amplify Console
- Verify TypeScript compilation: `npm run build`

### Authentication Issues
- Confirm Kinde environment variables are correct
- Check that redirect URLs match your domain
- Verify middleware configuration

## Support

- [Kinde Documentation](https://kinde.com/docs)
- [AWS Amplify Documentation](https://docs.aws.amazon.com/amplify/)
- [Next.js Documentation](https://nextjs.org/docs)

## License

This project is licensed under the MIT License.
