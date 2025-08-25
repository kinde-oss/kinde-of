import './globals.css';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import ConditionalLayout from '@/components/ConditionalLayout';

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
      <body
        style={{
          backgroundImage: "url('/images/windowsXPBackground.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          margin: 0,
          padding: 0,
        }}
      >
        <ConditionalLayout user={user} isAuthenticated={authenticated}>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
