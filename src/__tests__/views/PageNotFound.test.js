import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PageNotFound from './PageNotFound';

describe('PageNotFound Component', () => {
  it('should render 404 image, title, and button', () => {
    render(
      <Router>
        <PageNotFound />
      </Router>
    );

    // Check if the 404 image is rendered
    const image = screen.getByAltText('404 Page Not Found');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('404.svg'));

    // Check if the title and message are displayed
    expect(screen.getByText('Böyle bir sayfa yok!')).toBeInTheDocument();
    expect(screen.getByText('Gerçekten yok...')).toBeInTheDocument();

    // Check if the "Beni Kurtar" button is rendered
    const button = screen.getByRole('button', { name: /Beni Kurtar/i });
    expect(button).toBeInTheDocument();
  });

  it('should redirect to the home page when the button is clicked', () => {
    render(
      <Router>
        <PageNotFound />
      </Router>
    );

    const button = screen.getByRole('button', { name: /Beni Kurtar/i });

    // Simulate a button click
    fireEvent.click(button);

    // Check if the page navigates to the home page ('/')
    expect(window.location.pathname).toBe('/');
  });
});
