document.addEventListener('DOMContentLoaded',()=>{
    let historyDiv=document.querySelector('.history');
    let screen=document.querySelector('.screen')
    let buttons=document.querySelectorAll('.btn')
    let history="";
    let keys= ['0','1','2','3','4','5','6','7','8','9','c','C','+','=','-','*','/','.']

    buttons.forEach((button)=>{
        button.addEventListener('click',()=>{
            handleButtonClick(button.innerText);
        });
    });

    function handleButtonClick(value) {
        if(value==='C' || value=='c')
        {
            clearAll();
        }
        else if(value==='DEL')
        {
            deleteLastChar();
        }
        else if(value==='=')
        {
            evaluateExpression();
        }
        else
        {
            appendToScreen(value)
        }
    }

    function clearAll() {
        screen.textContent=""
        history=""
        updateHistory();
    }

    function deleteLastChar() {
        let currentText=screen.textContent;
        screen.textContent=currentText.slice(0,-1)
    }

    function appendToScreen(value) {
        screen.textContent+=value;
        screen.scrollLeft = screen.scrollWidth;
    }

    function evaluateExpression() {
        try{
            let expression=screen.textContent;
            let result=eval(expression);
            
            result=parseFloat(result.toFixed(5));
            
            history=expression+'='+result;
            screen.textContent=result;
            console.log(typeof(result));
            updateHistory();

            if( result==Infinity || isNaN(result)) {
                setTimeout(() => {
                    screen.textContent='';
                }, 1100);
            }
        }

        catch(error)
        {
            screen.textContent='Error'
            setTimeout(() => {
                screen.textContent='';
            }, 1100);
        }
    }

    function updateHistory() {
        historyDiv.textContent=history;
    }

    document.addEventListener('keydown', function(e) {
        if( keys.includes(e.key)) {
            handleButtonClick(e.key);
            console.log(e);
        }

        else if(e.key=='Backspace') {
            handleButtonClick('DEL');
        }

        else if(e.key=="Enter") {
            e.preventDefault();
            handleButtonClick('=');
        }
    });
});
