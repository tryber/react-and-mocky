import { getByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import responseAPI from './mocks';
import App from '../App';

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseAPI)
    })
    
    render(<App/>)
  })
  
  test('Verifica se aparece o card com titulo de "Rick Sanchez"', () => {
    const cardRick = screen.getByRole('img', {  name: /rick sanchez/i});
    expect(cardRick).toBeInTheDocument();
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const inputEl = screen.getByRole('textbox');
    const buttonEl = screen.getByRole('button', {  name: /buscar/i});
    expect(inputEl).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', () => {
    const inputEl = screen.getByRole('textbox');
    const buttonEl = screen.getByRole('button', {  name: /buscar/i});
    userEvent.type(inputEl, 'Smith');
    userEvent.click(buttonEl);
    const cards = screen.getAllByRole('article')
    expect(cards).toHaveLength(4);  
  })

})
