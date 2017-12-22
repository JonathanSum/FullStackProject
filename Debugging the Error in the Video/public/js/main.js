// $(document).ready(function(){
//   $('.deleteUsers').on('click', deleteUser);
// });
//This one is only for debug purpose
// $(document).ready(function(){
//     $('.tt1').click(function(){
//         alert("Here're we go")
//     });
// });

/**end of debugging**/
$(document).ready(function(){
    $('.deleteUser').click(deleteUser);
});

function deleteUser(){
  var confirmation = confirm('Are You Sure?');
  if(confirmation){
    //I am sorry. I can only use jquery. JonathanSum saying this.
    location.reload();
    //debug purpose alert($('.deleteUser').data("id"))
    $.ajax({
      type:'DELETE',
      url:'/users/delete/'+$(this).data('id')
    }).done(function(response){
      window.location.replace('/');
    })
  }else{
    return false;
  }
}
