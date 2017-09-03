import React from 'react';
import Menu from 'components/layouts/Menu.js';
import Main from 'components/layouts/Main.js';
import Footer from 'components/layouts/Footer.js';
import {Helmet} from "react-helmet";
import './styles/layout.css';

function Layout(props) {
  return (
    <div>
      <Helmet>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <title>Chi Lin_</title>
      </Helmet>
      <Menu/>
      <Main/>
      <Footer/>
    </div>
  );
}

export default Layout;
