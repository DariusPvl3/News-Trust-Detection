import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import pytest
from learning_model import (
    wordopt,
    extract_names,
    preprocess_publicatie,
    contains_keywords,
)


def test_wordopt():
    print("Testing wordopt...")
    input_text = "Acesta este un text de test!"
    expected_output = "text test"
    actual_output = wordopt(input_text)
    print(f"Input: {input_text}")
    print(f"Expected Output: {expected_output}")
    print(f"Actual Output: {actual_output}")
    assert actual_output == expected_output

    assert wordopt(None) is None
    print("Finished testing wordopt.")


def test_wordopt_with_punctuation():
    print("Testing wordopt with punctuation...")
    input_text = "Text, cu; punctuatie!"
    expected_output = "text punctuatie"
    actual_output = wordopt(input_text)
    print(f"Input: {input_text}")
    print(f"Expected Output: {expected_output}")
    print(f"Actual Output: {actual_output}")
    assert actual_output == expected_output
    print("Finished testing wordopt with punctuation.")


def test_wordopt_with_numbers():
    print("Testing wordopt with numbers...")
    input_text = "Acest text contine numere 123."
    expected_output = "text contine număr"
    actual_output = wordopt(input_text)
    print(f"Input: {input_text}")
    print(f"Expected Output: {expected_output}")
    print(f"Actual Output: {actual_output}")
    assert actual_output == expected_output
    print("Finished testing wordopt with numbers.")


def test_wordopt_with_url():
    print("Testing wordopt with URL...")
    input_text = "Vezi acest link: https://exemplu.com"
    expected_output = "vedea link"
    actual_output = wordopt(input_text)
    print(f"Input: {input_text}")
    print(f"Expected Output: {expected_output}")
    print(f"Actual Output: {actual_output}")
    assert actual_output == expected_output
    print("Finished testing wordopt with URL.")


def test_extract_names():
    print("Testing extract_names...")
    text = "Mihai Popescu merge la magazin."
    expected_output = "Mihai Popescu"
    actual_output = extract_names(text)
    print(f"Input: {text}")
    print(f"Expected Output: {expected_output}")
    print(f"Actual Output: {actual_output}")
    assert actual_output == expected_output
    print("Finished testing extract_names.")


def test_extract_one_name():
    print("Testing extract_names with only a first name...")
    text = "Andrei spune minciuni."
    expected_output = "Andrei"
    actual_output = extract_names(text)
    print(f"Input: {text}")
    print(f"Expected Output: {expected_output}")
    print(f"Actual Output: {actual_output}")
    assert actual_output == expected_output
    print("Finished testing extract_names with only one name.")


def test_extract_two_persons():
    print("Testing extract_names with two names...")
    text = "Anca citeşte reviste. Ion nu a citit azi"
    expected_output = "Anca Ion"
    actual_output = extract_names(text)
    print(f"Input: {text}")
    print(f"Expected Output: {expected_output}")
    print(f"Actual Output: {actual_output}")
    assert actual_output == expected_output
    print("Finished testing extract_names with different names.")


def test_extract_two_persons_same_sentence():
    print("Testing extract_names with two names...")
    text = "Matei şi Codruţ sunt jucători de fotbal."
    expected_output = "Matei Codruţ"
    actual_output = extract_names(text)
    print(f"Input: {text}")
    print(f"Expected Output: {expected_output}")
    print(f"Actual Output: {actual_output}")
    assert actual_output == expected_output
    print("Finished testing extract_names with different names.")


def test_extract_names_no_names():
    print("Testing extract_names with no names...")
    text = "Merge la magazin."
    expected_output = ""
    actual_output = extract_names(text)
    print(f"Input: {text}")
    print(f"Expected Output: {expected_output}")
    print(f"Actual Output: {actual_output}")
    assert actual_output == expected_output
    print("Finished testing extract_names with no names.")


def test_preprocess_publicatie():
    print("Testing preprocess_publicatie...")
    input_text = " ADEVĂRUL "
    expected_output = "adevărul"
    actual_output = preprocess_publicatie(input_text)
    print(f"Input: {input_text}")
    print(f"Expected Output: {expected_output}")
    print(f"Actual Output: {actual_output}")
    assert actual_output == expected_output

    assert preprocess_publicatie(None) is None
    print("Finished testing preprocess_publicatie.")


def test_preprocess_publicatie_with_spaces():
    print("Testing preprocess_publicatie with spaces...")
    input_text = "   Libertatea   "
    expected_output = "libertatea"
    actual_output = preprocess_publicatie(input_text)
    print(f"Input: {input_text}")
    print(f"Expected Output: {expected_output}")
    print(f"Actual Output: {actual_output}")
    assert actual_output == expected_output
    print("Finished testing preprocess_publicatie with spaces.")


def test_contains_keywords():
    print("Testing contains_keywords...")
    text = "Aceasta este o teorie despre Noua Ordine Mondială."
    keywords = ["Noua Ordine Mondială", "plandemie"]
    expected_output = True
    actual_output = contains_keywords(text, keywords)
    print(f"Input: {text}")
    print(f"Keywords: {keywords}")
    print(f"Expected Output: {expected_output}")
    print(f"Actual Output: {actual_output}")
    assert actual_output == expected_output

    text = "Fără cuvinte cheie."
    expected_output = False
    actual_output = contains_keywords(text, keywords)
    print(f"Input: {text}")
    print(f"Keywords: {keywords}")
    print(f"Expected Output: {expected_output}")
    print(f"Actual Output: {actual_output}")
    assert actual_output == expected_output
    print("Finished testing contains_keywords.")


def test_contains_keywords_no_keywords():
    print("Testing contains_keywords with no keywords...")
    text = "Aceasta este o teorie."
    keywords = ["Noua Ordine Mondială", "plandemie"]
    expected_output = False
    actual_output = contains_keywords(text, keywords)
    print(f"Input: {text}")
    print(f"Keywords: {keywords}")
    print(f"Expected Output: {expected_output}")
    print(f"Actual Output: {actual_output}")
    assert actual_output == expected_output
    print("Finished testing contains_keywords with no keywords.")


def test_contains_keywords_different_case():
    print("Testing contains_keywords with different case...")
    text = "aceasta este o teorie despre noua ordine mondială."
    keywords = ["Noua Ordine Mondială", "plandemie"]
    expected_output = True
    actual_output = contains_keywords(text, keywords)
    print(f"Input: {text}")
    print(f"Keywords: {keywords}")
    print(f"Expected Output: {expected_output}")
    print(f"Actual Output: {actual_output}")
    assert actual_output == expected_output
    print("Finished testing contains_keywords with different case.")
