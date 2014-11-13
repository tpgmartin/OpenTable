$(function() {
  var limited = ['Cheesecake'];

  for (var index in menu) {
    if (menu[index].course === 'Starters') {
      var name = 'starters';
      var value = menu[index].price;
      var to_append = '<div id=' + menu[index].name.replace(/\s+/g, '-').toLowerCase() + '>' + '<input type="radio" name="person1'+ name + '" value="'+ value + '"> ' + 
      'Person 1' + ' ' + '<input type="radio" name="person2'+ name + '" value="'+ value + '"> ' + 
      'Person 2' + ' ' + menu[index].name + ' &#163;' + String(menu[index].price.toFixed(2)) + '<br><br>' + '</div>'
      $('#starters').append(to_append);
    } else if (menu[index].course === 'Main course') {
      var name = 'mains';
      var value = menu[index].price;
      var to_append = '<div id=' + menu[index].name.replace(/\s+/g, '-').toLowerCase() + '>' + '<input type="radio" name="person1'+ name + '" value="'+ value + '"> ' + 
      'Person 1' + ' ' + '<input type="radio" name="person2'+ name + '" value="'+ value + '"> ' + 
      'Person 2' + ' ' + menu[index].name + ' &#163;' + String(menu[index].price.toFixed(2)) + '<br><br>' + '</div>'
      $('#mains').append(to_append);
    } else if (menu[index].course === 'Desserts') {
      var name = 'desserts';
      var value = menu[index].price;
      var to_append = '<div id=' + menu[index].name.replace(/\s+/g, '-').toLowerCase() + '>' + '<input type="radio" name="person1'+ name + '" value="'+ value + '"> ' + 
      'Person 1' + ' ' + '<input type="radio" name="person2'+ name + '" value="'+ value + '"> ' + 
      'Person 2' + ' ' + menu[index].name + ' &#163;' + String(menu[index].price.toFixed(2)) + '<br><br>' + '</div>'
      $('#desserts').append(to_append);
    } else {
      console.log('Error');
    }

  }

  if ( $(':radio:checked').length > 0 ) {
    update_sum();
  }

  // Adapted from 'Unselecting Radio Buttons with jQuery' 12Robots.com
  // Deselect radio button onclick
  $(function(){
    var allRadios = $(':radio')
    var radioChecked;
    
    var setCurrent = 
      function(e) {
        var obj = e.target;
        radioChecked = $(obj).attr('checked');
      }
                            
    var setCheck = 
      function(e) {
          
      var obj = e.target;
            
      if (radioChecked) {
        $(obj).attr('checked', false);
      } else {
        $(obj).attr('checked', true);
      }
    }    
                             
    $.each(allRadios, function(i, val){        
      var label = $('label[for=' + $(this).attr("id") + ']');
         
    $(this).bind('mousedown', function(e){
      setCurrent(e);
    });
        
    label.bind('mousedown', function(e){
      e.target = $('#' + $(this).attr("for"));
      setCurrent(e);
    });
     
      $(this).bind('click', function(e){
        setCheck(e); 
        update_sum(); 
        check_choices(); 
      });
    });
  });

  $(':radio').change(function() {
    check_cheesecake()
    no_prawn_salmon_combo()
    update_sum();
    check_choices();
  });
});

// helper functions

function update_sum () {
  var sum = 0;
  $(':radio:checked').each(function () {
       sum += parseInt($(this).val());
   });
  $('#total-container>h2').text('Total to Pay:');
  $('#total').text('£' + String(sum.toFixed(2)));
  if (!$('#total-container').hasClass('payment')) {
    $('#total-container').addClass('payment').append('<button name="button" disabled>Pay</button>');
  }
}

function check_choices () {
  if ( $(':radio[name="person1starters"]:checked, :radio[name="person1mains"]:checked, :radio[name="person1desserts"]:checked').length >= 2 && $(':radio[name="person2starters"]:checked, :radio[name="person2mains"]:checked, :radio[name="person2desserts"]:checked').length >= 2 && $(':radio[name="person1mains"]:checked').length > 0 && $(':radio[name="person2mains"]:checked').length > 0 && $('#cheesecake').children(':checked').length < 2 && !($(':radio[name=person1starters]', '#prawn-cocktail').is(':checked') && $(':radio[name=person1mains]', '#salmon-fillet').is(':checked')) && !($(':radio[name=person1starters]', '#prawn-cocktail').is(':checked') && $(':radio[name=person1mains]', '#salmon-fillet').is(':checked'))) {
    $('button').removeAttr('disabled');
  } else {
    $('button').attr('disabled','disabled')
  }
}

function check_cheesecake() {
  if ($('#cheesecake').children(':checked').length > 1) {
    alert("There is only one piece of cheesecake left");
    check_choices();
  };
}

function no_prawn_salmon_combo() {
  if ($(':radio[name=person1starters]', '#prawn-cocktail').is(':checked') && $(':radio[name=person1mains]', '#salmon-fillet').is(':checked')) {
    alert("Pierre the snobby waiter will not let you have prawn cocktail and salmon fillet in the same meal.");
    check_choices()
  } else if ($(':radio[name=person2starters]', '#prawn-cocktail').is(':checked') && $(':radio[name=person2mains]', '#salmon-fillet').is(':checked')) {
    alert("Pierre the snobby waiter will not let you have prawn cocktail and salmon fillet in the same meal.");
    check_choices()
  };
}