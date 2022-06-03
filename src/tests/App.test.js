import { render, screen } from '@testing-library/react';
import App from '../App';
import mocks from './mocks';
import userEvent from '@testing-library/user-event';

describe('Test Rick & Morty API', () => {

  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValue({
        json: async () => mocks,
      })

    render(<App />)
  });

  test('Verifica se aparece o card com titulo de "Rick Sanchez"', async () => {
    const title = await screen.findByRole('heading', { name: /Rick Sanchez/i, level: 3 });
    expect(title).toBeInTheDocument();
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const input = screen.getByRole('textbox');
    const btn = screen.getByRole('button');

    expect(input && btn).toBeInTheDocument();

  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', async () => {
    const input = screen.getByRole('textbox');
    const btn = screen.getByRole('button');

    userEvent.type(input, 'smith');
    userEvent.click(btn);

    const theSmiths = await screen.findAllByRole('heading', { level: 3, name: /smith/i });
    expect(theSmiths).toHaveLength(4);

  })

})
