import React, { Suspense } from 'react';
import HomeLayout from '../../../layout/HomeLayout';

const Home = () => (
	<HomeLayout>
		<div className="dashboard-wrapper">
	<Suspense fallback={<div className="loading" />}>
		{' '}
		<div>Just testing</div>
	</Suspense>
	</div>	
	</HomeLayout>

);

export default Home;
