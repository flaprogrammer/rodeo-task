import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import ProjectList from 'pages/ProjectList';
import ProjectDetail from 'pages/ProjectDetail';
import InvoiceDetail from 'pages/InvoiceDetail';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
      <Container maxWidth="md">
        <div>
          <Switch>
            <Route exact path="/" component={ProjectList} />
            <Route exact path="/projects/:projectId" component={ProjectDetail} />
            <Route exact path="/projects/:projectId/invoices/:invoiceId" component={InvoiceDetail} />
          </Switch>
        </div>
      </Container>
      </Router>
    </QueryClientProvider>
  );
}

export default App;