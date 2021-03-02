import './App.css';
import './Board.css';
import { Board } from './Board.js';
import { ListItem } from './ListItem.js';
import { useState,useRef, useEffect } from 'react';
import io from 'socket.io-client';
import React from "react"

const socket = io(); 

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [state2, setState2]= useState(0);
  const inputRef = useRef(null);
  const [user_name, setUser_name] = useState([]);
  const [currentView, setCurrentView] = React.useState("view1");
  const win = calculateWinner(board);
  const [login,setLogin] = useState([]);
  const [ isXNext, setIsXNext ] = useState(true);
  const nextSymbol = isXNext ? "X" : "O";
  
  
  const ViewOne = ({onClick}) => (
  <div class="buttons">
     Enter your user name: <input ref={inputRef} type="text" />
      <button onClick={onClickButton}>send</button>
      <ul>
        {user_name.map((item, index) => <ListItem key={index} name={item} />)}
      </ul>
   <button onClick={() => onClick("view2")}>Login to Game</button>
  </div>
  );


  function  onClickButton() {
    if (inputRef != null) {
      const user_name = inputRef.current.value;
      setUser_name(prevMessages => [...prevMessages, user_name]);
      socket.emit('login', { message: user_name });
    }
  }
  
   function getStatus(login) {
    if (win) {
      if (login[0]===win){
        return ( <h4> Winner:  {login[0]} </h4>);
      }
      else{
        return ( <h4> Winner:  {login[1]} </h4>);
      }
    } else if (isBoardFull(board)) {
      return "Draw!";
    } else {
      return "Next player: " + user_name+ nextSymbol;
    }
  }
  
  
  function isBoardFull(board) {
  for (let i = 0; i < board.length; i++) {
    if (board[i] == null) {
      return false;
    }
  }
  return true;
 }

	
  function refreshPage() {
    window.location.reload(false);
  }
  
  
  function renderRestartButton() {
    return (
      <Restart
        onClick={() => {
          setBoard(Array(9).fill(null));
          setIsXNext(true);
        }}
      />
    );
  }
  
  
  function Restart({ onClick }) {
  return (
    <button className="restart" onClick={onClick}>
      Play again
    </button>
  );
  }


  const ViewTwo = ({onClick}) => (
   <div>
   <h2 class="header">Welcome to TIC TOC TOE Game</h2>
   <ul>
      <div class="board">
        <div class="box" id="box1" onClick={() => onClickT(0)}>{board[0]}</div>
        <div class="box" id="box2" onClick={() => onClickT(1)}>{board[1]}</div>
        <div class="box" id="box3" onClick={() => onClickT(2)}>{board[2]}</div>
        <div class="box" id="box4" onClick={() => onClickT(3)}>{board[3]}</div>
        <div class="box" id="box5" onClick={() => onClickT(4)}>{board[4]}</div>
        <div class="box" id="box6" onClick={() => onClickT(5)}>{board[5]}</div>
        <div class="box" id="box7" onClick={() => onClickT(6)}>{board[6]}</div>
        <div class="box" id="box8" onClick={() => onClickT(7)}>{board[7]}</div>
        <div class="box" id="box9" onClick={() => onClickT(8)}>{board[8]}</div>
        </div>
        <div className="game-info">{getStatus(login)}</div>
        <div className="restart-button">{renderRestartButton()}</div>
        <div className="game-info">
        <button onClick={refreshPage}>Click to reload!</button>
        </div>
    </ul>
    {calculateWinner(board,login)};
    </div>
    );
    
    
    function calculateWinner(boardCopy,winner_person) {
        const lines = [
                       [0, 1, 2],
                       [3, 4, 5],
                       [6, 7, 8],
                       [0, 3, 6],
                       [1, 4, 7],
                       [2, 5, 8],
                       [0, 4, 8],
                       [2, 4, 6],
                      ];
        for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (boardCopy[a] && boardCopy[a] === boardCopy[b] && boardCopy[a] === boardCopy[c]) {
            //socket.emit('winner', { message: winner_person });
            return (
              'Winner is: ' +boardCopy[a] 
              );
            
        }
      }
    return null;
  }
    
   
    const onClickT = i => {
    const boardCopy = [...board];
      boardCopy[i]= nextSymbol ;
      setBoard(boardCopy);
      setIsXNext(!isXNext);

    socket.emit('chat', { boardCopy: i } );
  };
 
  

  useEffect(() => {
    socket.on('chat', (data) => {
      const boardCopy = [...board];
         boardCopy[data.boardCopy]=nextSymbol;
         setBoard(boardCopy);
         setIsXNext(!isXNext);
    });
   
    
    socket.on('login', (Login_name) => {
      //const loginCopy = [...login];
      console.log(Login_name);
      //if (state2==0){
        //loginCopy[Login_name.loginCopy]=nextSymbol;
        setLogin(Login_name);
       // console.log(loginCopy[Login_name.user_nameCopy]);
        //calculateWinner(board,name);
      //}
     // else {
        //user_nameCopy[Login_name.user_nameCopy]=nextSymbol;
        setLogin(Login_name);
       // console.log(user_nameCopy[Login_name.user_nameCopy]);
        //calculateWinner(board,name);
     // }
    });
    
     //socket.on('winner', (winner_person) => {
     //  setWinner(winner_person.user_name);
   //  }
    //);
        
    return ()=> {socket.off()};
  },[board,user_name]);
  
  return (
    <div>
          {
          currentView === "view1" ? 
          <ViewOne onClick={page => setCurrentView(page)} /> : 
          <ViewTwo onClick={page => setCurrentView(page)} />
       }
    </div>
  );
}
export default App;
