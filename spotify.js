
var body = document.getElementById("test");
var div = document.createElement("div");
body.appendChild(div);
div.id="container";
var div2 = document.createElement("div");
div.appendChild(div2);
div2.id="leftdiv";
var div3 = document.createElement("div");
div.appendChild(div3);
div3.id="rightdiv";
var div4 = document.createElement("div");
div3.appendChild(div4);
div4.id="inputbar";
//var form = document.createElement("form")
//div4.appendChild(form);
var input = document.createElement("input");
div4.appendChild(input);
input.type="text";
input.placeholder="enter artist!";
input.id="textbox";

var input2 = document.createElement("input");
div4.appendChild(input2);
input2.type="submit";
input2.value="Add";
input2.id="button";

input2.addEventListener("click",function()
{
  var safeURL = input.value.replace(" ","+");
  var method_look = safeURL;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.spotify.com/v1/search?q=artist:"+method_look+"&type=artist");
  xhr.addEventListener("load", function(e)
  {
    var d=xhr.responseText;
    var parsed=JSON.parse(d);
    console.log(parsed);
    var div5 = document.createElement("div")
    div3.appendChild(div5);
    div5.id="floats";
    var h1= document.createElement("h1");
    div5.appendChild(h1);
    h1.innerText=parsed.artists.items[0].name;

    var img = document.createElement("img");
    div5.appendChild(img);
    img.src=parsed.artists.items[0].images[0].url;
    img.setAttribute("height","400");
    div5.style.backgroundColor="white";

    img.addEventListener("click",function(evt)
    {
      var method_look = safeURL;
      var key = "&api_key=dc6zaTOxFJmzC";
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "https://api.spotify.com/v1/artists/"+parsed.artists.items[0].id+"/albums");
      xhr.addEventListener("load", function(e)
      {
        var d=xhr.responseText;
        var parsed=JSON.parse(d);
        console.log(parsed);
        var div5= document.getElementById("floats");
        var ul = document.createElement("ul");
        var uldiv=document.createElement("div");
        div5.appendChild(uldiv);
        uldiv.appendChild(ul);
        uldiv.id="uldiv";

        var albums = parsed.items;
        img.style.display="none";
        div5.style.backgroundColor="black";
        div5.setAttribute("width","500");
        var div6=document.createElement("div");
        div5.appendChild(div6);
        div6.id="albumdiv";

        albums.forEach(function(album)
        {
          var li = document.createElement("li");
          ul.appendChild(li);
          li.innerText=album.name;
          li.style.color="white";
          h1.style.color="white";
          li.addEventListener("mousemove",function(evt)
            {
            li.style.color="red";

            li.addEventListener("mouseout",function(evt)
              {
              li.style.color="white";
              })
            })
          var img = document.createElement("img");
          div6.appendChild(img);
          img.src=album.images[0].url;
          img.setAttribute("height","100");

          li.addEventListener("click",function(evt)
          {
            var albumId=album.id;

            var xhr = new XMLHttpRequest();
            xhr.open("GET", "https://api.spotify.com/v1/albums/"+albumId);
            xhr.addEventListener("load", function(e)
            {
              var d=xhr.responseText;
              var parsed=JSON.parse(d);

              var ul2 = document.createElement("ul");
              uldiv.appendChild(ul2);
              ul.style.display="none";

              var songs = parsed.tracks.items;

              songs.forEach(function(song)
              {
                var li2= document.createElement("li");
                ul2.appendChild(li2);
                li2.innerText=song.name;
              })

            })
            xhr.send();
          })
        })
      })
      xhr.send();
    })
  })
  xhr.send();
})

var counter = 1;
window.addEventListener("keydown",function(evt)
{
  if(evt.keyCode===39)
    {
      var safeURL = input.value.replace(" ","+");
      var method_look = safeURL;
      var key = "&api_key=dc6zaTOxFJmzC";
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "https://api.spotify.com/v1/search?q=artist:"+method_look+"&type=artist");
      xhr.addEventListener("load", function(e)
       {
        var d=xhr.responseText;
        var parsed=JSON.parse(d);
        var h1= document.querySelector("h1");
        h1.innerText=parsed.artists.items[counter].name;
        var img = document.querySelector("img");
        img.src=parsed.artists.items[counter].images[0].url;
        counter++;
      })
      xhr.send();
    }
})
