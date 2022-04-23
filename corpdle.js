const csv_url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRZVRc-bGBbM6nu7Ku3N1tkylu8e1qxQr_rSAEYJFG8CAa4oOS6lShkKb1CtVoLaxn4LwoEG-GI_G0m/pub?output=csv"
const random_order = new Array(137,484,168,491,100,338,399,339,223,72,264,75,97,341,172,248,487,420,412,242,469,390,275,54,152,445,60,45,375,65,461,486,79,358,92,447,143,340,471,107,20,222,229,271,314,308,247,483,141,182,83,401,209,458,343,301,76,349,200,355,316,393,456,367,312,269,330,197,262,196,204,81,449,494,30,225,380,156,495,192,22,224,11,322,68,404,502,5,319,427,298,6,385,21,337,48,371,317,10,44,501,482,108,186,346,504,252,31,145,489,117,297,144,500,233,122,475,39,417,203,173,63,310,9,332,243,256,282,146,443,57,153,36,327,190,414,436,124,249,56,283,246,307,311,480,169,94,90,268,369,176,258,285,166,451,306,41,236,230,374,73,232,400,135,410,95,28,490,58,406,292,14,481,267,254,473,305,366,239,18,114,220,217,111,13,421,418,215,109,477,74,302,284,250,440,188,12,61,381,167,106,345,387,396,221,457,17,62,392,69,136,435,198,120,183,429,468,42,142,98,394,287,303,70,364,33,161,34,178,37,244,93,206,151,391,105,99,463,470,32,140,257,384,497,280,336,496,205,276,315,326,78,191,309,360,357,148,147,344,419,77,235,304,170,377,193,157,218,270,279,365,465,1,474,362,118,448,408,313,424,101,395,66,52,503,133,397,296,431,185,331,499,286,277,411,478,278,89,459,389,290,55,454,132,115,261,245,184,423,179,373,208,130,181,255,187,7,273,467,363,38,212,333,323,19,4,272,237,126,241,150,202,24,110,485,354,27,211,350,23,8,113,334,274,383,174,26,455,299,234,438,329,253,138,425,155,437,25,210,134,324,158,291,238,372,318,361,199,240,226,96,164,342,121,359,49,464,67,194,466,175,80,259,432,293,265,441,162,116,403,112,426,231,2,479,493,40,388,413,82,219,295,128,407,266,154,16,103,450,405,214,51,370,462,53,71,216,453,476,84,288,86,433,131,29,320,165,348,119,227,50,379,3,452,409,498,321,356,64,294,460,201,368,207,289,159,335,351,47,213,43,263,59,85,88,104,434,123,378,35,325,422,15,492,415,171,46,180,260,129,281,402,139,382,125,102,398,87,444,300,352,353,428,251,376,446,488,91,177,416,127,328,149,347,472,430,160,228,195,189,442,163,386,439)
var number_of_companies = random_order.length
const clues = new Array("price", "marketcap", "high52", "low52", "volume", "pe", "eps", "sector", "subsector", "hq", "founded", "added", "firstchar")
var number_of_guesses = clues.length
const start_date = new Date("2022-04-22")
const company_datalist = document.getElementById("companies")
const guess_btn = document.getElementById("guess")
const guess_entry = document.getElementById("guess_entry")
const clue_tally = document.getElementById("clue_tally")
var correct_company
var guess_number = 1

// Number of guesses
document.getElementById("number_of_guesses").innerText = number_of_guesses

// Get the company data CSV
Papa.parse(csv_url, {  
    download: true,
    header: true,
    complete: function(results) {
        start_game(results.data)
    },
})


function start_game(companies) {
    // Populate datalist
    companies.forEach(function(company){
        var option = document.createElement("option");
        option.value = company.name + " (" + company.ticker + ")";
        company_datalist.appendChild(option);
     });

    // Get the company info
    today = new Date()
    day_number = Math.ceil((today.getTime() - start_date.getTime()) / (1000 * 3600 * 24))
    random_company_row_number = random_order[day_number]
    company = companies[random_company_row_number]
    correct_company_guess = company.name + " (" + company.ticker + ")"
    
    // Put it in the page
    clues.forEach(function(clue){
        if (company[clue]) {
            document.getElementById(clue).innerText = company[clue]
        } else {
            document.getElementById(clue).innerText = "N/A"
        }
            
    })

    // Fill in the correct company name
    Array.from(document.getElementsByClassName("correct_company_name")).forEach(
        function(element) {
            element.innerHTML = correct_company_guess
        }
    );

    // Handle guess button and enter key
    guess_btn.addEventListener("click", do_guess)
    guess_entry.addEventListener("keypress", function(event){
        if (event.key === "Enter") {do_guess() }
    })

}


function do_guess() {

    guess = guess_entry.value
    if (guess == correct_company_guess) {

        // Got it right
        document.getElementById("win").style.display = "block";
        guess_btn.style.display = "none"
        guess_entry.style.display = "none"
        clue_tally.style.display = "none";

    } else {

        // Got it wrong
        if (guess_number == number_of_guesses) {

            // Out of guesses
            document.getElementById("lose").style.display = "block";
            clue_tally.style.display = "none";
            guess_btn.style.display = "none"
            guess_entry.style.display = "none"

        } else {

            // Next guess
            document.getElementById("wrong_answer").style.display = "inline";
            guess_entry.value = ""
            guess_number++
            document.getElementById("guess_number").innerText = guess_number
            Array.from(document.getElementsByClassName(clues[guess_number-1])).forEach(
                function(element) {
                    element.style.display = "block"
                }
            );
        }
    }
}