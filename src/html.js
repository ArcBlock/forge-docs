import React from 'react';
import PropTypes from 'prop-types';
import { withPrefix } from 'gatsby';

export default class HTML extends React.Component {
  static propTypes = {
    headComponents: PropTypes.any.isRequired,
    body: PropTypes.any.isRequired,
    postBodyComponents: PropTypes.any.isRequired,
  };

  render() {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" type="text/css" href={withPrefix('/icons/css/all.css')} />
          <link rel="icon" href={withPrefix('/favicon.ico')} />
          <script type="text/javascript" src={withPrefix('/api/env.js')}></script>
          {this.props.headComponents}
        </head>
        <body>
          <div id="___gatsby" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
}
