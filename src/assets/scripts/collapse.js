check = false;
$(window).on('load resize ',function(){
    $(document).ready(function(){
        if(window.innerWidth>1300){
            class10();            
            $('.verticalNav').css({"opacity":"1"});
            $('#verticalCollapse').css({"maxWidth":"16.7%"})
            $('#toggleButton').html('');
            check = true;
        }
        else if(window.innerWidth<=1300 ){
            if(check){
                $('.verticalNav').css({"opacity":"0"});
                $('#verticalCollapse').css({"maxWidth":"0%"});
                check =false;
            }
            class12();
            $('#toggleButton').html('<button  class="bars"><i class="fas fa-bars"></i></button>');
            $('.bars').css({
                "background":"none",
                "border":"none",
                "color":"white",
                "font-size":"1.2em"
            })
            if (window.innerWidth<=792){
                if(check){
                    $('.verticalNav').css({"opacity":"0"});
                    $('#verticalCollapse').css({"maxWidth":"0%"});
                    check =false;                    
                }            
            }
        }

    });
});
    
class12=function (){
    $('app-error').addClass('col-sm-12');     
    $('app-water-dispense').addClass('col-sm-12'); 
    $('app-transaction').addClass('col-sm-12');   
    $('app-supervisor').addClass('col-sm-12');
    $('app-operator').addClass('col-sm-12');
}
class10=function (){
    $('app-error').removeClass('col-sm-12').addClass('col-sm-10');     
    $('app-water-dispense').removeClass('col-sm-12').addClass('col-sm-10'); 
    $('app-transaction').removeClass('col-sm-12').addClass('col-sm-10');   
    $('app-supervisor').removeClass('col-sm-12').addClass('col-sm-10');
    $('app-operator').removeClass('col-sm-12').addClass('col-sm-10');
    $('#verticalCollapse').removeClass('col-sm-3');
    
}
class3_9=function (){
    $('app-error').removeClass('col-sm-12').removeClass('col-sm-10').addClass('col-sm-9');     
    $('app-water-dispense').removeClass('col-sm-12').removeClass('col-sm-10').addClass('col-sm-9'); 
    $('app-transaction').removeClass('col-sm-12').removeClass('col-sm-10').addClass('col-sm-9');   
    $('app-supervisor').removeClass('col-sm-12').removeClass('col-sm-10').addClass('col-sm-9');
    $('app-operator').removeClass('col-sm-12').removeClass('col-sm-10').addClass('col-sm-9');
    $('#verticalCollapse').addClass('col-sm-3');

}