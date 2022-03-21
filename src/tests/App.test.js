import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import responseAPI from './mocks';

describe('Test Rick & Morty API', () => {

  
  beforeEach(()=>{
    //Fazer o mock do fetch aqui 
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseAPI),
    })
    render(<App/>)
  });
  
  it('Verifica se aparece o card com titulo de "Rick Sanchez"', async () => {
    const rick = await screen.findByRole('heading', { name: /Rick Sanchez/i, level: 3 });
    expect(rick).toBeInTheDocument();
  });

  it('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /Buscar/i });
    expect(input).toBeDefined();
    expect(button).toBeInTheDocument();
  });

  it('Verifica se ao buscar por "Smith" aparecem 4 cards', async () => {
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /Buscar/i });

    userEvent.type(input, 'Smith');
    userEvent.click(button);

    const allSmith = await screen.findAllByRole('heading', { name: /Smith/i, level: 3});
    expect(allSmith).toHaveLength(4);
  });

})
