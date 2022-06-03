import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import responseAPI from './mocks';

describe('Test Rick & Morty API', () => {

  beforeEach(() => {
    //Fazer o mock do fetch aqui 
    const mock = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseAPI),
    });
    render(<App />)
  })

  test('Verifica se aparece o card com titulo de "Rick Sanchez"', () => {
    const cardEl = screen.getByRole('heading', { name: 'Rick Sanchez' });
    expect(cardEl).toBeInTheDocument();
    expect(cardEl).toHaveTextContent('Rick Sanchez');
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const inputEl = screen.getByRole('textbox');
    const buttonEl = screen.getByRole('button', { name: 'Buscar' });
    expect(inputEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', () => {
    const inputEl = screen.getByRole('textbox');
    const buttonEl = screen.getByRole('button', { name: 'Buscar' });

    userEvent.type(inputEl, 'smith');
    userEvent.click(buttonEl);

    const cardEls = screen.getAllByRole('article');
    expect(cardEls).toHaveLength(4);
  })
})
