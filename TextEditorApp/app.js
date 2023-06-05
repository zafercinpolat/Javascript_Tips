let optionsButtons =  document.querySelectorAll(".option-button");
let advancedOptionsButton  = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea =  document.getElementById("text-input");
let linkButton = document.getElementById("createLink")
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons =  document.querySelectorAll(".format");
let scriptButtons =  document.querySelectorAll(".script");



let fontList= ["Arial","Verdana","Times New Roman","Garamond","Georgia","Courier New","Cursive"];


const highlighter = (className,needsRemoval)=>{
    className.forEach((button) => {
        button.addEventListener("click", ()=>{
            if(needsRemoval){
                let alreadyActive=  false;
                if(button.classList.contains("active")){
                    alreadyActive = true;
                }
                higlighterRemover(className);
                if(!alreadyActive){
                    button.classList.add("active");
                }
            }else{
                button.classList.toggle("active");
            }
        });
    });
}

const higlighterRemover = (className) =>{
    className.forEach((button)=>{
        button.classList.remove("active");
    });
}

const initializer = ()=>{
    highlighter(alignButtons,true);
    highlighter(spacingButtons,true);
    highlighter(formatButtons,true);
    highlighter(scriptButtons,true);

    fontList.map((item)=>{
        let option  = document.createElement("option");
        option.value=item;
        option.innerHTML = item;
        fontName.appendChild(option)
    });

    //set FontSize
    for(let i=10; i<=16;i++){
    let option = document.createElement("option");
        option.value= i;
        option.innerHTML= i;
        fontSizeRef.appendChild(option);
        fontSizeRef.value = 12; 
    }
}

const modifyText = (command, defaultUi, value)=>{
    document.execCommand(command,defaultUi,value);
}

optionsButtons.forEach((button) => {
    button.addEventListener("click",()=>{
        modifyText(button.id,false,button.value);
    })
});


advancedOptionsButton.forEach((button) =>{
    button.addEventListener("change", ()=>{
        modifyText(button.id,false,button.value);
    });
})

linkButton.addEventListener("click", ()=>{
    let userLink = prompt("enter url address?");
    if(/http/i.test(userLink)){
        modifyText(linkButton.id,false,userLink);
    }else{
        userLink  = 'http://'+userLink;
        modifyText(linkButton.id,false,userLink);
    }
});

window.onload= initializer();
