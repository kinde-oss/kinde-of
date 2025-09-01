import './globals.css';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import ConditionalLayout from '@/components/ConditionalLayout';

// Import Sixtyfour pixel font from Google Fonts
import { Sixtyfour } from 'next/font/google';

const sixtyfour = Sixtyfour({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sixtyfour',
});

export const metadata = {
  title: 'Kinde Auth',
  description: 'Kinde with NextJS App Router',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, getUser } = getKindeServerSession();

  let authenticated = false;
  try {
    authenticated = !!(await isAuthenticated());
  } catch {
    authenticated = false;
  }

  let user: any = null;
  if (authenticated) {
    try {
      user = await getUser();
    } catch {
      user = null;
    }
  }

  return (
    <html lang="en">
      <head>
        <script
          defer
          data-domain="kinde-of.com"
          src="https://plausible.io/js/script.js"
        ></script>
      </head>
      <body className={`app-body ${sixtyfour.variable}`}>
        <ConditionalLayout user={user} isAuthenticated={authenticated}>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
