import React from 'react';

const Card = React.lazy(() => import('./views/Payment/Card'));
const Typography = React.lazy(() => import('./views/Payment/Typography'));
const Preferences = React.lazy(() => import('./views/Payment/Preferences/Preferences'));
const Reports = React.lazy(() => import('./views/Payment/Reports/Reports'));
const Billing = React.lazy(() => import('./views/Payment/Billing/Billing'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/theme', exact: true, name: 'Payment', component: Card },
  { path: '/add-card', name: 'Card', component: Card },
  { path: '/execute-payment', name: 'Typography', component: Typography },
  { path: '/user-preferences', name: 'Operational Data', component:Preferences },
  { path: '/reports', name: 'Reports', component: Reports },
  { path: '/billing', name: 'Billing Paradigm', component: Billing }
];

export default routes;
