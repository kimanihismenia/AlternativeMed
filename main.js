function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  var getAllRecords = function() {
    $.getJSON(
      "https://api.airtable.com/v0/appu70QEc9om0ctyz/MedicationList?api_key=keyN9c8LJg7UWvjEM&view=Order",
      function(airtable) {
        var html = [];
        $.each(airtable.records, function(index, record) {
          var id = record.id;
          var picture = record.fields["Pictures"];
          var diagnosis = record.fields["Diagnosis"];
          var instructions = record.fields["Instructions"];
          html.push(listView(id, picture, diagnosis, instructions));
        });
        $(".list-view").append(html);
      }
    );
  };

  var getOneRecord = function(id) {
    $.getJSON(
      `https://api.airtable.com/v0/appu70QEc9om0ctyz/MedicationList/${id}?api_key=keyN9c8LJg7UWvjEM`,
      function(record) {
        var html = [];
        console.log(record)
        var id = record.id;
        var picture = record.fields["Pictures"];
        var diagnosis = record.fields["Diagnosis"];
        var instructions = record.fields["Instructions"];
        var nutrients = record.fields["Nutrients"];
        var preparation = record.fields["Preparation"];
        var ingredients = record.fields["Ingredients"];
        var video = record.fields["Video"];
                  html.push(detailView(id, picture, diagnosis, instructions, nutrients, preparation, ingredients, video));
        
        $(".detail-view").append(html);
      }
    );
  };

  var listView = function(id, picture, diagnosis, instructions) {
    return `
     <div class="col-md-4">
      <div class="card border-dark";">
      ${picture ? `<img src="${picture[0].url}">` : ``}
      <div class="card-body">
        <h2 class="card-title"><a href="index.html?id=${id}"><strong>Targeted Body Part:</strong> ${diagnosis}</h2></a>
        <p class="card-text"><strong>Method of Use:</strong> ${instructions}</p>
      </div>
      </div>
      </div>
    `;
  };

  var detailView = function(id, picture, diagnosis, instructions, ingredients, preparation, nutrients, video) {
    return `
    
      ${picture ? `<img class="pic" src="${picture[0].url}">` : ``}
            <div class="card-body">
        <h2 class="card-title"><a href="index.html?id=${id}">Targeted Body Part: ${diagnosis}</h2></a>
        <p class="card-text"><strong>Method of Use:</strong> ${instructions}</p>
        <p class="card-text"><strong>Ingredients:</strong> ${ingredients}</p>
        <p class="card-text"><strong>Preparation:</strong> ${preparation}</p>
        <p class="card-text"><strong>Nutrients:</strong> ${nutrients}</p>
        <iframe width="800" height="600" src="https://www.youtube.com/embed/${video}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    
    `;
  };

  var id = getParameterByName("id");
if (id) {
  getOneRecord(id);
} else {
  getAllRecords();
}