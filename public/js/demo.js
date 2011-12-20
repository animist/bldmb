list = [];
pointer = 0;

$(function() {
  loadList();
  $("#go").bind('click', addSubject);
  $("form").bind('submit', addSubject);

  $(".message").live("webkitAnimationEnd", function(ev){
    console.log(ev);
    next(list[pointer++]);
    if (pointer > list.length){
      pointer = 0;
      loadList();
    }
    $(ev.target).remove();
  });
});

function loadList() {
  $.ajax({
    url: "/list",
    type: "GET",
    success: function(ret){ list = eval(ret); }
  });
}

function next(message) {
  line = $('<span>');
  line.addClass('message');
  line.append(message);
  line.appendTo("#main");
}

function add(message) {
  list.splice(pointer, 0, message);
}

function addSubject(){
  message = $("#subject").val();
  $("#go").hide();
  $("#wait").show();
  $.ajax({
    url: "/add",
    data: { subject: message },
    type: "POST",
    success: function(){
      add(message);
    },
    complete: function() {
      $("#subject").val("");
      $("#go").show();
      $("#wait").hide();
    }
  });
  return false;
}
