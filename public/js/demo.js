list = [];
pointer = 0;

$(function() {
  $("#menuList").bind('click', showList);
  $("#menuDemo").bind('click', showDemo);

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

function showDemo() { toggleMain("demo"); }
function showList() { toggleMain("list"); }

function toggleMain(tgt) {
  $(".main").each(function() { $(this).hide(); } );
  $("#" + tgt).show();
  console.log($("#" + tgt));
}

function loadList() {
  $.ajax({
    url: "/list",
    type: "GET",
    success: function(ret){
      list = eval(ret);
      updateList();
    }
  });
}

function updateList() {
  $.each(list.reverse(), function(i, val) {
    $("#listItem" + (i + 1)).text(val);
    if (i > 9) { return; }
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
  line.appendTo("#demo");
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
      updateList();
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
