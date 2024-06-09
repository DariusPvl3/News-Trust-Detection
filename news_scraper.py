import requests
from bs4 import BeautifulSoup
import re
import dateutil.parser
from newspaper import Article


def news_article_scraper(url):
    if "digi24" in url:
        try:
            response = requests.get(url)
            coverpage = response.content
            soup = BeautifulSoup(coverpage, "html.parser")

            text = soup.find("article", class_="article-story").text.strip()
            title = soup.find("title").text.strip()
            description = soup.find("meta", {"name": "description"})["content"]
            publish_date = soup.find("meta", {"name": "publish-date"})
            if publish_date:
                publish_date = publish_date["content"]
                publish_date = dateutil.parser.parse(publish_date).strftime(
                    "%Y-%m-%d %H:%M:%S"
                )
            author_match = re.search(r"Editor :\s*(.*?)\s*Etichete:", text)
            if author_match:
                authors = author_match.group(1)
            else:
                authors = None
            tags_match = re.search(r"Etichete:(.*?)Urmărește știrile", text, re.DOTALL)
            if tags_match:
                tags_text = tags_match.group(1)
                tags = [tag.strip() for tag in tags_text.split("\n") if tag.strip()]
            else:
                tags = None

            return {
                "title": title,
                "text": text,
                "authors": authors,
                "description": description,
                "publish_date": publish_date,
                "tags": tags,
            }

        except Exception as e:
            print(f"Error with Digi24 and BeautifulSoup: {e}")
            return None
    else:
        try:
            article = Article(url)
            article.download()
            article.parse()
            formatted_date = None
            if article.publish_date:
                formatted_date = article.publish_date.strftime("%Y-%m-%d %H:%M:%S")
            return {
                "title": article.title,
                "text": article.text,
                "authors": article.authors,
                "publish_date": formatted_date,
                "tags": article.keywords,
            }
        except Exception as e:
            print(f"Error with Newspaper3k: {e}")
            return None
