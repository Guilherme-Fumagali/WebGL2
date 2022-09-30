# Projeto PP2 - Grupo 1
Projeto prático da disciplica de processamento gráfico. 

O objetivo do trabalho é renderizar 4 objetos 3D em um ambiente virtual, aplicando um movimento simples em pelo menos um deles, utilizando no minimo 2 shaders e definindo uma camêra.

Integrantes: 
  - [Guilherme Fumagali Marques](https://github.com/Guilherme-Fumagali),        RA: 792182
  - [Guilherme Silva de Camargo](https://github.com/guilhermesdc),        RA: 792183
  - [Rodrigo Henrique Amaral Araujo](https://github.com/rodrigoamral),    RA: 792241
  - [Vinicius Gabriel Nanini da Silva](https://github.com/N4NiNi),  RA: 795181

## Implementação

Foi implementado uma cena, que pode ser visualizada a partir de uma câmera movel pelos eixos X e Y. Nessa cena temos 4 objetos com diferentes formas geométricas, sendo um cubo, uma pirâmide, um prisma e um hexágono não regular, implementados atravez de uma malha de triangulos, utilizando dois shaders(vertex e fragment). Destes objetos, o cubo possui o movimento de rotação através dos eixos X, Y e Z.

O código foi feito em JavaScript utilizando a API WebGL, HTML, CSS, com algumas bibliotecas de auxílio com operações de matrizes, m4 e MWnew que estão na pasta Resources.

## Como usar

Na página há 3 botões para a rotação do cubo: 
  - Rotate X, para rotação no eixo x.
  - Rotate Y, para rotação no eixo y.
  - Rotate Z, para rotação no eixo z. 

Também há duas barras que podem ser movimentadas, que são usadas para movimentação da camêra: 
  - Barra Vertical: movimentação no eixo Y
  - Barra Horizontal: movimentação no eixo X
  
Link de acesso: https://guilherme-fumagali.github.io/WebGL2/
