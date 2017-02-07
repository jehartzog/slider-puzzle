import React from 'react';
import FlipMove from 'react-flip-move';

import SliderBlock from './SliderBlock.js';

export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { grid: this.generateRandomPuzzle() };
    this.onClick = this.onClick.bind(this);
    this.isAnimating = false;
  }

  animationDuration = () => 350;

  generateRandomPuzzle(solveable = true) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let grid = this.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    while(this.isSolvable(grid) !== solveable) {
      grid = this.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    }
    return grid;
  }

  onClick(number) {
    if (number === 0 || this.isAnimating) {
      return;
    }

    const numberIndex = this.state.grid.indexOf(number);
    const zeroIndex = this.state.grid.indexOf(0);
    if (this.swapIsAllowed(numberIndex, zeroIndex)) {
      this.swapBlocks(numberIndex, zeroIndex);
      this.preventMultipleClick();
      if (this.checkVictory()) {
        setTimeout(() => alert('Victory!!'), this.animationDuration());
      }
    }
  }

  swapIsAllowed(numberIndex, zeroIndex) {
    switch (numberIndex) {
      case 0:
        return [1, 3].indexOf(zeroIndex) >= 0;
      case 1:
        return [0, 2, 4].indexOf(zeroIndex) >= 0;
      case 2:
        return [1, 5].indexOf(zeroIndex) >= 0;
      case 3:
        return [0, 4, 6].indexOf(zeroIndex) >= 0;
      case 4:
        return [1, 3, 5, 7].indexOf(zeroIndex) >= 0;
      case 5:
        return [2, 4, 8].indexOf(zeroIndex) >= 0;
      case 6:
        return [3, 7].indexOf(zeroIndex) >= 0;
      case 7:
        return [4, 6, 8].indexOf(zeroIndex) >= 0;
      case 8:
        return [5, 7].indexOf(zeroIndex) >= 0;
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

  preventMultipleClick() {
    this.isAnimating = true;
    setTimeout(() => this.isAnimating = false, this.animationDuration());
  }

  checkVictory() {
    return this.arraysEqual(this.state.grid, [0, 1, 2, 3, 4, 5, 6, 7, 8]) ||
      this.arraysEqual(this.state.grid, [1, 2, 3, 4, 5, 6, 7, 8, 0]);
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

  // From https://gist.github.com/caseyscarborough/6544636
  // This method takes a two dimensional array representing
  // a sliding puzzle, and determines if it is solvable.
  isSolvable(grid) {
    let inversions = 0;

    for(let i = 0; i < grid.length - 1; i++) {
      // Check if a larger number exists after the current
      // place in the array, if so increment inversions.
      for(let j = i + 1; j < grid.length; j++)
        if(grid[i] > grid[j]) inversions++;

      // Determine if the distance of the blank space from the bottom
      // right is even or odd, and increment inversions if it is odd.
      if(grid[i] === 0 && i % 2 === 1) inversions++;
    }

    // If inversions is even, the puzzle is solvable.
    return (inversions % 2 === 0);
  }

  // From http://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
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
    return this.state.grid.map(number => (
      <SliderBlock key={number} number={number} onClick={this.onClick} />
    ));
  }

  render() {
    return (
      <FlipMove duration={this.animationDuration()} id='slider-container'>
        {this.renderBlocks()}
      </FlipMove>
    );
  }
}
