import React from 'react';
import App from '../App';
import { render } from '@testing-library/react';
test('App should render title',() => {
    const renderedApp = render(<App />);
    const title = renderedApp.getByTestId('title');
    expect(title.textContent).toEqual("Roy's React SSR Boilerplate");
})