import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';


test('Login button disappears', () => {
  render(<App />);
  const LoginButtonElement = screen.getByText('Login to Game');
  expect(LoginButtonElement).toBeInTheDocument();
  fireEvent.click(LoginButtonElement);
  expect(LoginButtonElement).not.toBeInTheDocument();
});


test('Send button disappears', () => {
  render(<App />);
  const SendButtonElement = screen.getByText('send');
  expect(SendButtonElement).toBeInTheDocument();
  fireEvent.click(SendButtonElement);
  expect(SendButtonElement).not.toBeInTheDocument();
});

test('Play gain button appears', () => {
  render(<App />);
  const LeaderBoardElement = screen.getByText('Enter your user name:');
  expect(LeaderBoardElement).toBeInTheDocument();
 
});