$(function() {

  for (var index in menu) {
    if (menu[index].course === 'Starters') {
      var name = 'starters';
      var value = menu[index].price;
      var to_append = '<div id=' + menu[index].name + '>' + '<input type="radio" name="person1'+ name + '" value="'+ value + '"> ' + 
      'Person 1' + ' ' + '<input type="radio" name="person2'+ name + '" value="'+ value + '"> ' + 
      'Person 2' + ' ' + menu[index].name + ' &#163;' + String(menu[index].price.toFixed(2)) + '<br><br>' + '</div>'
      $('#starters').append(to_append);
    } else if (menu[index].course === 'Main course') {
      var name = 'mains';
      var value = menu[index].price;
      var to_append = '<div id=' + menu[index].name + '>' + '<input type="radio" name="person1'+ name + '" value="'+ value + '"> ' + 
      'Person 1' + ' ' + '<input type="radio" name="person2'+ name + '" value="'+ value + '"> ' + 
      'Person 2' + ' ' + menu[index].name + ' &#163;' + String(menu[index].price.toFixed(2)) + '<br><br>' + '</div>'
      $('#mains').append(to_append);
    } else if (menu[index].course === 'Desserts') {
      var value = menu[index].price;
      var to_append = '<div id=' + menu[index].name + '>' + '<input type="radio" name="person1'+ name + '" value="'+ value + '"> ' + 
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

  $(':radio').change(function() {
  //   if (! $(this).is(':checked')) {
  //     $(this).prop( "checked", true );
  //   } else {
  //     $(this).prop( "checked", false );
  //   }
    update_sum();
  });
});

function update_sum (sum) {
  var sum = 0;
  $(':radio:checked').each(function () {
       sum += parseInt($(this).val());
   });
  $('#total-container>h2').text('Total to Pay:');
  $('#total').text('£' + String(sum.toFixed(2)));
}