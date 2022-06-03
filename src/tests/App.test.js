import { render, screen } from '@testing-library/react';
import App from '../App';
import responseAPI from './mocks';
import userEvent from '@testing-library/user-event';

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
    //Fazer o mock do fetch aqui 
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseAPI)
    });
    render(<App/>);
  })
  
  test('Verifica se aparece o card com titulo de "Rick Sanchez"', () => {
    const nameCharacterEl = screen.getByRole('heading', {
      name: /Rick Sanchez/i,
      level: 3,
    });
    expect(nameCharacterEl).toBeInTheDocument();
  });

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const inputEl = screen.getByRole('textbox');
    const btnEl = screen.getByRole('button', { name: /Buscar/i });
    expect(inputEl).toBeInTheDocument();
    expect(btnEl).toBeInTheDocument();
  });

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', () => {
    const inputEl = screen.getByPlaceholderText(/Rick Sanchez.../i);
    const btnEl = screen.getByRole('button', { name: /Buscar/i });
    userEvent.type(inputEl, 'Smith');
    userEvent.click(btnEl);
    const charactersEl = screen.getAllByRole('article');
    expect(charactersEl).toHaveLength(4);
  });

})
