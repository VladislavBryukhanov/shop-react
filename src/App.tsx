import React from 'react';
import { Switch } from 'react-router';
import AuthPage from './pages/Auth/auth.component';
import SnackbarFeedback from './components/snackbar-feedback/snackbar-feedback.component';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { ProductListPage } from './pages/ProductList/product-list.component';
import { CategoriesManagerPage } from './pages/admin/categories-manager/categories-manager.component';
import { RouteGuard } from './components/route-guard/route-guard.component';
import { ConfirmationDialog } from './components/confirmation-dialog/confirmation-dialog';
import { NotFoundPage } from './pages/NotFound/not-found.component';
import { Roles } from './common/constants';
import './App.scss';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    secondary: {
      main: '#1A567B'
    },
    primary: {
      main: '#61dafb',
    },
/*    secondary: {
      light: '#6B9BC2',
      main: '#558DC4',
      dark: '#1A567B',
      contrastText: '#fff',
    },*/
/*    primary: {
      light: '#61dafb',
      main: '#00aca2',
      dark: '#00726a',
      contrastText: '#243443',
    },*/
    error: {
      main: '#cd544e',
      contrastText: '#1A567B',
    },
  },
});

const App: React.FC = () => {
  return (
    <div className="AppBody">
      <MuiThemeProvider theme={theme}>
        <SnackbarFeedback/>
        <ConfirmationDialog/>
        <CssBaseline />

        <Switch>
          <RouteGuard
            exact path="/"
            component={AuthPage}
          />

          <RouteGuard
            exact path="/sign_up"
            render={
              (props: any) => <AuthPage {...props} isSignUp={true} />
            }
          />

          <RouteGuard
            requiredAuth={true}
            exact path="/top_products"
            component={ProductListPage}
          />

          <RouteGuard
            requiredAuth={true}
            exact path="/products/:category"
            component={ProductListPage}
          />

          <RouteGuard
            requiredAuth={true}
            exact path="/categories_manager"
            component={CategoriesManagerPage}
          />
          {/*requiredRole={Roles.MANAGER}*/}

          {/*Fixme*/}
        {/*  <RouteGuard
            path="*"
            component={NotFoundPage}
          />*/}
        </Switch>
      </MuiThemeProvider>
    </div>
  );
};

export default App;
