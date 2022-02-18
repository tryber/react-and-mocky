import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import responseAPI from './mocks';

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
    global.fetch = async () => ({ json: async() => responseAPI})
    
    render(<App/>)
  })
  
  test('Verifica se aparece o card com titulo de "Rick Sanchez"', async () => {
    const titulo = await screen.findByRole('heading',{name:/Rick Sanchez/, level: 3})
    expect(titulo).toBeInTheDocument();
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    expect(button).toBeDefined();
    expect(input).toBeDefined();
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', async () => {
    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button')

    userEvent.type(input,'smith')
    userEvent.click(button)

    const articles = screen.getAllByRole('article')
    const numberOfCards = 4
    expect(articles).toHaveLength(numberOfCards)
  })

})
