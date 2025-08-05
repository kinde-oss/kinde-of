import { useKindeAuth } from '@kinde-oss/kinde-auth-react';
import DashboardWithPaywall from './components/DashboardWithPaywall';
import LoggedOut from './components/LoggedOut';

export default function App() {
  const { isLoading, isAuthenticated } = useKindeAuth();

  if (isLoading) return <>Loading...</>;

  return isAuthenticated ? <DashboardWithPaywall /> : <LoggedOut />;
}
