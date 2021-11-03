import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
    //Fazer o mock do fetch aqui 
    
    render(<App/>)
  })
  
  test('Verifica se aparece o card com titulo de "Rick Sanchez"', () => {

  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', () => {
    
  })

})
