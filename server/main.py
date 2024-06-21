import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from news_scraper import news_article_scraper
from learning_model import train_model, manual_testing

load_dotenv()

app = Flask(__name__)
CORS(app)

models, vectorizers, accuracies = train_model()

APP_EMAIL_ADDRESS = os.getenv("APP_EMAIL_ADDRESS")
APP_EMAIL_PASSWORD = os.getenv("APP_EMAIL_PASSWORD")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
LOGO_PATH = os.getenv("LOGO_PATH")


@app.route("/receive_url", methods=["POST"])
def receive_url():
    data = request.json
    url = data.get("url")
    category = data.get("category")

    scraped_data = news_article_scraper(url)

    if scraped_data:
        article_text = scraped_data.get("text")
        article_title = scraped_data.get("title")
        publication = extract_and_format_site_name(url)

        result = manual_testing(
            article_text,
            publication,
            article_title,
            category,
            models,
            vectorizers,
            accuracies,
        )

        response = {
            "article_title": article_title,
            "site_name": publication,
            "test_results": result,
        }
        return jsonify(response)
    else:
        print("Eroare in extragere din articol!")
        return jsonify({"error": "Error scraping data"})


@app.route("/submit_feedback", methods=["POST"])
def submit_feedback():
    data = request.json
    rating = data.get("rating")
    email = data.get("email")
    comments = data.get("comments", None)
    article_title = data.get("article_title")
    site_name = data.get("site_name")
    average_credibility = data.get("average_credibility")

    if not comments:
        comments = "<Nu a fost trimis comentariu>"

    try:
        average_credibility = round(float(average_credibility), 2)
    except (TypeError, ValueError):
        average_credibility = "N/A"

    html_content = f"""
    <html>
    <body>
        <h2>Feedback Nou Primit</h2>
        <p><strong>Rating:</strong> {generate_star_rating(rating)}</p>
        <p><strong>Trimis de:</strong> {email}</p>
        <p><strong>Titlu Articol:</strong> {article_title}</p>
        <p><strong>Publicatie:</strong> {site_name}</p>
        <p><strong>Credibilitate calculată:</strong> {average_credibility}%</p>
        <p><strong>Comentarii:</strong><br>{comments}</p>
        <img src="cid:logo">
    </body>
    </html>
    """

    msg = MIMEMultipart()
    msg["From"] = APP_EMAIL_ADDRESS
    msg["To"] = ADMIN_EMAIL
    msg["Subject"] = "Nou Feedback Primit"

    msg.attach(MIMEText(html_content, "html"))

    try:
        with open(LOGO_PATH, "rb") as f:
            logo_img = MIMEImage(f.read())
            logo_img.add_header("Content-ID", "<logo>")
            logo_img.add_header("Content-Disposition", "inline", filename="logo.png")
            msg.attach(logo_img)

        with smtplib.SMTP("smtp.office365.com", 587) as server:
            server.starttls()
            server.login(APP_EMAIL_ADDRESS, APP_EMAIL_PASSWORD)
            server.send_message(msg)
        return jsonify({"message": "Feedback submitted successfully"})
    except smtplib.SMTPAuthenticationError as e:
        print(f"SMTP Authentication Error: {e.smtp_code}, {e.smtp_error}")
        return (
            jsonify({"error": "Authentication error, check your email credentials"}),
            500,
        )
    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({"error": "Error submitting feedback"}), 500


def generate_star_rating(rating):
    full_star = '<span style="color: #ffc107;">&#9733;</span>'
    empty_star = '<span style="color: #e4e5e9;">&#9733;</span>'
    return full_star * rating + empty_star * (5 - rating)


def extract_and_format_site_name(url):
    domain = url.split("//")[-1].split("/")[0]
    if domain.startswith("www."):
        domain = domain[4:]
    site_name = domain.split(".")[0]
    formatted_name = site_name.lower().replace(" ", "")
    return formatted_name


if __name__ == "__main__":
    app.run(debug=True, port=8000)
