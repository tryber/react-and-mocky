import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import responseAPI from './mocks';

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
    jest.spyOn(global, 'fetch')
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(responseAPI)
      }) 
    
    render(<App/>)
  })
  
  test('Verifica se aparece o card com titulo de "Rick Sanchez"', () => {
    const titleEl = screen.getByRole('heading', { name: /Rick Sanchez/i, level: 3 })
    expect(titleEl).toBeInTheDocument();
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    // const inputTextEl = screen.getByRole('textbox');
    const inputTextEl = screen.getByPlaceholderText(/^rick sanchez\.\.\.$/i)
    const buttonEl = screen.getByRole('button', { name: /buscar/i});

    expect(inputTextEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', () => {
    const inputTextEl = screen.getByRole('textbox');
    const buttonEl = screen.getByRole('button', { name: /buscar/i});

    userEvent.type(inputTextEl, 'Smith')
    userEvent.click(buttonEl);

    const cardsEl = screen.getAllByRole('article');

    expect(cardsEl).toHaveLength(4);

  })

})
