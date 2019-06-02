$(document).ready(function () {   
    
    let min=0;       /*минуты таймера*/
    let sec=0;       /*секунды таймера*/
    let msec=0;      /*милисекунды таймера*/
    let timerId=0;   /*id таймера*/
    let stepGames=0; /*ход игры*/
    
    /*Нажатие на кнопку старт - запуск игры*/
    $('#start').click(function () {
            
    fillingPlayField(); /*Заполнение игрового поля*/   
           
    timer(); /*Запуск таймера*/    
                   
    game(); /*Игра*/   
                    
    }); 
    
    
/*Функция для заполнения игрового поля*/

function fillingPlayField() {
    
    /*Отсортированный массив*/
    let randValue=[];
    /*Массив с заранее подготовленными классами со свойствами*/    
    let arrayClasses=["fill1","fill2","fill3","fill4","fill5","fill6","fill7","fill8"];
    /*Номер ячейки в таблице*/    
    let idCell=0;
    /*Общее количество ячеек на игровом поле*/    
    let amountCell=16;
     
    /*Удаление классов, если были*/    
    $('td').removeClass().css({'opacity': '0'});    
    
      /*Цикл по присвоению классов каждой ячейке игрового поля*/       
      for(let i=0;i<amountCell;i++){
          
          if(arrayClasses.length) {
         
        /*Рандомный выбор класса*/      
        let value=Math.floor(Math.random()*arrayClasses.length);
        let selectValue=arrayClasses[value];
        
        /*С помощью данного условия присваиваем только два одинаковых
        класса, удаляя из массива с классами, если пара состоялась.
        Сравниваем по отсортированному массиву*/      
        if(randValue.indexOf(selectValue)==-1){
            randValue.push(selectValue);
            $('table td:eq('+ idCell +')').addClass(selectValue);
        }
        
        else {
            $('table td:eq('+ idCell +')').addClass(selectValue);
            arrayClasses.splice(value,1);
        } 
        
        idCell++;    
            
        };
          
      };
};

/*Функция таймера*/ 
    
function timer() {
    
    /*Обнуляем данные счетчика*/
     min=0;
     sec=0;
     msec=0;
     clearInterval(timerId);
    
     /*Запускаем таймер, обновление каждую мс*/    
        timerId=setInterval(function () {
            msec++;
            if(msec==999){
                sec+=1;
                msec=0;
            };
            if(sec==59){
                min+=1;
                sec=0;
                msec=0;
            };
            
    /*Отображаем данные таймера, для эстетичности добовляем нули*/        
            $('#time').text(('00' + min).slice(-2) + ':' + ('00' + sec).slice(-2) + '.' + ('000' + msec).slice(-3));
        },1);
};
     
/*Функция игрового процесса*/
    
function game() {
    
    let color = [];
    let step = 0;
    
    stepGames=0;    
     
    /*Всем ячейкам присваиваем событие 'click'*/    
    $('table').on('click', 'td', function () {
    
    /*Проверяем отображена или нет ячейка, если нет, то показываем цвет
    и считываем класс для дальнейшего сравнения*/    
        if (($(this).css('opacity'))!=1) {
            $(this).css({'opacity': '1'});
            color[step]=$(this).attr('class');
            step++;
        };
    
    /*Когда появляется пара сравниваем их цвета*/
        if (step == 2) {
            
            let classNameFirst='.' + color[0];
            let classNameSecond='.' + color[1];
      
    /*Если цвета совпали оставляем, в противном случае прячем*/        
            if (color[0] != color[1]) {
                
                setTimeout(function () {                   
                    $(classNameFirst).css({'opacity': '0'});
                    $(classNameSecond).css({'opacity': '0'});
                }, 300);
                
            } else stepGames++;  
            
     /*Игра должна завершиться при правильном отображении восьми пар*/    
        if(stepGames==8) {
            clearInterval(timerId);
            setTimeout(function () {                   
                    alert("Вы выиграли! \nЗатраченное время:" + " " + 
                        ('00' + min).slice(-2) + ':' + ('00' + sec).slice(-2) + '.' + ('000' + msec).slice(-3));
                }, 50);
            stepGames=0;
         };
            
        step=0;
        color=[];
        };
               
    });
};    

    
});

  