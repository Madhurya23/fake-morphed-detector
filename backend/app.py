from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Server is running"

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]

    # Dummy distribution
    real = random.randint(50, 90)
    fake = random.randint(5, 40)
    morphed = max(0, 100 - real - fake)

    final_label = "Real"
    if fake > real:
        final_label = "Fake"
    if morphed > real:
        final_label = "Morphed"

    return jsonify({
        "real": real,
        "fake": fake,
        "morphed": morphed,
        "finalLabel": final_label
    })


if __name__ == "__main__":
    app.run(debug=True)
