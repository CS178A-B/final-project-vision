import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';
import Home from './Home';

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

it('renders schedule events text', () => {
  render(<Home />);
  // const linkElement = screen.getByText(/learn react/i);
  expect(screen.getByText('Schedule', "Events")).toBeInTheDocument();
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
