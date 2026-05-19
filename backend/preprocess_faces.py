import os
import cv2
from mtcnn import MTCNN

detector = MTCNN()

input_dir = "dataset_stage2"
output_dir = "dataset_faces"

os.makedirs(output_dir, exist_ok=True)

for label in os.listdir(input_dir):
    label_path = os.path.join(input_dir, label)
    save_label_path = os.path.join(output_dir, label)
    os.makedirs(save_label_path, exist_ok=True)

    for img_name in os.listdir(label_path):
        img_path = os.path.join(label_path, img_name)
        img = cv2.imread(img_path)

        if img is None:
            continue

        faces = detector.detect_faces(img)

        if len(faces) > 0:
            x, y, w, h = faces[0]['box']
            x, y = max(0,x), max(0,y)
            face = img[y:y+h, x:x+w]
        else:
            face = img  # fallback

        face = cv2.resize(face, (224,224))

        cv2.imwrite(os.path.join(save_label_path, img_name), face)