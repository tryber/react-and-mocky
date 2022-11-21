import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import responseAPI from './mocks';


describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseAPI),
    });
    render(<App/>)
  })
  
  test('Verifica se aparece o card com titulo de "Rick Sanchez"', () => {
    const renderRickSanches = screen.getByRole('heading', {  
      name: /rick sanchez/i,
      level: 3,
  });

    expect(renderRickSanches).toBeInTheDocument();

  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const renderBottonBuscar = screen.getByRole('button', {  name: /buscar/i});
    const renderInput = screen.getByRole('textbox');
    
    expect(renderBottonBuscar).toBeInTheDocument();
    expect(renderInput).toBeInTheDocument();
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', () => {
    userEvent.type(screen.getByRole('textbox'), 'smith');
    userEvent.click(screen.getByRole('button', {  name: /buscar/i}));
    const renderArticles = screen.queryAllByRole('article');
    expect(renderArticles).toHaveLength(4);
  })

})
