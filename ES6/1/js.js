let randomNumber = Math.floor(Math.random() * 100) + 1; //1~100

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;
guessField.focus();

//校验猜测
function checkGuess() {
    let userGuess = Number(guessField.value);
    if (guessCount === 1) {
        guesses.textContent = '上次猜的次数：';
    }
    guesses.textContent += userGuess + ' ';

    if (userGuess === randomNumber) {
        lastResult.textContent = '恭喜你！答对了！';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = '!!!GAME OVER!!!';
        setGameOver();
    } else {
        lastResult.textContent = '你猜错了!';
        lastResult.style.backgroundColor = 'red';
        if (userGuess < randomNumber) {
            lowOrHi.textContent = '你猜低了！';
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = '你猜高了！';
        }
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
}

//监听事件是否符合猜测数字
guessSubmit.addEventListener('click', checkGuess);

//游戏结束,禁止运行，并且添加新游戏按钮
function setGameOver () {
    guessField.disabled = true;     //disabled 属性规定应该禁用的 <input> 元素。
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = '开始新游戏';
    document.body.appendChild(resetButton);     //方法将一个节点附加到指定父节点的子节点列表的末尾处。
    resetButton.addEventListener('click', resetGame);
}

//重新开始游戏
function resetGame() {
    guessCount = 1;
  
    const resetParas = document.querySelectorAll('.resultParas p');
    for (let i = 0 ; i < resetParas.length; i++) {
      resetParas[i].textContent = '';
    }
  
    resetButton.parentNode.removeChild(resetButton);    //Node.removeChild() 方法从DOM中删除一个子节点。返回删除的节点。
  
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
  
    lastResult.style.backgroundColor = 'white';
  
    randomNumber = Math.floor(Math.random() * 100) + 1;        //Math.floor() 返回小于或等于一个给定数字的最大整数。
  }