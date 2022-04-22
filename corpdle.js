const csv_url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRZVRc-bGBbM6nu7Ku3N1tkylu8e1qxQr_rSAEYJFG8CAa4oOS6lShkKb1CtVoLaxn4LwoEG-GI_G0m/pub?output=csv"

Papa.parse(csv_url, {
	download: true,
    header: true,
    complete: function(results, file) {
        console.log("Parsing complete:", results, file);
    }
})