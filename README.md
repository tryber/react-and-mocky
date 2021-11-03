# React and Mocky

Nessa aplicação nós utilizamos a [API do Rick](https://rickandmortyapi.com/) and Morty para buscar os personagens. O endpoint utilizado é o `[https://rickandmortyapi.com/api/character](https://rickandmortyapi.com/api/character)` 

O objetivo é escrever os testes para a aplicação utilizando o RTL - React Testing Library. Todos os testes devem utilizar o `ByRole`
  

### Setup para os testes  
  
***A primeira coisa que deve ser feita antes de escrever os testes, é realizar o mock da função fetch.***   

Esse mock deve ser feito dentro do `beforeEach()` antes de chamar a função `render(<App/>)`. A resposta da API que vai ser mockada está dentro da pasta `/tests/mocks.js`. Basta importar o `responseAPI` e utilizar da maneira que achar necessário.  
  
  
    
### Teste 1

Verificar se ao renderizar o App aparece um card com um `h3` escrito "Rick Sanchez" dentro.  

### Teste 2

Verificar se ao renderizar o App está presente na tela o `input` de texto e o `button` com o texto "Buscar"  

### Teste 3  

Verificar se ao buscar pelo nome "smith" aparecem 4 cards na tela.