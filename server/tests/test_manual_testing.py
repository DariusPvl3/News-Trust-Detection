import pytest
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from learning_model import train_model, manual_testing


def test_manual_testing():
    print("Testing manual_testing...")
    models, vectorizers, accuracies = train_model()

    text = "Acesta este un articol de test despre Noua Ordine Mondială."
    publication = "adevarul"
    title = "Titlu de Test"
    category = "sanatate"

    results = manual_testing(
        text, publication, title, category, models, vectorizers, accuracies
    )

    for model_name in models.keys():
        assert model_name in results
        assert "percentage" in results[model_name]
        assert "probabilities" in results[model_name]
        assert "accuracies" in results[model_name]
        assert "explanation" in results[model_name]
        assert isinstance(results[model_name]["percentage"], float)
        assert isinstance(results[model_name]["probabilities"], list)
        assert isinstance(results[model_name]["accuracies"], float)
        assert isinstance(results[model_name]["explanation"], str)
    print("Finished testing manual_testing.")
