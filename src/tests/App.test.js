import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import responseAPI from './mocks';

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseAPI),
    })
    
    render(<App/>)
  })
  
  test('Verifica se aparece o card com titulo de "Rick Sanchez"', () => {
    const rickSanchezCard = screen.getByRole('heading', {level: 3, name: 'Rick Sanchez'})
    expect(rickSanchezCard).toBeInTheDocument();
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const inputField = screen.getByRole('textbox');
    const formButton = screen.getByRole('button', {name: 'Buscar'})
    expect(inputField).toBeInTheDocument();
    expect(formButton).toBeInTheDocument();
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', () => {
    const inputField = screen.getByRole('textbox');
    const formButton = screen.getByRole('button', {name: 'Buscar'})
    userEvent.type(inputField, 'Smith');
    userEvent.click(formButton);
    const cards = screen.getAllByRole('heading', {level: 3})
    expect(cards).toHaveLength(4);
  })

})
