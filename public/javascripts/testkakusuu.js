function getStrokes(text){
  var textArray = text.split('');
  var stroke = 0;

  for (var i = 0; i < textArray.length; i++) {
    switch ( textArray[i] ) {
      case "C":
      case "L":
      case "O":
      case "S":
      case "U":
          stroke = stroke + 1 ;
          break;
      case "B":
      case "D":
      case "G":
      case "J":
      case "P":
      case "Q":
      case "T":
      case "V":
      case "X":
      case "Z":
          stroke = stroke + 2 ;
          break;
      case "A":
      case "F":
      case "H":
      case "I":
      case "K":
      case "N":
      case "R":
      case "Y":
          stroke = stroke + 3 ;
          break;
      case "E":
      case "M":
      case "W":
          stroke = stroke + 4 ;
          break;
      default:
          console.log("ERROR");
          break;
    }
  }

  console.log(stroke);
  return stroke;

}
