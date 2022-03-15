import { screen } from '@testing-library/react';
import React from 'react-dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test of APP component.', () => {
  it('Should render a link with Home text.', () => {
    renderWithRouter(<App />);
    const homeEl = screen.getByRole('link', { name: /home/i });
    expect(homeEl).toBeDefined();
  });

  it('Should render a link with About text.', () => {
    renderWithRouter(<App />);
    const AboutEl = screen.getByRole('link', { name: /About/i });
    expect(AboutEl).toBeDefined();
  });

  it('Should render a link with Favorite Pokémons text.', () => {
    renderWithRouter(<App />);
    const FavoriteEl = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(FavoriteEl).toBeDefined();
  });

  it('Should go to path / when Home is clicked.', () => {
    const { history } = renderWithRouter(<App />);

    const homeEl = screen.getByRole('link', { name: /home/i });
    expect(homeEl).toBeDefined();

    userEvent.click(homeEl);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Should go to path /about when About is clicked.', () => {
    const { history } = renderWithRouter(<App />);

    const AboutEl = screen.getByRole('link', { name: /About/i });
    expect(AboutEl).toBeDefined();

    userEvent.click(AboutEl);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Should go to path /favorites when Favorites is clicked.', () => {
    const { history } = renderWithRouter(<App />);

    const FavoriteEl = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(FavoriteEl).toBeDefined();

    userEvent.click(FavoriteEl);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Should render a 404 if a non-existant page is selected', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/xablau');

    const notFound = screen.getByRole('heading', { name: /page requested not found/i });
    expect(notFound).toBeDefined();
  });
});

// describe('', () => {
//   it('', () => { });
//   it('', () => { });
//   it('', () => { });
//   it('', () => { });
// });
