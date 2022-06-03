import { render, screen } from '@testing-library/react';
import responseAPI from './mocks';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
    jest.spyOn(global, 'fetch').mockResolvedValue({ json: jest.fn().mockResolvedValue(responseAPI) });

    render(<App/>)
  })

  afterEach(() => {
    jest.spyOn(global, 'fetch').mockRestore();
  })
  
  test('Verifica se aparece o card com titulo de "Rick Sanchez"', async () => {
    const title = await screen.findByRole('heading', { name:  /Rick Sanchez/i, level: 3});
    expect(title).toBeInTheDocument();
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const input = screen.getByPlaceholderText('Rick Sanchez...');
    const button = screen.getByRole('button', { name: /Buscar/i});

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', () => {
    const input = screen.getByPlaceholderText('Rick Sanchez...');
    const button = screen.getByRole('button', { name: /Buscar/i});

    userEvent.type(input, 'Smith');
    userEvent.click(button);

    const cards = screen.getAllByRole('heading', { name: /Smith/i, level: 3 });
    expect(cards.length).toBe(4);
  })

  
})
