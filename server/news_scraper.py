import requests
from bs4 import BeautifulSoup
from newspaper import Article


def news_article_scraper(url):
    if "digi24" in url:
        try:
            response = requests.get(url)
            coverpage = response.content
            soup = BeautifulSoup(coverpage, "html.parser")

            text = soup.find("article", class_="article-story").text.strip()
            title = soup.find("title").text.strip()
            return {
                "title": title,
                "text": text,
            }

        except Exception as e:
            print(f"Error with Digi24 and BeautifulSoup: {e}")
            return None
    else:
        try:
            article = Article(url)
            article.download()
            article.parse() 
            return {
                "title": article.title,
                "text": article.text,
            }
        except Exception as e:
            print(f"Error with Newspaper3k: {e}")
            return None
