var List = [];

var List = JSON.parse(localStorage.getItem("bookList")) || [];

List.forEach(Book => {
    CreateCard(Book.Title , Book.Author , Book.Pages , Book.Read)
});

$('#staticBackdrop').on('hide.bs.modal', function () {


  if (
    document.activeElement &&
    document.activeElement.closest('#staticBackdrop')
  ) {
    document.activeElement.blur();
  }
});


function CreateCard(title,author,pages,read,index){

    if(read === true){
        var r_but = `<button class="btn btn-tall" id="read" type="button" data-index="${index}">Read</button>` ;
    }
    else if(read === false){
        var r_but = `<button class="btn btn-tall" id="Not-read" type="button" data-index="${index}">Not Read</button>`;
    }

    var html = `
                <div class="col " data-index="${index}">
                    <div class="card shadow-sm">
                        <div class="row ">
                            <div class="col pt-3">
                                <p>📓 : ${title}</p> 
                                <p>✍️ : ${author}</p>
                                <p>📑 : ${pages}</h1>
                                <div class="row">
                                    <div class="d-flex flex-column col-10 mx-auto py-2 gap-2">
                                        ${r_but}                                        
                                        <button class="btn btn-light btn-tall btn-remove" type="button" data-index="${index}">Remove</button>
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
    
    
    `
    document.querySelector("#Target-cont").insertAdjacentHTML('beforeend', html);
}


$(".btn-sub").on("click", function () {
    var title = $("#Title").val();
    var author = $("#Author").val();
    var pages = $("#Pages").val();
    var read = $("#Read").prop('checked');

    if( title === '' || 
   author === '' || 
   pages === '' ) {
    alert("ENTER VALUES")
  } else{
            List.push({
            Title: title,
            Author: author,
            Pages: pages,
            Read: read
        });

        localStorage.setItem("bookList" , JSON.stringify(List));

        CreateCard(title,author,pages,read,(List.length-1));

        $("#Title").val('');
        $("#Author").val('');
        $("#Pages").val('');
        $("#Read").prop('checked', false);

        
  }
  
});

$(document).on("click",".btn-tall",function(){
    var ind = $(this).data("index");

    if($(this).attr("id") === "read"){
        $(this).attr("id","Not-read");
        $(this).text("Not read");
        List[ind].Read = false;
    }
    else if($(this).attr("id") === "Not-read"){
        $(this).attr("id","read");
        $(this).text("read")
        List[ind].Read = true;
    }

    localStorage.setItem("bookList",JSON.stringify(List));
});     

$("#flexSwitchCheckDefault").on("click" , function(){

    var darkMode = $("#flexSwitchCheckDefault").prop("checked");

    if(darkMode === true){
        $("body").attr("data-bs-theme","dark")
        $(".add").css("color" , "white");
    }
    else if(darkMode === false){
        $("body").attr("data-bs-theme","")
        $(".add").css("color" , "black");
    }
});

$(document).on("click",".btn-remove",function(){
    var inde = $(this).data("index");

    List.splice(inde , 1);
    localStorage.setItem("bookList",JSON.stringify(List));

    $("#Target-cont").empty();
    List.forEach((Book,i)=>{
        CreateCard(Book.Title,Book.Author,Book.Pages,Book.Read,i);
    });
});