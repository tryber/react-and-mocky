import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import responseAPI from './mocks';

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
    //Fazer o mock do fetch aqui 
    jest.spyOn(global, "fetch")
    .mockResolvedValue({
      json: jest.fn ().mockResolvedValue(responseAPI)});
    
    render(<App/>)
  })
  
  test('Verifica se aparece o card com titulo de "Rick Sanchez"', async() => {
    const rick = await screen.findByRole('heading', {name: /rick sanchez/i, level: 3});
    expect(rick).toBeInTheDocument();
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const input = screen.getByPlaceholderText(/rick sanchez.../i);
    const btn = screen.getByRole('button', {name: /buscar/i});
    
    expect(input).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', () => {
    const input = screen.getByPlaceholderText(/rick sanchez.../i);
    const btn = screen.getByRole('button', {name: /buscar/i});

    userEvent.type(input, 'Smith');
    userEvent.click(btn);

    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(4);
  })

})
