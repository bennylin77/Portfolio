import React from 'react';
import Menu from 'components/layouts/Menu.js';
import Main from 'components/layouts/Main.js';
import Footer from 'components/layouts/Footer.js';
import {Helmet} from "react-helmet";
import chi_lin from './images/chi_lin.jpg';
import './styles/layout.css';

function Layout(props) {
  return (
    <div>
      <Helmet>
					<title>Chi Lin_</title>
					<meta property="og:title" content="Chi Lin_"/>
					<meta property="og:image" content={"http://www.chi-lin.com"+chi_lin}/>
					<meta property="og:description" content="Chi Lin, a Full-stack Developer with a passion for Human Computer Interaction."/>
					<meta property="og:url" content="http://www.chi-lin.com" />
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Helmet>
      <Menu/>
      <Main/>
      <Footer/>
    </div>
  );
}

export default Layout;
