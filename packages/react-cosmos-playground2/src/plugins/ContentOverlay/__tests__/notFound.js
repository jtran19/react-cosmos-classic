// @flow

import React from 'react';
import { render } from 'react-testing-library';
import { loadPlugins, Slot } from 'react-plugin';
import { cleanup, mockState, mockMethod } from '../../../testHelpers/plugin';
import { register } from '..';

afterEach(cleanup);

function registerTestPlugins() {
  register();
  mockState('router', { urlParams: { fixturePath: 'foo.js' } });
  mockState('rendererPreview', { urlStatus: 'ok', runtimeStatus: 'connected' });
  mockMethod('rendererCoordinator.isRendererConnected', () => true);
  mockMethod('rendererCoordinator.isValidFixtureSelected', () => false);
}

function loadTestPlugins() {
  loadPlugins();

  return render(<Slot name="contentOverlay" />);
}

it('renders "notFound" state', () => {
  registerTestPlugins();
  const { queryByTestId } = loadTestPlugins();

  expect(queryByTestId('notFound')).not.toBeNull();
});
