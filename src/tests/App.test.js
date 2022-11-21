import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Test Rick & Morty API', () => {
  beforeEach(() => {
    //Fazer o mock do fetch aqui

    render(<App />);
  });

  test('Verifica se aparece o card com titulo de `Rick Sanchez` numa tag `h3`', async () => {
    await waitForElementToBeRemoved(() => screen.getByText('Carregando...'));

    const name = screen.queryByRole('heading', { name: 'Rick Sanchez' });

    expect(name).toBeInTheDocument();
  });

  test('Verifica se existem o input de texto e o botão com o texto `Buscar`', () => {
    const input = screen.queryByRole('textbox');
    const button = screen.queryByRole('button', { name: 'Buscar' });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', async () => {
    await waitForElementToBeRemoved(() => screen.getByText('Carregando...'));

    const input = screen.queryByRole('textbox');
    const button = screen.queryByRole('button', { name: 'Buscar' });

    userEvent.type(input, 'Smith');
    userEvent.click(button);

    expect(await screen.findAllByRole('heading')).toHaveLength(4)
  });
});
