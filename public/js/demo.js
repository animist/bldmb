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

  clocktick();
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
  if ((message) && (message.match(/(jpe?g|gif|png)$/i))) {
    img = $('<img>');
    img.attr('src', message);
    line.css('webkit-animation', 'blurFadeInOutImage 5s ease-in');
    line.append(img);
  }
  else {
    line.append(message);
  }
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

function clocktick() {
  var now = new Date();
  var yyyy = now.getFullYear();
  var mm = now.getMonth() + 1;
  var dd = now.getDate();
  var hh = now.getHours();
  var nn = now.getMinutes();
  var ss = now.getSeconds();
  if (mm < 10) { mm = "0" + mm; }
  if (dd < 10) { dd = "0" + dd; }
  if (hh < 10) { hh = "0" + hh; }
  if (nn < 10) { nn = "0" + nn; }
  if (ss < 10) { ss = "0" + ss; }

  $("#clock").html(yyyy + "/" + mm + "/" + dd + "<br>" + hh + ":" + nn + ":" + ss);

  setTimeout("clocktick()", 1000);
}
