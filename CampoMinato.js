const Bombs = 15;
const height = 30;
const width = 20;

window.onload = function generateField () {
  let strRiga = "<th><th> </th>";
  for (let i = 0; i < height; i++){
    strRiga += "<th> </th>";
  }
  strRiga += "</tr>";
  

  t = document.getElementById("Field");
	t.innerHTML = ""; 
	t.innerHTML = strRiga;

  for(let i = 0; i < width; i++){
    strRiga = `<tr><td xId = ${i} yId = 0>X</td>`;
    for(let j = 0; j < (height-1); j++){strRiga += `<td xId = ${i} yId = ${j+1}>X</td>`}
    strRiga += "</tr>";
    t.innerHTML += strRiga;
  }
}





