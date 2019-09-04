var url = document.URL;
var senate = "https://api.propublica.org/congress/v1/113/senate/members.json";
var house = "https://api.propublica.org/congress/v1/113/house/members.json";

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

  call(data)
  hideLoad()
}

function call(data) {

  var x, data, j, i = "";

  var party = [];
  var votes = [];
  var votesPerc = "";
  var totalDemo = [];
  var totalRep = [];
  var totalInt = [];
  var totalVotes = [];
  var leastEng = [];
  var mostEng = [];
  var leastEngVotes = [];
  var mostEngVotes = [];
  
  for (i in data.results) {
    for (j in data.results[i].members) {
      var x = data.results[i].members[j];


      if (x.party == "D") {
        let arrD = (x.votes_with_party_pct);
        totalDemo.push(arrD);
      } else if (x.party == "R") {
        let arrD = (x.votes_with_party_pct);
        totalRep.push(arrD);
      } else if (x.party == "I") {
        let arrD = (x.votes_with_party_pct);
        totalInt.push(arrD);
      }

      if (x.first_name) {
        leastEng.push({
          "FirstName": x.first_name,
          "LastName": x.last_name,
          "MissedVotes": x.missed_votes,
          "VotesPerc": x.missed_votes_pct
        })
        mostEng.push({
          "FirstName": x.first_name,
          "LastName": x.last_name,
          "MissedVotes": x.missed_votes,
          "VotesPerc": x.missed_votes_pct
        })
        votesPerc = ({
          "missedPerc": x.votes_with_party_pct
        })
        leastEngVotes.push({
          "FirstName": x.first_name,
          "LastName": x.last_name,
          "MissedVotes": x.missed_votes,
          "VotesPerc": x.votes_with_party_pct
        });
        mostEngVotes.push({
          "FirstName": x.first_name,
          "LastName": x.last_name,
          "MissedVotes": x.missed_votes,
          "VotesPerc": x.votes_with_party_pct
        });


      }

      party.push(x.party);
      votes.push(votesPerc);
      totalVotes.push(votesPerc.missedPerc);

    }
  }


  var houseParty = [];
  var nIndependents = totalInt.length;
  var nDemocrats = totalDemo.length;
  var nRepublicans = totalRep.length;
  var total = party.length;

  leastEng.sort((a, b) => (a.VotesPerc < b.VotesPerc) ? 1 : ((b.VotesPerc < a.VotesPerc) ? -1 : 0));
  mostEng.sort((a, b) => (a.VotesPerc > b.VotesPerc) ? 1 : ((b.VotesPerc > a.VotesPerc) ? -1 : 0));
  leastEngVotes.sort((a, b) => (a.VotesPerc < b.VotesPerc) ? 1 : ((b.VotesPerc < a.VotesPerc) ? -1 : 0));
  mostEngVotes.sort((a, b) => (a.VotesPerc > b.VotesPerc) ? 1 : ((b.VotesPerc > a.VotesPerc) ? -1 : 0));

  var mostPerc = [];
  var leastPerc = [];
  var leastVotes = [];
  var mostVotes = [];
  var lowPerc = Math.round(total * 0.1);

  function getSum(total, num) {
    return total + num;
  }

  var totalDemo = totalDemo.reduce(getSum, 0) / nDemocrats;
  var totalRep = totalRep.reduce(getSum, 0) / nRepublicans;
  var totalPerc = totalVotes.reduce(getSum, 0) / total;

  if (nIndependents != 0) {
    var totalInt = totalInt.reduce(getSum, 0) / nIndependents;
  } else {
    totalInt = 0;
  }

  totalDemo = totalDemo.toFixed(2);
  totalRep = totalRep.toFixed(2);
  totalInt = totalInt.toFixed(2);
  totalPerc = totalPerc.toFixed(2);

  function sortTable(array1, array2, lowest, arrayEnd1, arrayEnd2) {
    for (i = 0; i < array1.length; i++) {
      if (i < lowest) {
        arrayEnd1.push(array1[i]);
        arrayEnd2.push(array2[i])
      } else if (i == lowest) {
        if (array1[i].VotesPerc == array1[i - 1].VotesPerc) {
          arrayEnd1.push(array1[i]);
          lowest += 1;
        } else if (array2[i].VotesPerc == array2[i - 1].VotesPerc) {
          arrayEnd2.push(array2[i]);
          lowest += 1;
        }
      }
    }
  }

  sortTable(mostEng, leastEng, lowPerc, mostPerc, leastPerc)
  sortTable(mostEngVotes, leastEngVotes, lowPerc, mostVotes, leastVotes)

  function generateTable(table, data) {
    for (let element of data) {
      let row = table.insertRow();
      for (key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }
  }

  var table = document.getElementById("table-body1");
  var table2 = document.getElementById("table-body2");
  var table3 = document.getElementById("table-body3");
  var table4 = document.getElementById("table-body4");


if (url.includes("attendance")) {
  generateTable(table, leastPerc);
  generateTable(table2, mostPerc);
} else if (url.includes("loyalty")) {
  generateTable(table3, leastVotes);
  generateTable(table4, mostVotes);

}

  var statistics = [
    {
      "Party": "Democrats",
      "No. of Reps": nDemocrats,
      "% Voted w/ party": totalDemo
    },
    {
      "Party": "Republicans",
      "No. of Reps": nRepublicans,
      "% Voted w/ party": totalRep
    },

    {
      "Party": "Independents",
      "No. of Reps": nIndependents,
      "% Voted w/ party": totalInt
    },
    {
      "Party": "Total",
      "No. of Reps": total,
      "% Voted w/ party": totalPerc
    }
  ];

  function generateTable(table, data) {
    for (let element of data) {
      let row = table.insertRow();
      for (key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }
  }

  var table = document.getElementById("tBody");

  generateTable(table, statistics);


}

function hideLoad() {
  document.getElementById("load").style.display = "none";
}
