const Bombs = 40;
const height = 20;
const width = 30;
let arrBombXs = [];
let arrBombYs = [];
let counter = 0;

const generateBombs = () => {

  for (let i = 0; i < Bombs; i++){
    let r = Math.floor(Math.random() * (width-1));
    arrBombXs.push(r); 
  }
  console.log(arrBombXs);

  for (let i = 0; i < Bombs; i++){
    let r = Math.floor(Math.random() * (height-1));
    arrBombYs.push(r); 
  }
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
    else {strRiga += `>X</td>`}

    for(let j = 1; j < width; j++){
      
      strRiga += `<td xId = ${j} yId = ${i}`;
      if(j in arrBombXs || i in arrBombYs){
        if (arrBombXs[arrBombYs.indexOf(i)] == j || arrBombYs[arrBombXs.indexOf(j)] == i){   
          strRiga += `>O</td>`;
          counter++;
        }
        else{strRiga +=`>X</td>`}
      }
      else{strRiga +=`>X</td>`}
      }
    strRiga += "</tr>";
    t.innerHTML += strRiga;
  }
  alert(counter);
}





