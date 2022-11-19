import { getByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import responseAPI from './mocks'

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValue({json: jest.fn().mockResolvedValue(responseAPI)})
   
    render(<App/>)
  })
  
  test('Verifica se aparece o card com titulo de "Rick Sanchez"', async () => {

    const rick = await screen.findByRole('heading', {
      name: 'Rick Sanchez',
      level: 3
    })

    expect(rick).toBeInTheDocument();
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    
    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button', {name: 'Buscar'})

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', () => {
    
    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button', {name: 'Buscar'})

    userEvent.type(input, 'smith')
    userEvent.click(button)

    const articles = screen.getAllByRole('article')
    expect(articles).toHaveLength(4)
  })

})
