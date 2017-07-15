console.log('hello world!');

//add an event listener to the button.  When clicked it injects HTML that shows the answer supplied.

var html = `<strong>Answer: </strong> {{answer}}`

const checkButt = document.querySelector(".checkAnswer")
if(checkButt){
  checkButt.addEventListener("click", function(){
    console.log('the button was clicked');
    document.querySelector('.actualAnswer').insertAdjacentHTML('beforeend', html)
  })

}
