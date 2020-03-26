import React, { useEffect, useState, useRef } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { Colxx } from '../../../components/common/CustomBootstrap';

function DefaultDashboard(props) {
  let content = <Colxx xxs="12" className="mb-3"></Colxx>;

  return content;
}
export default injectIntl(DefaultDashboard);
