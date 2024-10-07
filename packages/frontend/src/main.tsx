import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { PortalProvider } from '@blueprintjs/core';
import { BrowserRouter } from 'react-router-dom';
import './shared/styles/global-styles.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import Router from './router/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<PortalProvider portalClassName="my-custom-class">
		<BrowserRouter>
			<Router />
		</BrowserRouter>	
	</PortalProvider>,
);
