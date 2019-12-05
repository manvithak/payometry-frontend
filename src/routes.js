import React from 'react';

const Card = React.lazy(() => import('./views/Payment/Card'));
const Typography = React.lazy(() => import('./views/Payment/Typography'));
const Preferences = React.lazy(() => import('./views/Payment/Preferences/Preferences'));
const Reports = React.lazy(() => import('./views/Payment/Reports/Reports'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/theme', exact: true, name: 'Payment', component: Card },
  { path: '/add-card', name: 'Card', component: Card },
  { path: '/execute-payment', name: 'Typography', component: Typography },
  { path: '/user-preferences', name: 'Operational Data', component:Preferences },
  { path: '/reports', name: 'Reports', component: Reports }
];

export default routes;
