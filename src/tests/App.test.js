import { render, screen } from '@testing-library/react';
import App from '../App';
import mocks from '../tests/mocks'
import userEvent from '@testing-library/user-event'

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
    //global.fetch = jest.fn().mockResolvedValue({json: jest.fn().mockResolvedValue(responseAPI)})
    // global.fetch = async () => ({json: async() => responseAPI})
    // render(<App/>)
  // })
    
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mocks)
    })
    
    // const fectchMock = async function () {
    //   return {
    //     json: async function () {
    //       return mocks;
    //     }
    //   }
    // }

    // fectchMock()
    // com o segundo fetch retorna o erro:
        // TestingLibraryElementError: Unable to find an accessible element with the role "heading" and name `/rick sanchez/i`

    render(<App/>)
  })
  
  test('Verifica se aparece o card com titulo de "Rick Sanchez"', () => {
    const titleEl = screen.getByRole('heading', { name: /rick sanchez/i })
    expect(titleEl).toBeInTheDocument();
    expect(titleEl).toBeDefined();
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const inputEl = screen.getByRole('textbox')
    const sendBtn = screen.getByRole('button', { name: /buscar/i })
    expect(inputEl && sendBtn).toBeDefined();

  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', () => {
    const inputEl = screen.getByRole('textbox')
    const sendBtn = screen.getByRole('button', { name: /buscar/i })
    userEvent.type(inputEl, 'Smith');
    userEvent.click(sendBtn)

    const articles = screen.getAllByRole('article')
    const numberOfCards = 4

    expect(articles).toHaveLength(numberOfCards)

  })

})