import { render, screen } from '@testing-library/react';
import App from '../App';
import responseAPI from './mocks';

describe('Test Rick & Morty API', () => {

  // beforeEach(()=>{
  //   //Fazer o mock do fetch aqui
  //   // global.fetch = async () => ({
  //   //   json: async () => responseAPI
  //   // })
  //   // jest.spyOn(global, 'fetch').mockResolvedValue({
  //   //   json: jest.fn().mockResolvedValue(responseAPI),
  //   // })

  //   global.fetch = jest.fn().mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(responseAPI),
  //   });
  //   render(<App/>);
  // })
  
  test('Verifica se aparece o card com titulo de "Rick Sanchez"', async () => {
    render(<App />);
    const cardTitle = await screen.findByRole('heading', { level: 3, name: /rick sanchez/i});
    expect(cardTitle).toBeInTheDocument();
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    const buttonSearch = screen.getByRole('button', { name: 'Buscar' });
    expect(input).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', () => {
    
  })

})
