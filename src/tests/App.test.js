import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import responseAPI from './mocks';

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
    jest.spyOn(global, 'fetch').mockResolvedValue({ json: jest.fn().mockResolvedValue(responseAPI) });
    render(<App/>)
  })
  
  test('Verifica se aparece o card com titulo de "Rick Sanchez"', () => {
    const titulo = screen.getByRole('heading', { name: /Rick Sanchez/i }, { value: 3 })
    expect(titulo).toBeInTheDocument();
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    expect(input && button).toBeInTheDocument();
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards',async () => {
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    userEvent.type(input, 'Smith');
    userEvent.click(button);
    const card = await screen.findAllByRole('heading', { value: 3 });
    expect(card.length).toBe(4);
  })
})
