from flask import Flask, request, jsonify
from flask_cors import CORS
from news_scraper import news_article_scraper
from learning_model import train_model, manual_testing

app = Flask(__name__)
CORS(app)

# Train the models when the server starts
models, vectorizers, accuracies = train_model()  # Unpack all three values


@app.route("/receive_url", methods=["POST"])
def receive_url():
    data = request.json
    url = data.get("url")
    category = data.get("category")
    print("URL primit: ", url)
    print("Categoria primita: ", category)

    scraped_data = news_article_scraper(url)

    if scraped_data:
        print("Informatii extrase: ", scraped_data)
        article_text = scraped_data.get("text")
        article_title = scraped_data.get("title")
        publication_full = get_site_name(url)
        publication = format_publication_name(publication_full)

        print("Publicatia primita: ", publication)

        # Modify manual_testing to include the additional parameters
        result = manual_testing(
            article_text,
            publication,
            article_title,
            category,
            models,
            vectorizers,
            accuracies,  # Pass precisions to manual_testing
        )

        response = {
            "article_title": article_title,
            "site_name": publication_full,
            "credibility": result,
        }
        return jsonify(response)
    else:
        print("Eroare in extragere din articol!")
        return jsonify({"error": "Error scraping data"})


def get_site_name(url):
    domain = url.split("//")[-1].split("/")[0]
    if domain.startswith("www."):
        domain = domain[4:]
    return domain.split(".")[0]


def format_publication_name(name):
    name = name.lower().replace(" ", "")
    return name


if __name__ == "__main__":
    app.run(debug=True, port=8000)
