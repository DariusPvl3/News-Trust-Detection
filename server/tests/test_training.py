import pytest
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from learning_model import train_model


def test_train_model():
    print("Testing models...")
    models, vectorizers, accuracies = train_model()
    assert "Logistic Regression" in models
    assert "Decision Tree" in models
    assert "Gradient Boosting Classifier" in models
    assert "Random Forest Classifier" in models
    assert all(accuracy >= 0 for accuracy in accuracies.values())
    print("Finished testing models.")
