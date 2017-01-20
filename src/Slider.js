import React from 'react';
import FlipMove from 'react-flip-move';

import SliderBlock from './SliderBlock.js';

export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { grid: this.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8]) };
    this.onClick = this.onClick.bind(this);
  }

  onClick(number) {
    if (number !== 0) {
      const numberIndex = this.state.grid.indexOf(number);
      const zeroIndex = this.state.grid.indexOf(0);
      if (this.swapIsAllowed(numberIndex, zeroIndex)) {
        this.swapBlocks(numberIndex, zeroIndex);
        if (this.checkVictory()) {
          alert('Victory!!');
        }
      }
    }
  }

  swapIsAllowed(numberIndex, zeroIndex) {
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

  swapBlocks(numberIndex, zeroIndex) {
    const grid = this.state.grid;
    const num = grid[zeroIndex];
    grid[zeroIndex] = grid[numberIndex];
    grid[numberIndex] = num;
    this.setState(grid);
  }

  checkVictory() {
    return this.arraysEqual(this.state.grid, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
  }

  // From http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle(arr) {
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

  arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  renderBlocks() {
    const array = [];
    for (let i = 0; i < 9; i++) {
      array.push(<SliderBlock key={this.state.grid[i]} number={this.state.grid[i]} onClick={this.onClick} />);
    }
    return array;
  }

  renderGrid() {
    return (
        <FlipMove id='slider-container'>
          {this.renderBlocks()}
        </FlipMove>
      );
  }

  render() {
    return (
        <div>
          {this.renderGrid()}
        </div>
    );
  }
}
