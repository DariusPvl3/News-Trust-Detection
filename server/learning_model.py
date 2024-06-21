import pandas as pd
import numpy as np
import re
import string
import spacy
from spacy.lang.ro.stop_words import STOP_WORDS as stopwords_ro
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import classification_report
from sklearn.feature_extraction.text import TfidfVectorizer
from scipy.sparse import hstack, csr_matrix
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier

# Load the Romanian language model from spaCy
nlp_ro = spacy.load("ro_core_news_sm")


def wordopt(text):
    if isinstance(text, str):
        text = text.lower()
        text = re.sub("\\[.*?\\]", "", text)
        text = re.sub("\\W", " ", text)
        text = re.sub("https?://\\S+|www\\.\\S+", "", text)
        text = re.sub("<.*?>+", "", text)
        text = re.sub("[%s]" % re.escape(string.punctuation), "", text)
        text = re.sub("\n", "", text)
        text = re.sub("\\w*\\d\\w*", "", text)
        text = " ".join([word for word in text.split() if word not in stopwords_ro])
        text = " ".join([token.lemma_ for token in nlp_ro(text)])
    return text


def extract_names(text):
    doc = nlp_ro(text)
    names = [ent.text for ent in doc.ents if ent.label_ == "PERSON"]
    return " ".join(names)


def preprocess_publicatie(text):
    if isinstance(text, str):
        text = text.lower()
        text = text.replace(" ", "")
    return text


keywords = [
    "Noua Ordine Mondială",
    "Marea Resetare",
    "plandemie",
    "microcipare",
    "Big Pharma",
    "5G",
    "QAnon",
    "chemtrails",
    "shedding",
    "Statul paralel",
]


def contains_keywords(text, keywords):
    text = text.lower()
    return any(keyword.lower() in text for keyword in keywords)


def train_model():
    news_data = pd.read_excel(
        "C:/Users/darius/OneDrive/Desktop/University/Licenta/Cod sursa/SetDateStiri.xlsx"
    )
    data = news_data.drop(["URL"], axis=1)
    data = data.sample(frac=1).reset_index(drop=True)
    print("Beginning training...")
    print("Extracting names...")
    data["Names_Text"] = data["Text"].apply(
        lambda x: extract_names(x) if x else "no_name"
    )
    data["Names_Titlu"] = data["Titlu"].apply(
        lambda x: extract_names(x) if x else "no_name"
    )

    print("Searching keywords...")
    data["Cuvinte_Cheie_Titlu"] = data["Titlu"].apply(
        lambda x: contains_keywords(x, keywords)
    )
    data["Cuvinte_Cheie_Text"] = data["Text"].apply(
        lambda x: contains_keywords(x, keywords)
    )
    data["Cuvinte_Cheie"] = data["Cuvinte_Cheie_Titlu"] | data["Cuvinte_Cheie_Text"]

    print("Cleaning text...")
    data["Text"] = data["Text"].apply(wordopt)
    data["Titlu"] = data["Titlu"].apply(wordopt)
    data["Publicatie"] = data["Publicatie"].apply(preprocess_publicatie)
    print("Dataset text is clear and names got extracted!")

    feature_columns = [
        "Text",
        "Publicatie",
        "Titlu",
        "Subiect",
        "Names_Text",
        "Names_Titlu",
        "Cuvinte_Cheie",
    ]

    x_train, x_test, y_train, y_test = train_test_split(
        data[feature_columns],
        data["Credibilate"],
        test_size=0.30,
        stratify=data["Credibilate"],
    )

    print("Creating vectorizers...")
    vectorizer_text = TfidfVectorizer()
    vectorizer_publicatie = TfidfVectorizer()
    vectorizer_titlu = TfidfVectorizer()
    vectorizer_subiect = TfidfVectorizer()
    vectorizer_names_text = TfidfVectorizer()
    vectorizer_names_titlu = TfidfVectorizer()

    xv_train_text = vectorizer_text.fit_transform(x_train["Text"].fillna(""))
    xv_train_publicatie = vectorizer_publicatie.fit_transform(
        x_train["Publicatie"].fillna("")
    )
    xv_train_titlu = vectorizer_titlu.fit_transform(x_train["Titlu"].fillna(""))
    xv_train_subiect = vectorizer_subiect.fit_transform(x_train["Subiect"].fillna(""))
    xv_train_names_text = vectorizer_names_text.fit_transform(
        x_train["Names_Text"].fillna("")
    )
    xv_train_names_titlu = vectorizer_names_titlu.fit_transform(
        x_train["Names_Titlu"].fillna("")
    )
    xv_train_keywords = csr_matrix(x_train["Cuvinte_Cheie"].astype(int)).transpose()

    xv_test_text = vectorizer_text.transform(x_test["Text"].fillna(""))
    xv_test_publicatie = vectorizer_publicatie.transform(
        x_test["Publicatie"].fillna("")
    )
    xv_test_titlu = vectorizer_titlu.transform(x_test["Titlu"].fillna(""))
    xv_test_subiect = vectorizer_subiect.transform(x_test["Subiect"].fillna(""))
    xv_test_names_text = vectorizer_names_text.transform(
        x_test["Names_Text"].fillna("")
    )
    xv_test_names_titlu = vectorizer_names_titlu.transform(
        x_test["Names_Titlu"].fillna("")
    )
    xv_test_keywords = csr_matrix(x_test["Cuvinte_Cheie"].astype(int)).transpose()

    xv_train = hstack(
        [
            xv_train_text,
            xv_train_publicatie,
            xv_train_titlu,
            xv_train_subiect,
            xv_train_names_text,
            xv_train_names_titlu,
            xv_train_keywords,
        ]
    )
    xv_test = hstack(
        [
            xv_test_text,
            xv_test_publicatie,
            xv_test_titlu,
            xv_test_subiect,
            xv_test_names_text,
            xv_test_names_titlu,
            xv_test_keywords,
        ]
    )

    print("Training the models...")

    accuracies = {}

    print("Training #1: Logistic Regression")
    param_grid = {
        "C": [0.1, 1, 10, 100],
        "solver": ["liblinear", "newton-cg", "lbfgs", "sag"],
        "max_iter": [300, 500, 1000],
    }
    grid = GridSearchCV(LogisticRegression(), param_grid, refit=True, verbose=1, cv=5)
    grid.fit(xv_train, y_train)
    print(grid.best_params_)
    print(grid.best_estimator_)
    pred_lr = grid.predict(xv_test)
    report_lr = classification_report(y_test, pred_lr, output_dict=True)
    accuracies["Logistic Regression"] = report_lr["accuracy"]
    print(classification_report(y_test, pred_lr))

    print("Training #2: Decision Tree Classifier")
    DT = DecisionTreeClassifier()
    DT.fit(xv_train, y_train)
    pred_dt = DT.predict(xv_test)
    report_dt = classification_report(y_test, pred_dt, output_dict=True)
    accuracies["Decision Tree"] = report_dt["accuracy"]
    print(classification_report(y_test, pred_dt))

    print("Training #3: Gradient Boosting Classifier")
    GBC = GradientBoostingClassifier()
    GBC.fit(xv_train, y_train)
    pred_gbc = GBC.predict(xv_test)
    report_gbc = classification_report(y_test, pred_gbc, output_dict=True)
    accuracies["Gradient Boosting Classifier"] = report_gbc["accuracy"]
    print(classification_report(y_test, pred_gbc))

    print("Training #4: Random Forest Classifier")
    RFC = RandomForestClassifier()
    RFC.fit(xv_train, y_train)
    pred_rfc = RFC.predict(xv_test)
    report_rfc = classification_report(y_test, pred_rfc, output_dict=True)
    accuracies["Random Forest Classifier"] = report_rfc["accuracy"]
    print(classification_report(y_test, pred_rfc))

    vectorizers = {
        "text": vectorizer_text,
        "publicatie": vectorizer_publicatie,
        "titlu": vectorizer_titlu,
        "subiect": vectorizer_subiect,
        "names_text": vectorizer_names_text,
        "names_titlu": vectorizer_names_titlu,
    }

    models = {
        "Logistic Regression": grid,
        "Decision Tree": DT,
        "Gradient Boosting Classifier": GBC,
        "Random Forest Classifier": RFC,
    }

    return models, vectorizers, accuracies


def output_percentage(probability_score):
    trust_percentage = probability_score * 100
    return trust_percentage


def manual_testing(text, publication, title, category, models, vectorizers, accuracies):
    publication = preprocess_publicatie(publication)
    testing_news = {
        "Text": [text],
        "Publicatie": [publication],
        "Titlu": [title],
        "Subiect": [category],
    }

    new_def_test = pd.DataFrame(testing_news)

    new_def_test["Names_Text"] = (
        new_def_test["Text"].apply(extract_names).replace("", "no_name")
    )
    new_def_test["Names_Titlu"] = (
        new_def_test["Titlu"].apply(extract_names).replace("", "no_name")
    )

    new_def_test["Text"] = new_def_test["Text"].apply(wordopt)
    new_def_test["Publicatie"] = new_def_test["Publicatie"].apply(preprocess_publicatie)
    new_def_test["Titlu"] = new_def_test["Titlu"].apply(wordopt)

    new_xv_test_text = vectorizers["text"].transform(new_def_test["Text"])
    new_xv_test_publication = vectorizers["publicatie"].transform(
        new_def_test["Publicatie"]
    )
    new_xv_test_title = vectorizers["titlu"].transform(new_def_test["Titlu"])
    new_xv_test_subject = vectorizers["subiect"].transform(new_def_test["Subiect"])
    new_xv_test_names_text = vectorizers["names_text"].transform(
        new_def_test["Names_Text"]
    )
    new_xv_test_names_title = vectorizers["names_titlu"].transform(
        new_def_test["Names_Titlu"]
    )

    new_xv_test_keywords = csr_matrix(
        [contains_keywords(new_def_test["Text"][0], keywords)]
    ).transpose()

    new_xv_test = hstack(
        [
            new_xv_test_text,
            new_xv_test_publication,
            new_xv_test_title,
            new_xv_test_subject,
            new_xv_test_names_text,
            new_xv_test_names_title,
            new_xv_test_keywords,
        ]
    )

    explanations = {
        "Logistic Regression": "Un model statistic care estimează probabilitea unui rezultat binar. Simplu şi eficient pentru sarcini de clasificări binare (în cazul nostru, Adevărat sau Fals). Returnează probabilitatea apartenenţei la fiecare clasă, care poate fi rotunjită.",
        "Decision Tree": "Model ce foloseşte un grafic de decizii arborescent şi posibilele lor consecinţe în predicţie. Uşor de interpretat, dar pot ajunge la supra-umplere. Oferă un rezultat binar de apartenenţă",
        "Gradient Boosting Classifier": "Un ansamblu de tehnici ce combină modele mai slabe pentru a crea un model mai puternic. Metodă eficientă pentru o varietate de probleme de clasificare.",
        "Random Forest Classifier": "Un ansamblu de arbori de decizie, care ajută în reducere supra-umplerii şi în îmbunătăţirea acurateţei. Este o metodă robustă şi eficientă pentru mai multe sarcini.",
    }

    results = {}

    for model_name, model in models.items():
        prob = model.predict_proba(new_xv_test)
        percent = output_percentage(prob[0][1])
        results[model_name] = {
            "percentage": percent,
            "probabilities": prob[0].tolist(),
            "accuracies": accuracies[model_name],
            "explanation": explanations.get(model_name, "Explanation not found"),
        }

    return results
