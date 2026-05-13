'''from flask import Flask, request, jsonify
from flask_cors import CORS

from tensorflow.keras.models import load_model
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
import numpy as np
import cv2
import os

app = Flask(__name__)
CORS(app)

# -------------------------
# LOAD MODELS
# -------------------------
stage1_model = load_model(
    "models/stage1_real_fake.h5"
)

stage2_model = load_model(
    "models/stage2_ai_morphed.h5"
)

# -------------------------
# CLASS LABELS
# -------------------------
STAGE1_CLASSES = ['fake', 'real']

STAGE2_CLASSES = ['ai', 'morphed']

# -------------------------
# UPLOAD FOLDER
# -------------------------
UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

# -------------------------
# PREPROCESS IMAGE
# -------------------------
def preprocess_image(path):

    img = cv2.imread(path)

    if img is None:
        raise ValueError("Invalid image file")

    img = cv2.cvtColor(
        img,
        cv2.COLOR_BGR2RGB
    )

    img = cv2.resize(
        img,
        (224, 224)
    )

    img = preprocess_input(
        img.astype("float32")
    )

    img = np.expand_dims(
        img,
        axis=0
    )

    return img
# -------------------------
# HOME ROUTE
# -------------------------
@app.route("/")
def home():

    return "2-Stage AI Detection Server Running"

# -------------------------
# PREDICTION ROUTE
# -------------------------
@app.route("/predict", methods=["POST"])
def predict():

    try:

        # -------------------------
        # CHECK FILE
        # -------------------------
        if "image" not in request.files:

            return jsonify({
                "error": "No image uploaded"
            }), 400

        file = request.files["image"]

        # -------------------------
        # SAVE IMAGE
        # -------------------------
        file_path = os.path.join(
            UPLOAD_FOLDER,
            file.filename
        )

        file.save(file_path)

        # -------------------------
        # PREPROCESS
        # -------------------------
        img = preprocess_image(file_path)

        # ==================================================
        # STAGE 1 : REAL vs FAKE
        # ==================================================
        stage1_prediction = stage1_model.predict(img)[0]

        stage1_confidence = float(
            np.max(stage1_prediction) * 100
        )

        stage1_idx = int(
            np.argmax(stage1_prediction)
        )

        stage1_label = STAGE1_CLASSES[
            stage1_idx
        ]

        fake_score = float(
            stage1_prediction[0] * 100
        )

        real_score = float(
            stage1_prediction[1] * 100
        )

        # ==================================================
        # IF IMAGE IS REAL
        # ==================================================
        if real_score > 90:

            return jsonify({

                "real": round(real_score, 2),

                "ai": 0,

                "morphed": 0,

                "stage1Prediction": "real",

                "stage2Prediction": None,

                "finalLabel": "real",

                "confidence": round(
                    stage1_confidence,
                    2
                )
            })

        # ==================================================
        # STAGE 2 : AI vs MORPHED
        # ==================================================
        stage2_prediction = stage2_model.predict(img)[0]

        stage2_confidence = float(
            np.max(stage2_prediction) * 100
        )

        stage2_idx = int(
            np.argmax(stage2_prediction)
        )

        stage2_label = STAGE2_CLASSES[
            stage2_idx
        ]

        ai_score = float(
            stage2_prediction[0] * 100
        )

        morphed_score = float(
            stage2_prediction[1] * 100
        )

        # -------------------------
        # FINAL CONFIDENCE
        # -------------------------
        final_confidence = (
            stage1_confidence +
            stage2_confidence
        ) / 2

        # -------------------------
        # LOW CONFIDENCE
        # -------------------------
        if final_confidence < 70:

            final_label = "uncertain"

        else:

            final_label = stage2_label

        # -------------------------
        # RETURN RESPONSE
        # -------------------------
        return jsonify({

            "real": round(real_score, 2),

            "ai": round(ai_score, 2),

            "morphed": round(morphed_score, 2),

            "stage1Prediction": stage1_label,

            "stage2Prediction": stage2_label,

            "finalLabel": final_label,

            "confidence": round(
                final_confidence,
                2
            )
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500

# -------------------------
# RUN SERVER
# -------------------------
if __name__ == "__main__":

    app.run(debug=True)
'''


from flask import Flask, request, jsonify
from flask_cors import CORS

from tensorflow.keras.models import load_model
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

from mtcnn import MTCNN

import numpy as np
import cv2
import os

app = Flask(__name__)
CORS(app)

# -------------------------
# LOAD MODELS
# -------------------------
stage1_model = load_model(
    "models/stage1_real_fake.keras"
)

stage2_model = load_model(
    "models/stage2_ai_morphed.keras"
)

# -------------------------
# FACE DETECTOR
# -------------------------
detector = MTCNN()

# -------------------------
# CLASS LABELS
# -------------------------
STAGE1_CLASSES = ['fake', 'real']

STAGE2_CLASSES = ['ai', 'morphed']

# -------------------------
# UPLOAD FOLDER
# -------------------------
UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

# -------------------------
# PREPROCESS STAGE 1
# -------------------------
def preprocess_stage1(path):

    img = cv2.imread(path)

    img = cv2.cvtColor(
        img,
        cv2.COLOR_BGR2RGB
    )

    img = cv2.resize(
        img,
        (224,224)
    )

    img = preprocess_input(
        img.astype("float32")
    )

    return np.expand_dims(img, axis=0)

# -------------------------
# PREPROCESS STAGE 2
# -------------------------
def preprocess_stage2(path):

    img = cv2.imread(path)

    img = cv2.cvtColor(
        img,
        cv2.COLOR_BGR2RGB
    )

    faces = detector.detect_faces(img)

    if len(faces) > 0:

        x, y, w, h = faces[0]['box']

        x = max(0, x)
        y = max(0, y)

        img = img[
            y:y+h,
            x:x+w
        ]

    img = cv2.resize(
        img,
        (224,224)
    )

    img = preprocess_input(
        img.astype("float32")
    )

    return np.expand_dims(img, axis=0)

# -------------------------
# HOME
# -------------------------
@app.route("/")
def home():

    return "2-Stage AI Detection Server Running"

# -------------------------
# PREDICT
# -------------------------
@app.route("/predict", methods=["POST"])
def predict():

    try:

        if "image" not in request.files:

            return jsonify({
                "error": "No image uploaded"
            }), 400

        file = request.files["image"]

        file_path = os.path.join(
            UPLOAD_FOLDER,
            file.filename
        )

        file.save(file_path)

        # =========================
        # STAGE 1
        # =========================
        img_stage1 = preprocess_stage1(file_path)

        stage1_prediction = stage1_model.predict(
            img_stage1
        )[0]

        fake_score = float(
            stage1_prediction[0] * 100
        )

        real_score = float(
            stage1_prediction[1] * 100
        )

        # =========================
        # REAL
        # =========================
        if real_score >= 85:

            return jsonify({

                "real": round(real_score, 2),

                "ai": 0,

                "morphed": 0,

                "finalLabel": "real",

                "confidence": round(real_score, 2)
            })

        # =========================
        # UNCERTAIN
        # =========================
        if fake_score < 85:

            return jsonify({

                "real": round(real_score, 2),

                "ai": 0,

                "morphed": 0,

                "finalLabel": "uncertain",

                "confidence": round(fake_score, 2)
            })

        # =========================
        # STAGE 2
        # =========================
        img_stage2 = preprocess_stage2(file_path)

        stage2_prediction = stage2_model.predict(
            img_stage2
        )[0]

        ai_score = float(
            stage2_prediction[0] * 100
        )

        morphed_score = float(
            stage2_prediction[1] * 100
        )

        final_confidence = max(
            ai_score,
            morphed_score
        )

        final_label = STAGE2_CLASSES[
            np.argmax(stage2_prediction)
        ]

        return jsonify({

            "real": round(real_score, 2),

            "ai": round(ai_score, 2),

            "morphed": round(morphed_score, 2),

            "finalLabel": final_label,

            "confidence": round(final_confidence, 2)
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500

# -------------------------
# RUN
# -------------------------
if __name__ == "__main__":

    app.run(debug=True)