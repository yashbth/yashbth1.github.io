$(window).on('load resize',function(){
    check = false;
    $(document).ready(function(){
        if(window.innerWidth>1300){
            class10();
            $('#toggleButton').html('');
            
        }
        else if(window.innerWidth<=1300){
            class12();
            $('#toggleButton').html('<button (click)="toggle()" class="bars"><i class="fas fa-bars"></i></button>');
            $('.bars').css({
                "background":"none",
                "border":"none",
                "color":"white",
                "font-size":"1.2em"
        })
        }
    });
});
    
function class12(){
    $('app-error').addClass('col-sm-12');     
    $('app-water-dispense').addClass('col-sm-12'); 
    $('app-transaction').addClass('col-sm-12');   
    $('app-supervisor').addClass('col-sm-12');
    $('app-operator').addClass('col-sm-12');
}
function class10(){
    $('app-error').removeClass('col-sm-12').addClass('col-sm-10');     
    $('app-water-dispense').removeClass('col-sm-12').addClass('col-sm-10'); 
    $('app-transaction').removeClass('col-sm-12').addClass('col-sm-10');   
    $('app-supervisor').removeClass('col-sm-12').addClass('col-sm-10');
    $('app-operator').removeClass('col-sm-12').addClass('col-sm-10');
}