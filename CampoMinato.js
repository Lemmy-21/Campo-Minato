const Bombs = 10;
const height = 20;
const width = 30;
let arrBombXs = [];
let arrBombYs = [];
let counter = 0;

const bombExists = (ArrX, ArrY) => {
  for(let i in ArrX){
    for(let j in ArrX){
      if(ArrX[i] == ArrX[j] && i != j){
        if(ArrY[i] == ArrY[j]){return true}else{return false}
      }else{return false}
    }
  }
}

const generateBombs = () => {

  let c = 0
  while (c < Bombs) {

    let x = Math.floor(Math.random() * (width-1));
    let y = Math.floor(Math.random() * (height-1));

    arrBombYs.push(y);
    arrBombXs.push(x);

    if(bombExists(arrBombXs, arrBombYs) == true){
      arrBombYs.pop(); 
      arrBombXs.pop(); 
    } else{c++}
  }

  console.log(arrBombXs);
  console.log(arrBombYs);
}

window.onload = function generateField () {
  generateBombs();
  let strRiga = "<th><th> </th>";
  for (let i = 0; i < height; i++){
    strRiga += "<th> </th>";
  }
  strRiga += "</tr>";
  

  t = document.getElementById("Field");
	t.innerHTML = ""; 
	t.innerHTML = strRiga;

  for(let i = 0; i < height; i++){
    strRiga = `<tr><td xId = 0 yId = ${i}`;
    if(0 in arrBombXs && i == arrBombYs[arrBombXs.indexOf(0)]){strRiga += `>O</td>`}
    else {strRiga += `> </td>`}

    for(let j = 1; j < width; j++){
      
      strRiga += `<td xId = ${j} yId = ${i}`;
      if(j in arrBombXs || i in arrBombYs){
        if (arrBombXs[arrBombYs.indexOf(i)] == j || arrBombYs[arrBombXs.indexOf(j)] == i){   
          strRiga += `>O</td>`;
          counter++;
        }
        else{strRiga +=`> </td>`}
      }
      else{strRiga +=`> </td>`}
      }
    strRiga += "</tr>";
    t.innerHTML += strRiga;
  }
  alert(counter);
}





