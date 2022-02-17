import { render, screen } from '@testing-library/react';
import App from '../App';
import responseAPI from './mocks';

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
    global.fetch = jest.fn().mockResolvedValue( {
      json: jest.fn().mockResolvedValue( responseAPI )
    })
    
    render(<App/>)
  })
  
  test('Verifica se aparece o card com titulo de "Rick Sanchez"', async () => {
    const titleEl = await screen.findByRole( 'heading', { name: 'Rick Sanchez' } );
    expect( titleEl ).toBeInTheDocument();
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const inputEl = screen.getByRole( 'textbox', {placeholder: 'Rick Sanchez...'});
    const buttonEl = screen.getByRole( 'button' );
    expect( inputEl ).toBeInTheDocument();
    expect( buttonEl ).toBeInTheDocument();
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', () => {
    
  })

})
