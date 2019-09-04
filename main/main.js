var url = document.URL;
var senate = "https://api.propublica.org/congress/v1/113/senate/members.json";
var house = "https://api.propublica.org/congress/v1/113/house/members.json";
var home = "http://127.0.0.1:49879/home.html";
var info;
var allMembers;


if (url.includes("index")) {

} else {
  
    var scroll = document.getElementById("myBtn");
    scroll.addEventListener("click", function () {
    scrollFunction();
  })
  

  var republican = document.getElementById("rep");
  republican.addEventListener("click", function () {
    myFilter();
  })

  var democrat = document.getElementById("dem");
  democrat.addEventListener("click", function () {
    myFilter();
  })
  var independent = document.getElementById("int");
  independent.addEventListener("click", function () {
    myFilter();
  })
  var input = document.getElementById("mySelect");
  input.addEventListener("change", function () {
    myFilter();
  })
}
if (url.includes("senate")) {
  getData(senate);
} else if (url.includes("house")) {
  getData(house);
}

async function getData(url) {

  var data =
    await fetch(url, {
      method: 'GET',
      headers: {
        'X-API-Key': 'fBsrfJQdRZzxDmyvrBsTDzfVdCaX0LjsueCb8v9y'
      }
    })
    .then(response => response.json())
    .then(json => json)
    .catch(err => console.error(err))


  info = data;
  allMembers = info.results[0].members;
  createArray()
  hideLoad()

}

function call(data) {

  var j, i = "";
  var x, z = [];

  var table = document.getElementById("table-body");
  table.innerHTML = "";

  for (i = 0; i < data.length; i++) {
    var x = data[i];

    var url = x.url;
    var first_name = x.first_name;

    if (x.middle_name == null) {
      var middle_name = "";
    } else {
      var middle_name = x.middle_name;
    }

    var last_name = x.last_name;
    var party = x.party;
    var seniority = x.seniority;
    var votes_with_party_pct = x.votes_with_party_pct.toFixed(2);
    var state = x.state;


    var row = table.insertRow(0);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);

    if (party == "D") {
      cell4.innerHTML = party;
    } else if (party == "R") {
      cell4.innerHTML = party;
    } else {
      cell4.innerHTML = party;
    }

    cell1.innerHTML = '<a id="myLink" target="_blank" href="' + url + '" ">' + first_name + '</a>';
    cell2.innerHTML = middle_name;
    cell3.innerHTML = last_name;
    cell5.innerHTML = seniority;
    cell6.innerHTML = state;
    cell7.innerHTML = votes_with_party_pct;
    z.push(state)

  }

}

function createArray() {
  var states = [];
  for (var i = 0; i < allMembers.length; i++) {
    states.push(allMembers[i].state);
  }
  sortUnique(states);

}

function sortUnique(arr) {
  arr.sort();
  var last;
  for (var i = 0; i < arr.length; i++) {
    if ((last = arr.lastIndexOf(arr[i])) !== i)
      arr.splice(i + 1, last - i);
  }

  for (i = 0; i < arr.length; i++) {
    var mySelect = document.getElementById('mySelect'),
      newOption = document.createElement('option');
    newOption.innerHTML = arr[i];
    newOption.setAttribute("value", arr[i])
    mySelect.appendChild(newOption);


  }

}

function myFilter() {
  var i;
  var array = [];
  var members = info.results[0].members;
  var stateFilter = input.value;

  for (i = 0; i < members.length; i++) {

    if (members[i].state == stateFilter || stateFilter == "ALL") {
      if (democrat.checked == true && members[i].party == "D") {
        array.push(members[i])
      }
      if (republican.checked == true && members[i].party == "R") {
        array.push(members[i])
      }
      if (independent.checked == true && members[i].party == "I") {
        array.push(members[i])
      }
    }


  }
  var text;
  text = document.getElementById("textResult");

  if (array.length == 0 && stateFilter != "ALL") {
    text.innerHTML = "No results found with the selected filters"
  } else {
    text.innerHTML = ""
  }
  call(array)
}

function hideLoad() {
  document.getElementById("load").style.display = "none";
}


function hideAcc() {
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("panel-down");
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        $(this).val('Show More');
        panel.style.display = "none";
      } else {
        $(this).val('Show Less');
        panel.style.display = "block";
      }
    });
  }
}

hideAcc()

function scrollFunction() {
  
  document.documentElement.scrollTop = 0;
  
}
