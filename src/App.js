import './App.css';
import './Board.css';
import { Board } from './Board.js';
import { ListItem } from './ListItem.js';
//import { Login } from './Login.js';
import { useState,useRef, useEffect } from 'react';
import io from 'socket.io-client';
import React from "react"


const socket = io(); //socket connection


function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [state2, setState2]= useState(0);
  const inputRef = useRef(null);
  const [user_name, setUser_name] = useState([]);
  const [currentView, setCurrentView] = React.useState("view1");
  
  
  const ViewOne = ({onClick}) => (
  <div>
    View 1 <br />
     Enter your user name here: <input ref={inputRef} type="text" />
      {/*<button onClick={onClickButton}></button>*/}
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


  const ViewTwo = ({onClick}) => (
  
   <div>
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
        {board.map(item => <Board onClick={item} /> )}
    </ul>
    {calculateWinner(board,user_name)};
    </div>

    );
    
    
    function calculateWinner(boardCopy,name) {
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
            return 'Winner is: ' + name + ' ' + boardCopy[a]  ;
        }
      }
    return null;
  }
    
   
    const onClickT = i => {
    const boardCopy = [...board];
    if (state2==0){
      boardCopy[i]= 'O' ;
      setBoard(boardCopy);
      setState2(1);
    }
    else{
      boardCopy[i]='X';
      setBoard(boardCopy);
      setState2(0);
    }
    //boardCopy[i]='X';
    //setBoard(boardCopy);
    socket.emit('chat', { boardCopy: i } );
  };
 
  

  useEffect(() => {
    socket.on('chat', (data) => {
      const boardCopy = [...board];
      if (state2==0){
         boardCopy[data.boardCopy]='O';
         setBoard(boardCopy);
         setState2(1);
        
    }
    else{
       boardCopy[data.boardCopy]='X';
       setBoard(boardCopy);
       setState2(0);
    }
    });
   
    
    socket.on('login', (name) => {
      const user_nameCopy = [...user_name];
      console.log(name);
      if (state2==0){
        user_nameCopy[name.user_nameCopy]='O';
        console.log(user_nameCopy[name.user_nameCopy]);
        calculateWinner(board,name);
      }
      else{
        user_nameCopy[name.user_nameCopy]='X';
        console.log(user_nameCopy[name.user_nameCopy]);
        calculateWinner(board,name);
      }
    });
        
      
    
    return ()=> {socket.off()};
  },[board,setState2,user_name]);
  
 
 
  
  
  return (
  
    <div>
    
          {
          currentView === "view1" ? 
          <ViewOne onClick={page => setCurrentView(page)} /> : 
          <ViewTwo onClick={page => setCurrentView(page)} />
       }
    
    
     {/*
    <h1> Tic Toc Toe </h1>
    
       Login here: <input ref={inputRef} type="text" />
      <button onClick={onClickButton}>Send</button>
      <ul>
        {user_name.map((item, index) => <ListItem key={index} name={item} />)}
      </ul>
   

     
     <ul>
      <div class="board">
        <div class="box" id="box1" onClick={() => onClick(0)}>{board[0]}</div>
        <div class="box" id="box2" onClick={() => onClick(1)}>{board[1]}</div>
        <div class="box" id="box3" onClick={() => onClick(2)}>{board[2]}</div>
        <div class="box" id="box4" onClick={() => onClick(3)}>{board[3]}</div>
        <div class="box" id="box5" onClick={() => onClick(4)}>{board[4]}</div>
        <div class="box" id="box6" onClick={() => onClick(5)}>{board[5]}</div>
        <div class="box" id="box7" onClick={() => onClick(6)}>{board[6]}</div>
        <div class="box" id="box8" onClick={() => onClick(7)}>{board[7]}</div>
        <div class="box" id="box9" onClick={() => onClick(8)}>{board[8]}</div>
        </div>
        {board.map(item => <Board onClick={item} /> )}
    </ul>
*/}
    </div>
  );
}
export default App;


{/*
import logo from './logo.svg';
import './App.css';
import { Listitem } from './Listitem.js'
import { useState, useRef } from 'react';
//import { useState, useRef } from 'react'

function App() {
  const [myList,changeList]=useState([])
  const inputRef=useRef(null);
  
  function onClickButton(){
    const userText=inputRef.current.value;
    changeList(prevList => [...prevList,userText]);
  }
  
  
  return (
    <div>
      <h1> Tic Toc Toe </h1>
      <input ref={inputRef} type="text" />
      <button onClick={onClickButton}>Add to list</button>
      <ul>
      {myList.map(item => <Listitem name={item} />)}
      </ul>
    </div>
  );
}

export default App;
*/}