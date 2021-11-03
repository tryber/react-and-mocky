import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import responseAPI from './mocks';

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
    //global.fetch = jest.fn().mockResolvedValue({json: jest.fn().mockResolvedValue(responseAPI)})
    global.fetch = async () => ({json: async() => responseAPI})
    render(<App/>)
  })

  test('Verifica se aparece o card com titulo de "Rick Sanchez"',async () => {
    const title = await screen.findByRole('heading',{name:/Rick Sanchez/})
    expect(title).toBeInTheDocument()
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const button = screen.getByRole('button')
    const input = screen.getByRole('textbox')

    expect(button).toBeDefined()
    expect(input).toBeDefined()
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards',async () => {
    const button = screen.getByRole('button')
    const input = screen.getByRole('textbox')
    
    userEvent.type(input,'smith');
    userEvent.click(button)

    const articles = screen.getAllByRole('article')
    const numberOfCards = 4
    expect(articles).toHaveLength(numberOfCards)

  })

})