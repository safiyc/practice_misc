import { useState } from 'react';

const blocksArr = [
  { val: 1, stat: null },
  { val: 2, stat: null },
  { val: 3, stat: null },
  { val: 4, stat: null },
  { val: 5, stat: null },
  { val: 6, stat: null },
  { val: 7, stat: null },
  { val: 8, stat: null },
  { val: 9, stat: null },
];

const containerStyles = {
  border: '1px solid black',
  display: 'flex',
  flexWrap: 'wrap',
  margin: '0 auto',
  justifyContent: 'space-evenly',
  alignContent: 'space-evenly',
  height: 300,
  width: 300
};

const blockStyles = {
  backgroundColor: 'grey',
  height: 92,
  width: 92,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const TicTacToeFun = () => {
  const [stat, setStat] = useState(null);  // 'x', 'o', null



  const handleBlockClick = (e, i) => {
    // console.log('clicked...', e.target.innerHTML);
    console.log('i...', i);

    // find clicked block obj
    let clicked = blocksArr.find(block => block.val === i + 1);
    console.log('clicked...', clicked);

    // find if first block click, then color change and updat blocksArr[i+1] stat and switch 'x' to 'o'
    const statCount = blocksArr.every(block => block.stat === null); // return true if all stats equal null
    console.log('statCount...', statCount);
    if (clicked.stat === null) {
      if (statCount) {
        e.target.style.backgroundColor = 'green';
        blocksArr[i].stat = 'x';
        setStat('x');
      }

      if (stat === 'x') {
        e.target.style.backgroundColor = 'red';
        blocksArr[i].stat = 'o';
        setStat('o');
      } else if (stat === 'o') {
        e.target.style.backgroundColor = 'green';
        blocksArr[i].stat = 'x';
        setStat('x');
      }
    }

    console.log('blocksArr after each click...', blocksArr);
  };

  return (
    <>
      <h2 className='textCenter'>TicTacToe</h2>
      <div style={containerStyles}>
        {blocksArr.map((eachBlock, i) =>
          <div
            key={i}
            style={blockStyles}
            onClick={(e) => handleBlockClick(e, i)}
          >
            <div style={{ fontWeight: 900, pointerEvents: 'none' }}>{eachBlock.val}</div>
          </div>
        )}
      </div>
    </>
  )
};

export default TicTacToeFun;