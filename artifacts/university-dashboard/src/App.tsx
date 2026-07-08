import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Sidebar } from '@/components/layout/Sidebar';
import Dashboard       from '@/pages/Dashboard';
import EtudiantsPage   from '@/pages/EtudiantsPage';
import EnseignantsPage from '@/pages/EnseignantsPage';
import FilieresPage    from '@/pages/FilieresPage';
import ClassesPage     from '@/pages/ClassesPage';
import InscriptionsPage from '@/pages/InscriptionsPage';
import PaiementsPage   from '@/pages/PaiementsPage';
import RapportsPage    from '@/pages/RapportsPage';
import CalendrierPage  from '@/pages/CalendrierPage';
import NotificationsPage from '@/pages/NotificationsPage';
import ParametresPage  from '@/pages/ParametresPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 2,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/"             component={Dashboard} />
      <Route path="/etudiants"    component={EtudiantsPage} />
      <Route path="/enseignants"  component={EnseignantsPage} />
      <Route path="/filieres"     component={FilieresPage} />
      <Route path="/classes"      component={ClassesPage} />
      <Route path="/inscriptions" component={InscriptionsPage} />
      <Route path="/paiements"    component={PaiementsPage} />
      <Route path="/rapports"     component={RapportsPage} />
      <Route path="/calendrier"   component={CalendrierPage} />
      <Route path="/notifications" component={NotificationsPage} />
      <Route path="/parametres"   component={ParametresPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar />
            <Router />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
