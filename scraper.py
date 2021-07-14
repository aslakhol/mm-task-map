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
    print(url)
    response = requests.get(
        url=url,
    )

    soup = BeautifulSoup(response.content, "html.parser")
    # table = soup.find("table")
    # print(soup)

    tables = soup.find_all("table")

    print(type(tables))
    print(len(tables))

    dfs = pd.read_html(str(tables))
    tasks = dfs[0]
    print(tasks)
    json = tasks.to_json("./export.json", orient="index")
    print(json)


scrapeFandom("https://merge-mansion.fandom.com/wiki/Frog_Pond_Falls")
