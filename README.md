# Merge Mansion Task Map

This is a tool to create flowcharts of all the tasks in the game Merge Mansion.
It scrapes data from the community wiki and parses the HTML tables to generate a JSON file with all the tasks.
It relies on the structure of wiki to stay consistent, so it's important that one checks that everything runs properly after scraping for new data.

## Run the program

In `/web`.

`npm i`

`npm start`

## Getting new data

In `/`.

`source env/bin/activate`

`python scraper.py`

`mv export.json web/src/export.json`

Then run the program to check that there are no new mistakes in the new data from the wiki.
Fix either the wiki or the code if appropriate.
Then commit and push to main and netlify will auto-deploy.
