import React from 'react';

import SliderBlock from './SliderBlock.js';

export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { grid: this._shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8]) };
    this.onClick = this.onClick.bind(this);
  }

  onClick(number) {
    if (number !== 0) {
      const grid = this.state.grid;
      const numberIndex = grid.indexOf(number);
      const zeroIndex = grid.indexOf(0);
      if (this._swapIsAllowed(numberIndex, zeroIndex)) {
        this._swapBlocks(numberIndex, zeroIndex);
        if (this._checkVictory()) {
          alert('Victory!!');
        }
      }
    }
  }

  _swapIsAllowed(numberIndex, zeroIndex) {
    switch (numberIndex) {
      case 0:
        return [1, 3].includes(zeroIndex);
      case 1:
        return [0, 2, 4].includes(zeroIndex);
      case 2:
        return [1, 5].includes(zeroIndex);
      case 3:
        return [0, 4, 6].includes(zeroIndex);
      case 4:
        return [1, 3, 5, 7].includes(zeroIndex);
      case 5:
        return [2, 4, 8].includes(zeroIndex);
      case 6:
        return [3, 7].includes(zeroIndex);
      case 7:
        return [4, 6, 8].includes(zeroIndex);
      case 8:
        return [5, 7].includes(zeroIndex);
      default:
        throw new Error('Invalid index');
    }
  }

  _swapBlocks(numberIndex, zeroIndex) {
    const grid = this.state.grid;
    const num = grid[zeroIndex];
    grid[zeroIndex] = grid[numberIndex];
    grid[numberIndex] = num;
    this.setState(grid);
  }

  _checkVictory() {
    return this._arraysEqual(this.state.grid, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
  }

  // From http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  _shuffle(arr) {
    const array = arr;
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  _arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  _renderGrid() {
    const grid = this.state.grid;
    return (
        <div id='slider-container'>
            <SliderBlock number={grid[0]} onClick={this.onClick} />
            <SliderBlock number={grid[1]} onClick={this.onClick} />
            <SliderBlock number={grid[2]} onClick={this.onClick} />
            <SliderBlock number={grid[3]} onClick={this.onClick} />
            <SliderBlock number={grid[4]} onClick={this.onClick} />
            <SliderBlock number={grid[5]} onClick={this.onClick} />
            <SliderBlock number={grid[6]} onClick={this.onClick} />
            <SliderBlock number={grid[7]} onClick={this.onClick} />
            <SliderBlock number={grid[8]} onClick={this.onClick} />
        </div>
      );
  }

  render() {
    return (
        <div>
          {this._renderGrid()}
        </div>
    );
  }
}
