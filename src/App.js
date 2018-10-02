import React, { Component } from 'react';
import './App.css';

let board = [
  [ 1, 1, 1, 1, 1, 1, 1, 1 ],
  [ 1, 1, 1, 1, 1, 1, 1, 1 ],
  [ 1, 1, 1, 1, 1, 1, 1, 1 ],
  [ 1, 1, 1, 1, 1, 1, 1, 1 ],
  [ 1, 1, 1, 1, 1, 1, 1, 1 ],
  [ 1, 1, 1, 1, 1, 1, 1, 1 ],
  [ 1, 1, 1, 1, 1, 1, 1, 1 ],
  [ 1, 1, 1, 1, 1, 1, 1, 1 ]
]

console.table(board);

let mines = 10;
let height = 8;
let width = 8;
let minesAdded = 0;

const makeBombs = () =>
{
  while(minesAdded < mines)
  {
    let randomHeight = Math.floor(Math.random() * height);
    let randomWidth = Math.floor(Math.random() * width);
    if (board[randomHeight][randomWidth] === 1)
    {
      board[randomHeight][randomWidth] = 0;
      minesAdded++;
    }
  }
};

makeBombs();

console.table(board);

const getNeighbors = (board, h, w) =>
{

  let neighbors = [];

      // top left
      if(h > 0 && w > 0)
      {
        neighbors.push(board[h - 1][w - 1])
      }

      // top
      if(h > 0)
      {
        neighbors.push(board[h - 1][w])
      }

      // top right
      if(h > 0 && w < width - 1)
      {
        neighbors.push(board[h -1][w + 1])
      }

      // right
      if(w < width - 1)
      {
        neighbors.push(board[h][w + 1])
      }

      // bottom right
      if(h < height - 1 && w < width - 1)
      {
        neighbors.push(board[h + 1][w + 1])
      }

      // bottom
      if(h < height - 1)
      {
        neighbors.push(board[h + 1][w])
      }

      // bottom left
      if(h < height - 1 && w > 0)
      {
        neighbors.push(board[h + 1][w - 1])
      }

      // left
      if(w > 0)
      {
        neighbors.push(board[h][w - 1])
      }
    
    return neighbors;
};

const countBombs = () =>
{
  for(let h = 0; h < height; h++)
  {
    for(let w = 0; w < width; w++)
    {    
      if(board[h][w] !== 0)
      {
        let result = getNeighbors(board, h, w);
        let numberOfBombs = result.filter( x => x === 0 ).length;
        board[h][w] = numberOfBombs > 0 ? numberOfBombs : null;
      }
    }
  }
};

countBombs();

console.table(board);

class App extends Component
{
  state = {
    board: this.makeBoard(),
  };

  makeBoard()
  {
    let boardData = [];

    for(let i = 0; i < this.props.height; i++)
    {
      boardData.push([]);
      for(let j = 0; j < this.props.width; j++)
      {
        boardData[i][j] = {
          neighbors: 0,
          isBomb: false
        };
      }
    }

    return boardData
  }

  renderBoard()
  {
    return this.state.board.map(bRow =>
    {
      return bRow.map(bItem =>
      {
        return (
        <div>
          <span>{ bItem.neighbors }</span>
          {bRow[bRow.length - 1] === bItem ? <br/> : ""}
        </div>
        );
      })
    })
  }

  render()
  {
    console.table(this.state.board);
    return (
      <div>
        { this.renderBoard() }
      </div>
    );
  }
}

export default App;
