import React from 'react';
import { useSelector } from 'react-redux';
import TopnavHome from '../containers/navs/TopnavHome';

const HomeLayout = ({ children }) => {
	const redux = useSelector((state) => state);
	return (
		<div id="app-container" className={redux.menu.containerClassnames}>
			<TopnavHome />
			<main>
				<div className="container-fluid">{children}</div>
			</main>
		</div>
	);
};

export default HomeLayout;
