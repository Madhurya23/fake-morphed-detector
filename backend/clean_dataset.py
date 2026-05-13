import os
from PIL import Image

# -------------------------
# DATASET LIST
# -------------------------
datasets = [
    "dataset_stage1",
    "dataset_stage2"
]

# -------------------------
# CLEAN DATASETS
# -------------------------
for dataset_path in datasets:

    print(f"\nChecking dataset: {dataset_path}")

    for root, dirs, files in os.walk(dataset_path):

        for file in files:

            path = os.path.join(root, file)

            try:
                with Image.open(path) as img:
                    img.verify()

            except Exception as e:

                print("Removing corrupted file:", path)

                try:
                    os.remove(path)

                except:
                    print("❌ Could not delete:", path)

print("\n✅ All datasets cleaned successfully!")