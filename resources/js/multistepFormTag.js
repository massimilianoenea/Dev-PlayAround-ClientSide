var cantanti = new Taggle('cantanti',{
    onTagRemove: function(event, tag) {
        parameter.splice(parameter.indexOf(arrCod[arrName.indexOf(tag)]), 1);
    }
});

var container = cantanti.getContainer();
var input = cantanti.getInput();

var genere = new Taggle('genere',{
    onTagRemove: function(event, tag) {
        parameter.splice(parameter.indexOf(arrCod[arrName.indexOf(tag)]), 1);
    }
});
var container_gen = genere.getContainer();
var input_gen = genere.getInput();

var arrName = [];
var arrCod = [];
var parameter = [];

$(input).autocomplete({
    delay:400,
    minlength:3,
    source: function(request, response){
        // New request 300ms after key stroke
        if(request.term === '') response("");
        var $this = $(this);
        var $element = $(this.element);
        var previous_request = $element.data("jqXHR");
        if(previous_request) {
            // a previous request has been made.
            // though we don't know if it's concluded
            // we can try and kill it in case it hasn't
            previous_request.abort();
        }
        $element.data( "jqXHR", $.ajax({
            url: path+"/autocomplete/artist/"+request.term,
            type:"get",
            xhrFields: {
                withCredentials: true
             },
            crossDomain: true,
            dataType: "json",
            success: function( data ) {
                arrName.length = 0;
                arrCod.length = 0;
                for (name in data.text) {
                    arrName.push(data.text[name].NOME);
                    arrCod.push({type:"artist",cod:data.text[name].COD});
                }
                response(arrName);
            }
        }));
    },
    appendTo: container,
    position: { at: "left bottom", of: container },
    select: function(event, data) {
        event.preventDefault();
        //Add the tag if user clicks
        if (event.which === 1) {
            cantanti.add(data.item.value);
            parameter.push(arrCod[arrName.indexOf(data.item.value)]);
        }
    }
});

$(input_gen).autocomplete({
    delay:400,
    minlength:3,
    source: function(request, response){
        // New request 300ms after key stroke
        if(request.term === '') response("");
        var $this = $(this);
        var $element = $(this.element);
        var previous_request = $element.data("jqXHR");
        if(previous_request) {
            // a previous request has been made.
            // though we don't know if it's concluded
            // we can try and kill it in case it hasn't
            previous_request.abort();
        }
        $element.data( "jqXHR", $.ajax({
            url: path+"/autocomplete/genere/"+request.term,
            type:"get",
            xhrFields: {
                withCredentials: true
             },
            crossDomain: true,
            dataType: "json",
            success: function( data ) {
                arrName.length = 0;
                arrCod.length = 0;
                for (name in data.text) {
                    arrName.push(data.text[name].NOME);
                    arrCod.push({type:"genere",cod:data.text[name].COD});
                }
                response(arrName);
            }
        }));
    },
    appendTo: container_gen,
    position: { at: "left bottom", of: container_gen },
    select: function(event, data) {
        event.preventDefault();
        //Add the tag if user clicks
        if (event.which === 1) {
            genere.add(data.item.value);
            parameter.push(arrCod[arrName.indexOf(data.item.value)]);
        }
    }
});


var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the crurrent tab
function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    //... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Finish";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    //... and run a function that will display the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form...
    if (currentTab >= x.length) {
        // ... the form gets submitted:
        //document.getElementById("regForm").submit();
        angular.element(document.getElementById('PlayAround_CompleteReg')).scope().sendComplete();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class on the current step:
    x[n].className += " active";
}