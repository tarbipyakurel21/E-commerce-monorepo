'use client';

import React from 'react';
import GlobalAuthChecker from './GlobalAuthChecker';
import InactivityWatcher from './InactivityWatcher';

const GlobalAuth = () => (
  <>
    <GlobalAuthChecker />
    <InactivityWatcher />
  </>
);

export default GlobalAuth;
