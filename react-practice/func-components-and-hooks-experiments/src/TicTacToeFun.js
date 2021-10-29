import { useState } from 'react';

const blocksArr = [
  { id: 1, stat: null, points: 0 },
  { id: 2, stat: null, points: 0 },
  { id: 3, stat: null, points: 0 },
  { id: 4, stat: null, points: 0 },
  { id: 5, stat: null, points: 0 },
  { id: 6, stat: null, points: 0 },
  { id: 7, stat: null, points: 0 },
  { id: 8, stat: null, points: 0 },
  { id: 9, stat: null, points: 0 },
];

//#region stylings
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
  fontSize: 'xxx-large',
  fontFamily: 'monospace, sans-serif',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};
//#endregion

const TicTacToeFun = () => {
  const [gameBoard, setGameBoard] = useState(blocksArr);
  const [stat, setStat] = useState(null);  // 'x', 'o', null
  const [winMessage, setWinMessage] = useState('');
  const [runGameLogic, setRunGameLogic] = useState(false); // so gameLogic runs after click event completes; a hack

  const gameLogic = () => {
    setRunGameLogic(false);
    // look thru arr indices, 
    // winning index combos: (0,1,2), (3,4,5), (6,7,8),  (0,3,6), (1,4,7), (2,5,8),  (0,4,7), (2,4,6)
    // if combos all 'x' or 'o', then win


    // should refactoor bc there is likely a better approach to check the win combos?
    const winCombos = [
      gameBoard[0].stat + gameBoard[1].stat + gameBoard[2].stat,
      gameBoard[3].stat + gameBoard[4].stat + gameBoard[5].stat,
      gameBoard[6].stat + gameBoard[7].stat + gameBoard[8].stat,
      gameBoard[0].stat + gameBoard[3].stat + gameBoard[6].stat,
      gameBoard[1].stat + gameBoard[4].stat + gameBoard[7].stat,
      gameBoard[2].stat + gameBoard[5].stat + gameBoard[8].stat,
      gameBoard[0].stat + gameBoard[4].stat + gameBoard[8].stat,
      gameBoard[2].stat + gameBoard[4].stat + gameBoard[6].stat,
    ];

    for (let i = 0; i < winCombos.length; i++) {
      if (winCombos[i] === 'xxx') {
        setWinMessage('Green wins!');
      } else if (winCombos[i] === 'ooo') {
        setWinMessage('Red wins!');
      }
      console.log('combo1...', winCombos);
    }
  };

  const handleBlockClick = (e, i) => {
    // console.log('clicked...', e.target.innerHTML);
    // console.log('index of clicked el...', i);

    // find clicked el in gameBoard arr
    let clicked = gameBoard.find(block => block.id === i + 1);
    console.log('clicked...', clicked);

    // find if first block click, then color change and updat gameBoard[i+1] stat and switch 'x' to 'o'
    const statCount = gameBoard.every(block => block.stat === null); // return true if all stats equal null
    // console.log('statCount...', statCount);
    if (statCount) {
      e.target.style.backgroundColor = 'green';

      // deep clone gameBoard, so new arr doesnt point to original ref point and doesnt modify original arr
      const tempBoard = JSON.parse(JSON.stringify(gameBoard));
      tempBoard[i].stat = 'x';
      tempBoard[i].points += 1;
      setGameBoard([...tempBoard]);
      setStat('x');
      setRunGameLogic(true);
    }

    // switch click btwn 'red' and 'green'
    if (clicked.stat === null && stat === 'x') {
      e.target.style.backgroundColor = 'red';
      const tempBoard = JSON.parse(JSON.stringify(gameBoard));
      tempBoard[i].stat = 'o';
      tempBoard[i].points += 2;
      setGameBoard([...tempBoard]);
      setStat('o');
      setRunGameLogic(true);
    } else if (clicked.stat === null && stat === 'o') {
      e.target.style.backgroundColor = 'green';
      const tempBoard = JSON.parse(JSON.stringify(gameBoard));
      tempBoard[i].stat = 'x';
      tempBoard[i].points += 1;
      setGameBoard([...tempBoard]);
      setStat('x');
      setRunGameLogic(true);
    }

    console.log('gameBoard after each click...', gameBoard); // this will be one state behind each click
  };

  // to prevent gamelogic to execute before handleblockclick completes its run 
  if (runGameLogic) {
    gameLogic();
  }

  return (
    <>
      <h2 className='textCenter'>TicTacToe</h2>
      <div style={containerStyles}>
        {gameBoard.map((eachBlock, i) =>
          <div
            key={i}  // can also just be eachBlock.id
            style={blockStyles}
            onClick={(e) => handleBlockClick(e, i)}
          >
            <div style={{ fontWeight: 900, pointerEvents: 'none' }}>{eachBlock.stat}</div>
          </div>
        )}
      </div>
      <div className='textCenter' style={{ fontWeight: 900, fontSize: 'x-large' }}>{winMessage}</div>
    </>
  )
};

export default TicTacToeFun;