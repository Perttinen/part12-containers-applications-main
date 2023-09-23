import React from 'react';
import { render, screen } from '@testing-library/react';

import Todo from '../Todos/Todo'

it('test if testing works', () => {

  const todo = {
    text: "Write code",
    done: true
  }

  render(<Todo todo={todo}/>)
  expect(screen.getByText('Write code')).toBeInTheDocument();
})