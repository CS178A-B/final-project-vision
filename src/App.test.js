import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

// run "yarn test -- --coverage App.test.js" for more details

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('app renders title', () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  expect(screen.getByText('VISION')).toBeInTheDocument();
});

it('renders home text', () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  expect(screen.getByText('Home')).toBeInTheDocument();
});

it('renders navbar text', () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  expect(screen.getByText('About', 'Features', 'Contact Us')).toBeInTheDocument();
});

it('renders signin text', () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  expect(screen.getByText('Sign In')).toBeInTheDocument();
});

it('renders summary text', () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  expect(screen.getByText('Schedule Events.', 'Manage your groups.', ' Assign tasks.')).toBeInTheDocument();
});

it('renders big button text', () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  expect(screen.getByText('TRY VISION FOR FREE')).toBeInTheDocument();
});
