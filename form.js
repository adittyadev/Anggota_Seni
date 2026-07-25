const answers = {};

function renderQuestions(){

const page1 =
document.getElementById("questionPage1");

const page2 =
document.getElementById("questionPage2");

page1.innerHTML="";
page2.innerHTML="";

questions.forEach((q,index)=>{

const card = document.createElement("div");

card.className="question-card";

card.innerHTML=`

<h3>${q.id}. ${q.question}</h3>

<textarea
id="answer${q.id}"
placeholder="Tuliskan jawaban Anda..."
></textarea>

`;

if(index<10){

page1.appendChild(card);

}else{

page2.appendChild(card);

}

});

}