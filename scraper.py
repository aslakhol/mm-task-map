import requests
from bs4 import BeautifulSoup
import random
import pandas as pd


def scrapeWikiArticle(url):
    print(url)
    response = requests.get(
        url=url,
    )

    soup = BeautifulSoup(response.content, "html.parser")

    title = soup.find(id="firstHeading")
    print(title.text)

    allLinks = soup.find(id="bodyContent").find_all("a")
    random.shuffle(allLinks)
    linkToScrape = 0

    for link in allLinks:
        if link["href"].find("/wiki/") == -1:
            continue

        linkToScrape = link
        break

    print(linkToScrape)
    scrapeWikiArticle("https://en.wikipedia.org" + linkToScrape["href"])

def scrapeFandom(url):
    response = requests.get(
        url=url,
    )

    soup = BeautifulSoup(response.content, "html.parser")

    tables = soup.find_all("table")
    dfs = pd.read_html(str(tables))

    for df in dfs:
        df.rename(columns={"Rewards": "Reward"}, inplace=True)

    tasks = pd.concat(dfs, ignore_index=True)

    tasks.to_json("./export.json", orient="records")


scrapeFandom("https://merge-mansion.fandom.com/wiki/Tasks")
