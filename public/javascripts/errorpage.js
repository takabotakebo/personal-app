var sendData = {
  gender : localStorage.getItem("gender")
};

console.log(sendData);
console.log("DATETIME is :" + localStorage.getItem("createdAt"));
localStorage.clear();
console.log("DELETE LOCALSTRAGE");
