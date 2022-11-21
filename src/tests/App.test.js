import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import responseAPI from './mocks'

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue({
      responseAPI,
    })
  })    
    render(<App/>)
  })
  
  test('Verifica se aparece o card com titulo de "Rick Sanchez"', () => {
    const h3El = screen.getByRole("heading", {level: 3});
    expect(h3El).toBeInTheDocument();
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const inputEl = screen.getByRole("textbox");
    const buttonEl = screen.getByRole("button");
    expect(inputEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', () => {
    const inputEl = screen.getByRole("textbox");
    const buttonEl = screen.getByRole("button");
    const h3El = screen.getAllByRole("heading", { name: /smith/i });

    userEvent.type(inputEl, "Smith");
    userEvent.click(buttonEl);
    expect(h3El).toHaveLength(3);
  })

})
