import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import responseAPI from './mocks';

describe('Test Rick & Morty API', () => {

  beforeEach(() => {
    //Fazer o mock do fetch aqui 
    jest.spyOn(global, 'fetch')
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(responseAPI)
      })

    render(<App />)
  })

  test('Verifica se aparece o card com titulo de "Rick Sanchez"', () => {
    const cardTitle = screen.getByRole('heading', { name: /Rick Sanchez/i, level: 3 });
    expect(cardTitle).toBeInTheDocument();
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const input = screen.getByPlaceholderText(/^Rick Sanchez\.\.\.$/);
    const button = screen.getByRole('button', { name: /Buscar/i })
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', () => {

    const input = screen.getByPlaceholderText(/^Rick Sanchez\.\.\.$/);
    const button = screen.getByRole('button', { name: /Buscar/i });

    userEvent.type(input, 'Smith');
    userEvent.click(button);

    const cards = screen.getAllByRole('article');

    expect(cards).toHaveLength(4);
  })

})
